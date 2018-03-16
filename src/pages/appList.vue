<template>
<!-- 主页文章列表 -->
<div>
  <app-header :title="title[crtTag]"></app-header>
  <ul class="m-list">
    <li class="article" v-for="article of articleList" :key="article.id">
      <!-- 文章标题 -->
      <h3 class="title ellipsis">
        <router-link
          :to="{ name: 'appTopic', params: { topicId: article.id } }"
          :class="getTag(article, crtTag)"
          :title="article.title">
          {{ article.title }}</router-link>
      </h3>
      <!-- 文章信息 -->
      <div class="info">
        <!-- 文章基础信息 -->
        <router-link
          class="basic"
          :to="{ name: 'appUser', params: { userId: article.author.loginname } }">
          <!-- 用户头像 -->
          <img
            :src="article.author.avatar_url"
            :title="article.author.loginname">
          <!-- 文章作者、发表时间 -->
          <p class="author">
            {{ article.author.loginname }}<br/>
            {{ getTime(article.create_at) }}
          </p>
        </router-link>
        <!-- 其他信息：文章回复数 / 访问数， 上次访问时间 -->
        <div class="other">
          <span class="reply">{{ article.reply_count }}</span>&nbsp;/
          <span class="visit">{{ article.visit_count }}</span><br>
          <span class="last-reply">{{getTime(article.last_reply_at)}}</span>
        </div>
      </div>
    </li>
    <infinite-loading @infinite="getList"></infinite-loading>
  </ul>
  <app-utils></app-utils>
  <app-prompt
    :show="prompt"
    :text="promptText"
    @close="hide"></app-prompt>
</div>
</template>

<script>
import InfiniteLoading from 'vue-infinite-loading';
import appHeader from '../components/appHeader';
import appUtils from '../components/appUtils';
import appPrompt from '../components/appPrompt';
import { getTime, getTag, error } from '../assets/utils';

export default {
  name: 'appList',
  data() {
    return {
      articleList: [],
      page: 1,
      title: {
        home: '首页',
        good: '精华',
        ask: '问答',
        share: '分享',
        job: '招聘',
      },
      lastTag: 'home',
      crtTag: 'home',
      send: 'finish',
      prompt: false,
      promptText: '',
    };
  },
  components: {
    appHeader,
    appUtils,
    appPrompt,
    InfiniteLoading,
  },
  created() {
    // 获取到当前导航信息
    const tab = this.$route.query.tab;
    this.lastTag = tab || 'home';
    this.crtTag = this.lastTag;
  },
  methods: {
    hide() {
      this.prompt = false;
    },
    // $state为vue-infinite-loading插件参数
    getList($state) {
      // 保证向下滚动获取到数据前不会再发送请求，除非请求成功
      if (this.send === 'loading') return;
      this.send = 'loading';

      // 导航切换时重置参数
      if (this.lastTag !== this.crtTag) {
        this.page = 1;
        this.lastTag = this.crtTag;
        // 清空文章列表
        this.articleList.splice(0);
      }
      const tab = this.crtTag === 'home' ? '' : `&tab=${this.crtTag}`;

      // 一次获取20篇文章信息
      const url = `https://cnodejs.org/api/v1/topics?page=${this.page}&limit=20${tab}`;
      this.$http
        .get(url)
        .then(res => {
          this.articleList.push(...res.data.data);
          ++this.page;
          this.send = 'finish';
          if (this.page > 2) {
            $state.loaded();
          }
        })
        .catch(err => {
          this.send = 'finish';
          error(err, this);
        });
    },
    getTime,
    getTag,
  },
  beforeRouteUpdate(to, from, next) {
    this.crtTag = to.query.tab || 'home';
    this.lastTag = from.query.tab || 'home';

    // this.crtTag, this.lastTag均为home时不调用
    if (this.crtTag !== this.lastTag) {
      this.getList();
    }
    next();
  },
};
</script>

<style lang="scss">
@import '../assets/mixin';

.m-list {
  position: relative;
  width: 100%;
  .article {
    padding: 10px 20px;
    border-bottom: 1px solid #ccc;
    background: #fff;
    height: 90px;
  }
  .title {
    font: bold 16px/24px $ff;
    a {
      @include tag;
      &::before {
        width: 40px;
        font: normal 12px/20px $ff;
        display: inline-block;
        margin: 2px 5px 2px 0;
        text-align: center;
        color: #fff;
        border-radius: 3px;
      }
      &:hover {
        text-decoration: underline;
        color: $re;
      }
    }
  }
  .info {
    display: flex;
    height: 46px;
    padding-top: 6px;
  }
  .basic {
    display: flex;
    height: 40px;
    img {
      width: 40px;
      border-radius: 50%;
    }
    .author {
      margin-left: 10px;
      line-height: 20px;
      @include fc(12px, #616161);
    }
  }
  .other {
    font: 12px/20px $ff;
    flex-grow: 1;
    text-align: right;
    .reply {
      font-weight: bold;
      color: $re;
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
