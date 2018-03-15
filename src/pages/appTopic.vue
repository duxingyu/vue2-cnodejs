<template>
<div 
  class="g-topic" 
  @click="linkJump" 
  :class="{load: !loaded}">
    <app-header title="主题"></app-header>
  <!--文章内容及简介-->
  <topic-content 
    :token="user ? user.token : null"
    @finish="loaded = !loaded"
    :data="d"></topic-content>
    <!--文章评论-->
  <topic-comment
    v-if="d.reply_count"
    :user="user"
    :id="topicId"
    :data="d" ></topic-comment>
    <!--回复-->
  <topic-reply
    v-if="user && loaded"
    :token="user ? user.token : null"
    :id="topicId"
    @refresh="getData"></topic-reply>
    <app-utils></app-utils>
  <app-prompt 
    :show="prompt" 
    :text="promptText" 
    @close="hide"></app-prompt> 
</div>
</template>

<script>
import appUtils from '../components/appUtils';
import appHeader from '../components/appHeader';
import appPrompt from '../components/appPrompt';
import topicContent from './topicContent';
import topicComment from './topicComment';
import topicReply from './topicReply';
import { error } from '../assets/utils';

export default {
  name: 'apptopic',
  data() {
    return {
      d: {},
      user: null,
      topicId: '',
      loaded: false,
      prompt: false,
      promptText: '',
    };
  },
  components: {
    appHeader,
    appUtils,
    appPrompt,
    topicContent,
    topicComment,
    topicReply,
  },
  created() {
    this.user = this.$store.store.state.user;
    this.topicId = this.$route.path.split('topic/')[1];
    this.getData();
  },
  methods: {
    hide() {
      this.prompt = false;
    },
    getData() {
      let url = this.topicId;
      url = this.user ? `${url}?accesstoken=${this.user.token}` : url;
      this.$http
        .get(`https://cnodejs.org/api/v1/topic/${url}`)
        .then(res => (this.d = res.data.data))
        .catch(err => error(err, this));
    },
    // 如果为外部链接，则打开新窗口
    linkJump(e) {
      const link = e.target;
      if (link.tagName === 'A' && link.href.match(/^http/)) {
        link.target = 'blank';
      }
    },
  },
};
</script>

<style lang="scss">
@import '../assets/mixin';

.g-topic {
  @include wh(70%, 100%);
  margin: 0 auto;
}
@media all and (max-width: 800px) {
  .g-topic {
    @include wh(100%);
  }
}
</style>
