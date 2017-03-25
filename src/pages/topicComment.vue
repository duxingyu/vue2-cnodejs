<template>
  <div class="m-topic-comment">
    <p class="u-desc-title">
      {{ data.reply_count }}条回复
    </p>
    <ol 
      class="body"
      @click="evProxy($event)">
      <li 
        class="item clearfix"
        v-for="(val, index) of data.replies"
        :class="{author: isAuthor(val.author.loginname)}"
        :key="index">
        <div class="info">
          <router-link :to="`/user/${val.author.loginname}`">
            <img
            :src="val.author.avatar_url" 
            :alt="val.author.loginname">
          </router-link>
          <span class="user">
            {{val.author.loginname}}
            {{index + 1}}楼&nbsp;{{getTime(val.create_at)}}
          </span>
          <span class="other">
            <i 
              :class="{ups:isUps(val.ups)}"
              class="material-icons"
              @click="ups(val, index)">thumb_up</i>
            {{ val.ups.length || '' }}
            <i 
              class="material-icons"
              @click="reply(val, index)">comment</i>
          </span>
        </div>
        <div class="content">
          <p class="main markdown-body" v-html="dealRouter(val.content)"></p>
          <div 
            class="reply u-publish" 
            v-if="replyShow[index]" 
            :key="val.id">
            <textarea 
              v-model="replyData.content"
              placeholder="支持markdown语法格式"
              @keyup.enter="subReply"
              class="ct"></textarea><br>
            <button 
              type="button"
              @click="subReply"
              class="submit">提交</button>
          </div>
        </div>
      </li>
    </ol>
    <app-prompt 
      :show="prompt" 
      :text="promptText" 
      @close="hide"></app-prompt>
  </div>
</template>

<script>
import { getTime, error } from '../assets/utils';
import appPrompt from '../components/appPrompt';
import axios from 'axios';

export default {
  name: 'topicComment',
  props: ['data', 'user'],
  data() {
    return {
      replyShow: [],
      replyData: {
        accesstoken: null,
        content: '',
        reply_id: '',
      },
      replyName: '',
      send: 'before',
      prompt: false,
      promptText: '',
    };
  },
  components: {
    appPrompt,
  },
  created() {
    const len = this.data.reply_count;
    for (let i = 0; i < len; i++) {
      this.replyShow.push(false);
    }
    if (this.user) {
      this.replyData.accesstoken = this.user.token;
    }
  },
  methods: {
    evProxy(e) {
      const target = e.target;
      if (target.className === 'markdown-link') {
        this.changeRouter(target);
      }
    },
    changeRouter(target) {
      this.$router.push(target.dataset.link);
    },
    dealRouter(ct) {
      // <a href="/user/name">name</a>
      const r = /<a href="(\/[^"]+)">([^<]+)<\/a>/g;
      return ct.replace(r, '<span data-link="$1" class="markdown-link">$2</span>');
    },
    isAuthor(loginname) {
      return loginname === this.data.author.loginname;
    },
    isUps(val) {
      if (this.user) {
        return val.indexOf(this.user.id) !== -1;
      }
      return false;
    },
    ups(val) {
      if (!this.user) {
        this.$router.push('/login');
        return;
      }

      axios.post(`https://cnodejs.org/api/v1/reply/${val.id}/ups`, {
        accesstoken: this.user.token,
      }).then(res => res.data.action === 'up' ? val.ups.push(this.user.id) : val.ups.pop())
        .catch(err => error(err, this));
    },
    hide() {
      this.prompt = false;
    },
    reply(val, index) {
      if (!this.user) {
        this.$router.push('/login');
        return;
      }

      const show = !this.replyShow[index];
      this.replyShow.splice(index, 1, show);
      this.replyData.reply_id = val.id;
      this.replyData.content = this.replyName = `@${val.author.loginname} `;
    },
    subReply() {
      if (this.send === 'loading') return;
      this.send = 'loading';


      const data = this.replyData;
      const name = this.replyName;

      if (data.content === '') {
        this.prompt = true;
        this.promptText = '回复内容不能为空';
        return;
      }
      const tail = '来自 [vue2-cnodejs](https://duxy1995.coding.me/)';

      if (data.content.indexOf(name) === 0) {

        data.content = `[${name}](/user/${name.split('@')[1]})` + data.content.split(name)[1] + tail;
      }
      axios.post('https://cnodejs.org/api/v1//topic/588a959b1dc8ff8739cbc66d/replies', data).then(res => {
        this.$emit('refresh');
        this.send = 'before';
        data.content = '';
      })
      .catch(err => {
        error(err, this);
        this.send = 'before';
      });
    },
    getTime,
  },
};
</script>

<style lang="scss">
@import '../assets/mixin';

.m-topic-comment {
  margin-bottom: 30px;
  border: 2px solid $bl;
  border-radius: 10px 10px 0 0;
  background: $bl;
  box-shadow: 0px 0px 0px rgba(0, 0, 0, 0.157647), 0px 0px 21px rgba(0, 0, 0, 0.157647);
  .item {
    width: 100%;
    padding: 20px 20px 0 20px;
    background: #fff;
    border-top: 1px solid #ccc;
    &.author {
      background: #e8f5e9;
      li {
        background: #e8f5e9;
      }
      .name::before {
        content: "作者";
        margin-right: 5px;
        color: $re;
        border: 1px solid $re;
        border-radius: 3px;
        font: normal 12px/14px $ff;
        @include wh(30px, 14px);
        text-align: center;
      }
    }
  }
  .info {
    position: relative;
    @include wh(100%, 20px);
    padding-left: 50px;
    font: bold 14px/20px $ff;
    cursor: pointer;
    img {
      position: absolute;
      left: 0;
      @include wh(40px);
      margin-right: 10px;
      border-radius: 50%;
    }
    .other {
      float: right;
    }
    i {
      @include fc(18px, $bl);
      vertical-align: sub;
      &:hover, &.ups {
        color: $re;
      }
    }
  }
  .content {
    margin-left: 50px;
    .u-publish {
      overflow: hidden;
      height: 190px;
      .ct {
        @include wh(90%, 150px);
      }
      .submit {
        padding: 0 5px;
        height: 30px;
        font: 14px/30px $ff;
      }
    }
  }
}
@media all and (max-width: 800px) {
  .m-topic-comment {
    margin: 0;
    border: none;
    border-radius: 0;
    .item {
      padding: 10px 10px 0 10px;
    }
    .content .u-publish {
      .ct {
      width: 100%;
      }
      .submit {
        width: 100%;
      }
    } 
  }
}
.markdown-link {
  color: #4078c0;
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
}
</style>