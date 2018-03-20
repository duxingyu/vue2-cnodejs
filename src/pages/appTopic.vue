<template>
<div class="g-topic">
    <app-header title="主题"></app-header>
  <!--文章内容及简介-->
  <topic-content
    :user="user"
    :data="data"></topic-content>
    <!--文章评论-->
  <topic-comment
    v-if="data.reply_count"
    :user="user"
    :data="data"
    @reget="getData"></topic-comment>
    <!--回复-->
  <p class="u-desc-title" v-if="user.token && finish">添加回复</p>
  <app-publish
    v-if="user.token && finish"
    btnText="提交"
    @reply="subReply"></app-publish>
  <app-utils></app-utils>
  <app-prompt
    :show="prompt"
    :text="promptText"
    @close="hide"></app-prompt>
</div>
</template>

<script>
import { Loading } from 'element-ui';
import appUtils from '../components/appUtils';
import appHeader from '../components/appHeader';
import appPrompt from '../components/appPrompt';
import appPublish from '../components/appPublish';
import topicContent from './topicContent';
import topicComment from './topicComment';
import { error } from '../assets/utils';

export default {
  name: 'apptopic',
  props: ['topicId'],
  data() {
    return {
      data: {},
      user: null,
      prompt: false,
      promptText: '',
      send: 'before',
      finish: false,
    };
  },
  components: {
    appHeader,
    appUtils,
    appPrompt,
    topicContent,
    topicComment,
    appPublish,
  },
  created() {
    this.user = this.$store.store.state.user;
    this.getData(Loading.service(this.$loadConfig));
  },
  methods: {
    hide() {
      this.prompt = false;
    },
    // 获取话题数据
    getData(load) {
      let url = this.topicId;
      url = this.user ? `${url}?accesstoken=${this.user.token}` : url;
      this.$http
        .get(`topic/${url}`)
        .then(res => {
          const data = res.data.data;
          if (!this.data.id) {
            this.data = data;
            // 为每个评论添加show: false表示评论框不可见
            this.data.replies.forEach((val, index) => {
              this.$set(val, 'show', false);
              this.$set(val, 'index', index);
            });
            this.finish = true;
            load.close();
          } else {
            // 用户回复后将回复内容push到评论列表中，添加show，回复数+1
            const index = data.replies.length - 1;
            this.data.replies.push(data.replies[index]);

            this.$set(this.data.replies[index], 'show', false);
            this.$set(this.data.replies[index], 'index', index);

            ++this.data.reply_count;
            // 由于获取到的id首位为数字(坑！)，因此加了a
            this.$router.push(`/topic/${this.data.id}#a${this.data.replies[index].id}`);
          }
        })
        .catch(err => error(err, this));
    },
    subReply(content) {
      if (this.send === 'loading') return;
      this.send = 'loading';

      const data = {
        accesstoken: this.user.token,
        content: `${content}
        
来自 [vue2-cnodejs](https://duxy1995.coding.me/)`,
      };
      this.$http
        .post(`topic/${this.topicId}/replies`, data)
        .then(() => {
          this.getData();
          this.send = 'before';
        })
        .catch(err => {
          error(err, this);
          this.send = 'before';
        });
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
