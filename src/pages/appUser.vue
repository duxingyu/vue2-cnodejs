<template>
<div class="m-user clearfix" :class="{load: !finish}">
  <app-header title="用户"></app-header>
  <div v-if="finish">
  <user-panel :data="d" :count="info[2].length"></user-panel>
  <div class="info">
    <div v-for="(v, i) of topic">
      <p class="u-desc-title">{{ v }}</p>
      <ul v-if="info[i].length">
        <li v-for="item of info[i]">
          <router-link :to="`/user/${item.author.loginname}`">
          <img
            :src="item.author.avatar_url" 
            :title="item.author.loginname"
            :alt="item.author.loginname">
          </router-link>
          <router-link 
            :to="`/topic/${item.id}`"
            :title="item.title" 
            class="title ellipsis">{{item.title}}</router-link>
          <p class="time">{{ getTime(item.last_reply_at) }}</p>
        </li>
      </ul>
      <p class="not" v-else>暂无</p>
    </div>
  </div>
  </div>
  <app-utils></app-utils>
  <app-prompt 
    :show="prompt" 
    :text="promptText" 
    @close="hide"></app-prompt> 
</div>
</template>

<script>
import { getTime, error } from '../assets/utils';
import appUtils from '../components/appUtils';
import appHeader from '../components/appHeader';
import appPrompt from '../components/appPrompt';
import userPanel from './userPanel';

export default {
  name: 'appUser',
  data() {
    return {
      d: '',
      topic: ['最近参与的话题', '最近创建的话题', '收藏'],
      finish: false,
      info: [],
      prompt: false,
      promptText: '',
    };
  },
  components: {
    appUtils,
    appPrompt,
    appHeader,
    userPanel,
  },
  mounted() {
    this.getTopic();
  },
  methods: {
    hide() {
      this.prompt = false;
    },
    getTopic() {
      const url = 'https://cnodejs.org/api/v1' + this.$route.path;
      this.$http.get(url)
        .then(res => {
          this.d = res.data.data;
          this.info.splice(0);
          this.info.push(this.d.recent_replies, this.d.recent_topics);
          this.getCollect();
        }).catch(err => error(err, this));
    },
    getCollect() {
      const url = `https://cnodejs.org/api/v1/topic_collect/${this.d.loginname}`;
      this.$http.get(url)
        .then(res => {
          this.info.push(res.data.data);
          this.finish = true;
        }).catch(err => error(err, this));
    },
    getTime,
  },
  watch: {
    '$route'(to) {
      if (to.path.includes('/user/')) {
        this.finish = false;
        this.getTopic();
      }
    },
  },
};
</script>

<style lang="scss">
@import '../assets/mixin';

.m-user {
  width: 100%;
  padding: 50px 10%;
  .info {
    margin-left: 230px;
    >div {
      margin-bottom: 20px;
      background: #fff;
      border: 2px solid $bl;
      border-radius: 10px;
    }
    li {
      @include wh(100%, 60px);
      padding: 10px 20px;
      border-bottom: 1px solid #ccc;
      img {
        float: left;
        @include wh(40px);
        margin-right: 20px;
        border-radius: 50%;
      }
      .title {
        float: left;
        color: $bl;
        width: 70%;
        font: bold 18px/40px SimHei;
        &:hover {
          color: $re;
          text-decoration: underline;
        }
      }
      .time {
        float: right;
        line-height: 40px;
        color: #333;
      }
    }
    .not {
      @include hl(60px);
      padding-left: 20px;
      font-size: 16px;
    }
  }
}
@media all and (max-width: 800px) {
  .m-user {
    width: 100%;
    padding: 10px;
  }
}
@media all and (max-width: 500px) {
  .m-user {
    padding: 0;
    .info {
      margin: 0;
      >div {
        border-width: 0;
        border-radius: 0;
        margin: 0;
      }
      li {
        padding: 5px 10px;
        height: 50px;
        .title {
          width: 80%;
        }
        .time {
          display: none;
        }
      }
      .not {
        @include hl(50px);
      }
    }
  }
}
</style>