<template>
<div>
  <app-header :title="title[crtTag]"></app-header>
  <ul class="m-list">
    <li class="item" v-for="item of d" :key="item.id">
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
      d: [],
      page: 1,
      limit: 20,
      title: {
        home: '首页',
        good: '精华',
        ask: '问答',
        share: '分享',
        job: '招聘',
      },
      lastTag: 'home',
      crtTag: 'home',
      send: 'before',
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
    const tab = this.$route.query.tab;
    this.lastTag = tab || 'home';
    this.crtTag = this.lastTag;
  },
  methods: {
    hide() {
      this.prompt = false;
    },
    getList($state) {
      if (this.send === 'loding') return;
      this.send = 'loding';

      if (this.lastTag !== this.crtTag) {
        this.page = 1;
        this.lastTag = this.crtTag;
        this.d.splice(0);
      }
      const tab = this.crtTag === 'home' ? '' : `&tab=${this.crtTag}`;

      const url = `https://cnodejs.org/api/v1/topics?page=${this.page}&limit=${this.limit}${tab}`;
      this.$http
        .get(url)
        .then(res => {
          this.d.push(...res.data.data);
          ++this.page;
          this.send = 'before';
          $state.loaded();
        })
        .catch(err => {
          this.send = 'before';
          error(err, this);
        });
    },
    getTime,
    getTag,
  },
  watch: {
    $route(to, from) {
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
      padding: 10px 20px;  
      border-bottom: 1px solid #ccc;
      background: #fff; 
      @include wh(100%, 90px); 
    }
    .title { 
      font: bold 16px/24px $ff;
      width: 100%;  
      cursor: pointer; 
      a {
        @include tag;
        &::before { 
          font: normal 12px/20px $ff;
          display: inline-block;
          margin: 2px 5px 2px 0;  
          text-align: center;  
          color: #fff;  
          border-radius: 3px; 
          @include wh(40px, 20px); 
        }
      }
      &:hover a { 
        text-decoration: underline;
        color: $re; 
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
        border-radius: 50%;
        @include wh(40px); 
      }
      .desc {
        float: left;  
        margin-left: 10px;
        span { 
          line-height: 20px;
          @include fc(12px, #616161); 
        }
      }
    }
  .detail { 
    font: 12px/20px $ff;
    float: right; 
    p {
      text-align: right;
    }
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
