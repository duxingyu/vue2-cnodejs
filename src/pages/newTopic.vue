<template>
  <div class="m-new-topic u-publish" @click="fold = false">
    <app-header title="新建主题"></app-header>
    <div class="select">
      <p class="desc">选择分类：</p>
      <div class="selfalse">
        <p 
          class="result"
          @click.stop="fold = !fold">{{ text }}</p>
        <div class="option" :class="{show: fold}">
          <p
            v-for="item of options"
            @click.stop="select(item)"
            v-text="item.text"></p>
        </div>
      </div>
    </div>
    <input 
      v-model="data.title"
      type="text" 
      placeholder="标题字数 10字以上"
      class="title">
    <textarea 
      class="ct"
      v-model="data.content"
      placeholder="支持markdown语法格式"></textarea>
    <button 
      type="button"
      @click="addArticle"
      class="submit">发布</button>
    <app-prompt 
      :show="prompt" 
      :text="promptText" 
      @close="hide"></app-prompt>
  </div>
</template>

<script>
import appHeader from '../components/appHeader';
import appPrompt from '../components/appPrompt';
import { error } from '../assets/utils';

export default {
  name: 'newTopic',
  data() {
    return {
      fold: false,
      options: [
        {text: '问答', tab: 'ask'},
        {text: '分享', tab: 'share'},
        {text: '招聘', tab: 'job'},
      ],
      text: '请选择',
      data: {
        tab: '',
        title: '',
        accesstoken: '',
        content: '',
      },
      send: 'before',
      prompt: false,
      promptText: '',
    };
  },
  components: {
    appHeader,
    appPrompt,
  },
  created() {
    const user = this.$store.store.state.user;
    if (!user) {
      this.$router.push('/login');
    } else {
      this.data.accesstoken = user.token;
    }
  },
  methods: {
    addArticle() {
      if (this.send === 'loading') return;
      this.send = 'loading';

      this.$http.post('https://cnodejs.org/api/v1/topics', this.data).then(res => {
        this.$router.push(`/topic/${res.data.data.topic_id}`);
      })
      .catch(err => {
        error(err, this);
        this.send = 'before';
      });
    },
    hide() {
      this.prompt = false;
    },
    select(val) {
      this.data.tab = val.tab;
      this.text = val.text;
      this.fold = !this.fold;
    },
  },
};
</script>

<style lang="scss">
@import '../assets/mixin';

.m-new-topic {
  width: 100%;
  padding: 30px 10%;
  .select {
    margin: 10px 0;
    font-size: 16px;
    .desc {
      float: left;
      @include hl(40px);
    }
    .selfalse {
      position: relative;
      z-index: 2;
      border: 1px solid $bl;
      margin-left: 90px;
      border-radius: 5px;
      background: #fff;
      &::after {
        content: "";
        position: absolute;
        top: 18px;
        right: 10px;
        border: 5px solid transparent;
        border-top: 5px solid $bl;
      }
      p {
        @include hl(40px, 38px);
        position: relative;
        padding-left: 10px;
        cursor: pointer;
      }
      .option {
        position: absolute;
        visibility: hidden;
        overflow: hidden;
        @include wh(100%, 0);
        background: #fff;
        border-radius: 5px;
        border: 1px solid #000;
        transition: .3s;
        &.show {
          transition: .3s;
          height: 120px;
          visibility: visible;
        }
        p:hover {
          background: rgba(0,0,0,0.1);
        }
      }
    }
  }
  .title {
    @include wh(100%, 40px);
    padding: 0 10px;
    margin-bottom: 10px;
    font: 16px/40px SimHei;
    border: 1px solid #000;
    border-radius: 5px;
  }
  .ct {
    height: 50vh;
    margin-bottom: 10px;
  }
  .submit {
    @include wh(100%, 40px);
    font: 20px/2 SimHei;
  }
}
@media all and (max-width: 800px) {
  .m-new-topic {
    padding: 10px;
    .ct {
      height: 60vh;
    }
  }
}
</style>