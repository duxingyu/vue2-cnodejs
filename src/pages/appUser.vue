<template>
<!-- 用户页面 -->
<div class="m-user">
  <app-header :title="`${userId} 的主页`"></app-header>
  <!-- 获取到数据才可以加载 -->
  <div v-if="finish" class="wrap">
    <user-panel :data="userInfo" :count="topicList[2].length"></user-panel>
    <user-topics
      :topicNum="num"
      :userId="userId"
      :topicList="sendList(topicList)"></user-topics>
  </div>
  <app-utils></app-utils>
  <app-prompt
    :show="prompt"
    :text="promptText"
    @close="hide"></app-prompt>
</div>
</template>

<script>
import { Loading } from 'element-ui';
import { error } from '../assets/utils';
import appUtils from '../components/appUtils';
import appHeader from '../components/appHeader';
import appPrompt from '../components/appPrompt';
import userPanel from './userPanel';
import userTopics from './userTopics';
import api from '../assets/api';

export default {
  name: 'appUser',
  data() {
    return {
      userInfo: {},
      finish: false,
      topicList: [],
      prompt: false,
      promptText: '',
      // num为3加载所有数据、为1加载全部创建话题、为2加载全部收藏
      num: 3,
    };
  },
  props: ['userId'],
  components: {
    appUtils,
    appPrompt,
    appHeader,
    userPanel,
    userTopics,
  },
  created() {
    const list = this.$route.params.list;
    // 面对直接输入url的情况
    if (list) {
      this.num = list === 'topics' ? 1 : 2;
    }
    this.getUserInfo(this.userId, Loading.service(this.$loadConfig));
  },
  methods: {
    hide() {
      this.prompt = false;
    },
    // 获取用户信息、参与话题、创建话题列表
    getUserInfo(userId, load) {
      api.userInfo(userId)
        .then(res => {
          this.userInfo = res.data.data;
          // 使用topicList方便调用列表数据
          this.topicList.splice(0);
          this.topicList.push(this.userInfo.recent_replies, this.userInfo.recent_topics);
          this.getCollect(load);
        })
        .catch(err => error(err, this));
    },
    // 获取用户收藏列表
    getCollect(load) {
      api.userCollect(this.userInfo.loginname)
        .then(res => {
          this.topicList.push(res.data.data);
          this.finish = true;
          load.close();
        })
        .catch(err => error(err, this));
    },
    // 根据页面的不同，传输不同的数据，也可以在userTopics中判断
    sendList(list) {
      return this.num === 3 ? list : [list[this.num]];
    },
  },
  beforeRouteUpdate(to, from, next) {
    if (to.params.list) {
      this.num = to.params.list === 'topics' ? 1 : 2;
    } else {
      this.num = 3;
      // 当用户id不同时，重新获取数据
      if (to.params.userId !== from.params.userId) {
        this.finish = false;
        this.getUserInfo(to.params.userId, Loading.service(this.$loadConfig));
      }
    }
    next();
  },
};
</script>

<style lang="scss">
@import '../assets/mixin';

.m-user {
  padding: 50px 20px;
  background: #f1f1f1;
  min-height: 100vh;
  .wrap {
    display: flex;
    align-items: flex-start;
  }
}

@media all and (max-width: 600px) {
  .m-user {
    padding: 0;
    .wrap {
      flex-direction: column;
    }
  }
}
</style>
