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
    <a @click.prevent="post(defaultToken)">这里</a>
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
      defaultToken: 'aabc3938-ad2f-40c4-aa7c-d4f36181b62a',
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
    if (user) {
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
  methods: {
    hide() {
      this.prompt = false;
    },
    setUser(userInfo) {
      this.$store.store.commit('setUser', userInfo);

      // 如果使用的是defaultToken，选择sessionStorage，否则为localStorage
      const storage = window[userInfo.token === this.defaultToken ? 'sessionStorage' : 'localStorage'];
      if (storage) {
        storage.setItem('user', JSON.stringify(userInfo));
      }
      this.$router.go(-1);
    },
    post(accesstoken) {
      const token = accesstoken.trim();
      if (token.length !== 36) {
        this.promptText = '请输入36位 accesstoken';
        this.prompt = true;
        return;
      }
      this.$http
        .post('https://cnodejs.org/api/v1/accesstoken', { accesstoken: token })
        .then(res => {
          const data = res.data;
          const user = {
            token,
            loginname: data.loginname,
            id: data.id,
            avatar_url: data.avatar_url,
          };
          this.setUser(user);
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
    font: 18px/50px $ff;
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
    font: 20px/2 $ff;
    letter-spacing: 8px;
    &:hover {
      opacity: 0.9;
    }
  }
  .tip {
    font: 16px/24px $ff;
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
@media all and (max-width: 800px) {
  .m-login {
    margin: 10px;
    input {
      margin-bottom: 20px;
    }
  }
}
</style>
