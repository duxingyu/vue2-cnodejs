<template>
<!-- 话题评论 -->
<div class="m-topic-comment">
  <p class="u-desc-title">
    {{ data.reply_count }}&nbsp;条回复
  </p>
  <!-- 评论列表 -->
  <ol class="body" @click.prevent="dealIink">
    <li
      class="item"
      v-for="(val, index) of data.replies"
      :class="{author: isAuthor(val.author.loginname)}"
      :key="index"
      :id="`a${val.id}`">
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
        <!-- 对评论点赞、回复 -->
        <span>
          <i
            class="material-icons"
            :class="{ups: isUps(val.ups)}"
            @click="ups(val, index)">thumb_up</i>
          {{ val.ups.length || '' }}
          <i
            class="material-icons"
            @click="reply(val, index)">comment</i>
        </span>
      </div>
      <!-- 评论内容 -->
      <div class="content">
        <p class="main markdown-body" v-html="val.content"></p>
        <app-publish
          v-if="val.show"
          :at="`@${val.author.loginname}`"
          :index="index"
          :small="true"
          btnText="提交"
          @reply="subReply"></app-publish>
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
import appPublish from '../components/appPublish';

export default {
  name: 'topicComment',
  props: ['data', 'user'],
  data() {
    return {
      send: 'before',
      prompt: false,
      promptText: '',
    };
  },
  components: {
    appPrompt,
    appPublish,
  },
  methods: {
    dealIink(e) {
      // 站外链接打开新窗口
      // 通过js获取到的相对url为绝对url
      // 如：e.target.href = 'http://localhost:8080/user/duxy
      // link: ['http', '', 'localhost:8080', 'user', 'duxy']
      if (e.target.tagName === 'A') {
        const link = e.target.href.split(/\//);
        if (link[2] === window.location.host) {
          this.$router.push(`/${link.slice(3).join('/')}`);
        } else {
          window.open(e.target.href);
        }
      }
    },
    // 评论用户是否为作者
    isAuthor(loginname) {
      return loginname === this.data.author.loginname;
    },
    // 判断用户是否点赞
    isUps(val) {
      return this.user.token ? val.includes(this.user.id) : false;
    },
    // 点赞或取消点赞
    ups(val) {
      // 用户未登录跳转到登录页
      if (!this.user.token) {
        this.$router.push('/login');
        return;
      }
      if (this.isAuthor(val.author.loginname)) {
        this.promptText = '不能帮自己点赞';
        this.prompt = true;
        return;
      }

      this.$http
        .post(`reply/${val.id}/ups`, {
          accesstoken: this.user.token,
        })
        .then(res => (res.data.action === 'up' ? val.ups.push(this.user.id) : val.ups.pop()))
        .catch(err => error(err, this));
    },
    hide() {
      this.prompt = false;
    },
    // 弹出或收回回复框
    reply(val, index) {
      if (!this.user.token) {
        this.$router.push('/login');
        return;
      }
      this.data.replies[index].show = !val.show;
    },
    // 回复
    subReply(content, i) {
      if (this.send === 'loading') return;
      this.send = 'loading';

      if (content === '') {
        this.prompt = true;
        this.promptText = '回复内容不能为空';
        return;
      }

      const replyContent = `${content}

来自 [vue2-cnodejs](https://duxingyu.github.io)`;

      this.$http
        .post(`topic/${this.data.id}/replies`, {
          accesstoken: this.user.token,
          content: replyContent,
          reply_id: this.data.replies[i].id,
        })
        .then(() => {
          // 回复成功后收回回复框
          this.data.replies[i].show = false;
          this.$emit('reget');
          this.send = 'before';
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
  box-shadow: $bs;
  .item {
    padding: 20px 20px 0 20px;
    border-top: 1px solid #ccc;
    &.author {
      background: #e8f5e9;
      li {
        background: #e8f5e9;
      }
      .name::before {
        content: '作者';
        margin-right: 5px;
        color: $re;
        width: 30px;
        border: 1px solid $re;
        border-radius: 3px;
        @include fl(12px, 14px);
        text-align: center;
      }
    }
  }
  .info {
    height: 20px;
    display: flex;
    font: bold 14px/20px $ff;
    img {
      @include wh(40px);
      margin-right: 10px;
      border-radius: 50%;
    }
    .user {
      flex-grow: 1;
    }
    i {
      cursor: pointer;
      @include fc(18px, $bl);
      vertical-align: text-bottom;
      &:hover,
      &.ups {
        color: $re;
      }
    }
  }
  .content {
    margin-left: 50px;
  }
}
@media all and (max-width: 600px) {
  .m-topic-comment {
    margin: 0;
    .item {
      padding: 10px 10px 0 10px;
    }
    .content .u-publish {
      .ct,
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
.markdown-body {
  text-align: justify;
}
</style>
