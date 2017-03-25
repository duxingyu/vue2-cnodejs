<template>
  <div class="m-topic-reply">
    <p class="u-desc-title">添加回复</p>
    <div class="u-publish">
      <textarea 
        v-model="content"
        placeholder="支持markdown语法格式"
        class="ct"></textarea>
      <button 
        type="button"
        @click="subReply" 
        class="submit">提交</button>
    </div>
    <app-prompt 
      :show="prompt" 
      :text="promptText" 
      @close="hide"></app-prompt>    
  </div>
</template>

<script>
import axios from 'axios';
import appPrompt from '../components/appPrompt';
import { error } from '../assets/utils';

export default {
  name: 'topicReply',
  data() {
    return {
      content: '',
      send: 'before',
      prompt: false,
      promptText: '',
    };
  },
  props: ['token', 'id'],
  components: {
    appPrompt,
  },
  methods: {
    hide() {
      this.prompt = false;
    },
    subReply() {
      if (this.send === 'loading') return;
      this.send = 'loading';

      if (this.content === '') {
        this.prompt = true;
        this.promptText = '回复内容不能为空';
        return;
      }
      const tail = '来自 [vue2-cnodejs](https://duxy1995.coding.me/)';

      const data = {
        accesstoken: this.token,
        content: this.content + tail,
      };
      axios.post(`https://cnodejs.org/api/v1/topic/${this.id}/replies`, data).then(res => {
        this.$emit('refresh');
        this.send = 'before';
        this.content = '';
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

.m-topic-reply {
  width: 100%;
  .u-publish {
    .ct {
      height: 200px;
      border-radius: 0 0 5px 5px;
    }
    .submit {
      @include wh(100%, 40px);
      font: 20px/2 SimHei;
      margin-bottom: 10px;
    }
  }
}
</style>