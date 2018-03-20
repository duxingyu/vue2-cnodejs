<template>
<!-- 登录页 -->
<div class="m-login">
  <app-header title="登录"></app-header>
  <input
    type="text"
    v-focus
    placeholder="请输入36位 accesstoken"
    @keyup.enter="post(token)"
    v-model="token">
  <button type="button" class="submit" @click="post(token)">提交</button>
  <p class="tip">
    <span>提示：</span>
    如果没有accesstoken，可以点击
    <a @click.prevent="post(getDefaultToken)">这里</a>
    进行登录。
  </p>
  <app-prompt
    :show="prompt"
    :text="promptText"
    @close="hide"></app-prompt>
</div>
</template>

<script>
import { error } from '../assets/utils';
import appHeader from '../components/appHeader';
import appPrompt from '../components/appPrompt';

export default {
  name: 'loginPage',
  data() {
    return {
      token: '',
      prompt: false,
      promptText: '',
    };
  },
  components: {
    appHeader,
    appPrompt,
  },
  created() {
    // 当用户已经登录，跳转到用户信息页面
    const user = this.$store.store.state.user;
    if (user.token) {
      this.$router.replace(`/user/${user.loginname}`);
    }
  },
  // 自动获取焦点，autofocus不清楚为什么不管用
  directives: {
    focus: {
      inserted(el) {
        el.focus();
      },
    },
  },
  computed: {
    getDefaultToken() {
      return this.$store.store.state.defaultToken;
    },
  },
  methods: {
    hide() {
      this.prompt = false;
    },
    post(accesstoken) {
      const token = accesstoken.trim();
      if (token.length !== 36) {
        this.promptText = '请输入36位 accesstoken';
        this.prompt = true;
        return;
      }
      this.$http
        .post('accesstoken', { accesstoken: token })
        .then(res => {
          const data = res.data;
          const user = {
            token,
            loginname: data.loginname,
            id: data.id,
            avatar: data.avatar_url,
          };
          this.getMesCount(token);
          this.setUser(user);
        })
        .catch(err => error(err, this));
    },
    setUser(userInfo) {
      this.$store.store.commit('setUser', userInfo);

      // 非临时用户使用localStorage存储
      const storage = window.localStorage;
      if (storage && (userInfo.token !== this.getDefaultToken)) {
        storage.setItem('user', JSON.stringify(userInfo));
      }
      this.$router.go(-1);
    },
    getMesCount(token) {
      this.$http
        .get(`message/count?accesstoken=${token}`)
        .then(res => {
          this.$store.store.commit('setCount', res.data.data);
        })
        .catch(err => error(err, this));
    },
  },
};
</script>

<style lang="scss">
@import '../assets/mixin';

.m-login {
  margin: 84px 20px;
  input {
    border: none;
    width: 100%;
    @include fl(18px, 50px);
    border-bottom: 2px solid $re;
    margin-bottom: 30px;
    caret-color: $re;
  }
  .submit {
    @include wh(100%, 40px);
    background: $re;
    color: #fff;
    border: none;
    border-right: 2px solid #d32f2f;
    border-bottom: 3px solid #d32f2f;
    border-radius: 5px;
    @include fl(20px, 2);
    letter-spacing: 8px;
    &:hover {
      opacity: 0.9;
    }
  }
  .tip {
    @include fl(16px, 24px);
    margin-top: 20px;
    a {
      color: $re;
      &:hover {
        text-decoration: underline;
      }
    }
    span,
    a {
      font-weight: bold;
    }
  }
}
@media all and (max-width: 600px) {
  .m-login {
    margin: 10px;
    input {
      margin-bottom: 20px;
    }
  }
}
</style>
