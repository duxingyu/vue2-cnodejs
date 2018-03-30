<template>
<!-- 话题详情及内容 -->
<div class="m-topic-ct" v-if="data.title">
  <!-- 话题详情：作者、标题、时间、是否收藏 -->
  <div class="intro">
    <h2 class="title" :class="getTag(data)">{{ data.title }}</h2>
    <div class="author">
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
      <button
        class="collect"
        v-if="isAuthor(data.author_id)"
        @click="topicEdit(data)">编辑</button>
      <button
        class="collect"
        v-if="user.token"
        :class="{'cancel': data.is_collect}"
        @click="changeCollect(data.is_collect)">{{ data.is_collect ? '取消收藏' : '收藏' }}</button>
    </div>
  </div>
  <!-- 话题内容 -->
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
import api from '../assets/api';
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
  props: ['data', 'user'],
  methods: {
    // 收藏或取消收藏
    changeCollect(state) {
      if (this.send === 'loading') return;
      this.send = 'loading';

      api
        .topicCollect(state, {
          accesstoken: this.user.token,
          topic_id: this.data.id,
        })
        .then(() => {
          this.data.is_collect = !state;
          this.send = 'before';
        })
        .catch(err => {
          this.send = 'before';
          error(err, this);
        });
    },
    // 话题作者=登录用户
    isAuthor(id) {
      return id === this.user.id;
    },
    // 编辑话题
    topicEdit(data) {
      // 重新请求话题，获得未渲染内容，请求成功转到编辑话题页
      api
        .topicInfo(this.data.id, { mdrender: false })
        .then(res => {
          this.$store.store.commit('topicEdit', {
            accesstoken: this.user.token,
            topic_id: data.id,
            title: data.title,
            tab: data.tab,
            content: res.data.data.content,
          });
          this.$router.push('/edit');
        })
        .catch(err => error(err, this));
    },
    hide() {
      this.prompt = false;
    },
    getTime,
    getTag,
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
    // 多行显示
    font: bold 20px/1.5 $ff;
    padding: 10px 0;
    &::before {
      display: inline-block;
      margin-right: 6px;
      padding: 0 10px;
      color: #fff;
      border-radius: 4px;
      line-height: 24px;
      @include fc(14px, #fff);
      vertical-align: text-bottom;
    }
    @include tag;
  }
  .author {
    display: flex;
    img {
      @include wh(40px);
      border-radius: 50%;
    }
    .desc {
      flex-grow: 1;
      padding-left: 10px;
      line-height: 20px;
      color: #616161;
      .name {
        font: bold 14px/20px $ff;
        color: #000;
        &::before {
          content: '作者';
          margin-right: 10px;
          border: 1px solid $re;
          border-radius: 4px;
          color: $re;
          @include fl(12px, 14px);
        }
      }
    }
    .collect {
      height: 34px;
      align-self: center;
      padding: 10px;
      @include fc(14px, #fff);
      border-radius: 4px;
      border: none;
      cursor: pointer;
      background: $re;
      margin-left: 10px;
      &.cancel {
        background: #bdbdbd;
        min-width: 80px;
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
    .intro {
      padding-bottom: 0;
    }
    .body img {
      width: 100%;
      margin: 0;
    }
  }
}
</style>
