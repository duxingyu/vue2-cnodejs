<template>
  <div class="m-topic-ct" v-if="data.title">
    <div class="intro">
      <h2 class="title" :class="getTag(data)">{{ data.title }}</h2>
      <div class="author clearfix">
        <router-link :to="`/user/${data.author.loginname}`">
          <img
            :src="data.author.avatar_url" 
            :alt="data.author.loginname">
        </router-link>
        <div class="desc">
          <p class="name">{{ data.author.loginname }}</p>
          <p>
            <span>发布于&nbsp;{{ getTime(data.create_at) }}</span>&nbsp;
            <span>阅读&nbsp;{{ data.visit_count }}</span>&nbsp;
            <span>评论&nbsp;{{ data.reply_count }}</span>
          </p>
        </div>
        <p
          v-if="token" 
          :class="{cancel: data.is_collect}"
          @click="changeCollect(data.is_collect)"
          class="collect">
          {{ data.is_collect ? '取消收藏' : '收藏' }}
        </p>
      </div>
    </div>
    <div class="body markdown-body" v-html="data.content">
    </div>
    <app-prompt 
      :show="prompt" 
      :text="promptText" 
      @close="hide"></app-prompt>
  </div>
</template>

<script>
import { getTime, getTag, error } from '../assets/utils';
import appPrompt from '../components/appPrompt';

export default {
  name: 'topicContent',
  data() {
    return {
      send: 'before',
      prompt: false,
      promptText: '',
    };
  },
  components: {
    appPrompt,
  },
  props: ['data', 'token'],
  methods: {
    changeCollect(state) {
      if (this.send === 'loading') return;
      this.send = 'loading';

      this.$http.post(`https://cnodejs.org/api/v1/topic_collect/${state ? 'de_collect' : 'collect'}`, {
        accesstoken: this.token,
        topic_id: this.data.id,
      }).then(res => {
        this.data.is_collect = !state;
        this.send = 'before';
      })
        .catch(err => {
          this.send = 'before';
          error(err, this);
        });
    },
    hide() {
      this.prompt = false;
    },
    getTime,
    getTag,
  },
  watch: {
    data() {
      if (this.data.content) {
        this.$emit('finish');
      }
    },
  },
};
</script>

<style lang="scss">
@import '../assets/mixin';

.m-topic-ct {
  margin-bottom: 30px;
  .intro {
    padding-bottom: 20px;
    }
  .title {
    font: bold 20px/1.5 $ff;
    padding: 10px 0;
    &::before {
      display: inline-block;
      height: 24px;
      margin-right: 5px;
      padding: 0 10px;
      color: #fff;
      border-radius: 3px;
      font: normal 14px/24px $ff;
      vertical-align: text-bottom;
    }
    @include tag;
  }
  .author {
    img {
      float: left;
      @include wh(40px);
      border-radius: 50%;
    }
    .desc {
      float: left;
      padding-left: 10px;
      line-height: 20px;
      color: #616161;
      .name {
        font: bold 14px/20px $ff;
        cursor: pointer;
        color: #000;
        &::before {
          content: "作者";
          margin-right: 10px;
          @include wh(30px, 14px);
          border: 1px solid $re;
          border-radius: 3px;
          color: $re;
          font: normal 12px/14px $ff;
          text-align: center;
        }
      }
    }
    .collect {
      float: right;
      height: 34px;
      margin: 3px 0;
      padding: 10px;
      @include fc(14px, #fff);
      border-radius: 5px;
      cursor: pointer;
      background: $re;
      &.cancel {
        background: #bdbdbd;
        &:hover {
          background: #424242;
        }
      }
      &:hover {
        background: #dd2c00;
      }
    }
  }
  .body img {
    width: 80%;
    margin: 0 10%;
  }
}
@media all and (max-width: 800px) {
  .m-topic-ct {
    margin: 0;
    padding: 0 10px;
    .body img {
      width: 100%;
      margin: 0;
    }
  }
}
</style>