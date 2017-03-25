<template>
  <div class="m-login">
    <app-header title="登录"></app-header>
    <input
      class="inp" 
      type="text" 
      autofocus
      placeholder="请输入36位accesstoken"
      @keyup.enter="post"
      v-model="token">
    <button 
      type="button" 
      class="submit"
      @click="post">
      提交
    </button>
    <app-prompt 
      :show="prompt" 
      :text="promptText" 
      @close="hide"></app-prompt>
  </div>
</template>

<script>
import axios from 'axios';
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
    const user = this.$store.store.state.user;
    if (user) {
      this.$router.replace(`/user/${user.loginname}`);
    }
  },
  methods: {
    hide() {
      this.prompt = false;
    },
    post() {
      if (this.token.length !== 36) {
        this.promptText = '请输入36位accesstoken';
        this.prompt = true;
        return;
      }
      axios.post('https://cnodejs.org/api/v1/accesstoken', {
        accesstoken: this.token,
      }).then(res => {
        const user = {
          token: this.token,
          loginname: res.data.loginname,
          id: res.data.id,
          avatar_url: res.data.avatar_url,
        };
        this.$store.store.commit('setUser', user);

        if (window.localStorage) {
          localStorage.setItem('user', JSON.stringify(user));
        }
        window.a = res;
        this.$router.go(-1);
      }).catch(err => error(err, this));
    },
  },
};
</script>

<style lang="scss">
@import '../assets/mixin';

.m-login {
  background: #fff;
  margin: 40px 20px;
  .inp {
    border: none;
    width: 100%;
    height: 50px;
    padding: 18px;
    font-size: 14px;
    border-bottom: 2px solid $re;
    margin-bottom: 30px;
    background: #fff;
    border-radius: 10px 10px 0 0;
    &:focus {
      background: #fff;
    }
  }
  .submit {
    width: 100%;
    height: 40px;
    background: $re;
    color: #fff;
    border: none;
    border-right: 2px solid #d32f2f;
    border-bottom: 3px solid #d32f2f;
    border-radius: 5px;
    font: 20px/40px SimHei;
    &:hover {
      opacity: 0.9;
    }
  }
}
@media all and (max-width: 800px) {
  .m-login {
    margin: 10px;
    .inp {
      margin-bottom: 20px;
    }
  }
}
</style>