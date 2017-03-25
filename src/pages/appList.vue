<template>
  <div>
    <app-header :title="title[crtTag]"></app-header>
    <ul class="m-list">
      <li class="item" v-for="item of d">
        <h3 class="title ellipsis">
          <router-link 
            :to="`/topic/${item.id}`"
            :class="getTag(item, crtTag)"
            :title="item.title"
          >{{ item.title }}</router-link>
        </h3>
        <div class="content">
          <router-link 
            :to="`/user/${item.author.loginname}`" 
            class="author">
            <img 
              :src="item.author.avatar_url" 
              :title="item.author.loginname">
            <p class="desc">
              <span>{{ item.author.loginname }}</span><br/>
              <span>{{ getTime(item.create_at) }}</span>
            </p>
          </router-link>
          <div class="detail">
            <p><span class="reply">{{ item.reply_count }}</span>&nbsp;/
            <span class="visit">{{ item.visit_count }}</span></p>
            <p class="last-reply">{{getTime(item.last_reply_at)}}</p>
          </div>
        </div>
      </li>
      <infinite-loading 
        :on-infinite="getList" 
        ref="infiniteLoading">
      </infinite-loading>
    </ul>
    <app-utils></app-utils>
    <app-prompt 
      :show="prompt" 
      :text="promptText" 
      @close="hide"></app-prompt>
  </div>
</template>

<script>
import axios from 'axios';
import appHeader from '../components/appHeader';
import appUtils from '../components/appUtils';
import appPrompt from '../components/appPrompt';
import { getTime, getTag, error } from '../assets/utils';
import infiniteLoading from 'vue-infinite-loading';

export default {
  name: 'appList',
  data() {
    return {
      d: [],
      page: 1,
      limit: 20,
      lastTag: 'home',
      crtTag: 'home',
      send: 'before',
      title: {
        home: '首页',
        good: '精华',
        ask: '问答',
        share: '分享',
        job: '招聘',
      },
      prompt: false,
      promptText: '',
    };
  },
  components: {
    appHeader,
    appUtils,
    appPrompt,
    infiniteLoading,
  },
  created() {
    const tab = this.$route.query.tab;
    this.crtTag = this.lastTag = tab || 'home';
  },
  methods: {
    hide() {
      this.prompt = false;
    },
    getList() {
      if (this.send === 'loding') return;
      this.send = 'loding';

      if (this.lastTag !== this.crtTag) {
        this.page = 1;
        this.lastTag = this.crtTag;
        this.d.splice(0);
      }
      const tab = this.crtTag === 'home' ? '' : `&tab=${this.crtTag}`;

      const url = `https://cnodejs.org/api/v1/topics?page=${this.page}&limit=${this.limit}${tab}`;
      axios.get(url)
        .then(res => {
          this.d.push(...res.data.data);
          ++this.page;
          this.send = 'before';
          this.$refs.infiniteLoading.$emit('$InfiniteLoading:loaded');
        }).catch(err => {
          this.send = 'before';
          error(err, this);
        });
    },
    getTime,
    getTag,
  },
  watch: {
    '$route'(to, from) {
      if (to.path === '/') {
        this.crtTag = to.query.tab || 'home';
        this.lastTag = from.query.tab || 'home';
        this.getList();
      }
    },
  },
};
</script>

<style lang="scss">
@import '../assets/mixin';

.m-list {
  position: relative;
  width: 100%;
  .item {
    @include wh(100%, 90px);
    padding: 10px 20px;
    background: #fff;
    border-bottom: 1px solid #ccc;
  }
  .title {
    width: 100%;
    cursor: pointer;
    font: bold 16px/24px $ff;
    a {
      &::before {
        display: inline-block;
        @include wh(40px, 20px);
        margin: 2px 5px 2px 0;
        text-align: center;
        border-radius: 3px;
        color: #fff;
        font: normal 12px/20px $ff;
      }
      @include tag;
    }
    &:hover a {
      color: $re;
      text-decoration: underline;
    }
  }
  .content {
    height: 46px;
    padding-top: 6px;
  }
  .author {
    float: left;
    height: 40px;
    img {
      float: left;
      @include wh(40px);
      border-radius: 50%;
    }
    .desc {
      float: left;
      margin-left: 10px;
      span {
        @include fc(12px, #616161);
        line-height: 20px;
      }
    }
  }
  .detail {
    float: right;
    font: 12px/20px $ff;
    p {
      text-align: right;
    }
    .reply {
      color: $re;
      font-weight: bold;
    }
    .visit {
      color: #333;
    }
    .last-reply {
      color: #616161;
    }
  }
}
@media all and (max-width: 500px) {
  .m-list {
    .item {
      padding: 10px;
    }
  }
}
</style>