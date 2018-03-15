<template>
<!-- 侧边导航栏上方用户简要信息组件 -->
<div class="m-nav-log">
  <!-- 登录状态 -->
  <div class="in" v-if="user">
    <!-- 用户头像，点击后进入用户页 -->
    <div class="head">
      <router-link :to="{ name: 'appUser', params: { userId: user.loginname } }">
        <img :src="user.avatar_url" :alt="user.loginname">
      </router-link>
      <!-- 用户名 -->
      <p class="name">{{user.loginname}}</p>
    </div>
    <!-- 退出登录按钮 -->
    <div class="exit" @click="exitLogin">
      <i class="material-icons">exit_to_app</i>
    </div>
  </div>
  <!-- 未登录状态，点击进入登录页 -->
  <div class="out" v-else>
    <router-link to="{ name: 'appLogin' }">
      <i class="material-icons">account_circle</i>
    </router-link>
  </div>
</div>
</template>

<script>
export default {
  name: 'appSelf',
  data() {
    return {
      user: null,
    };
  },
  created() {
    this.isLogin();
  },
  methods: {
    isLogin() {
      this.user = this.$store.store.state.user;
    },
    exitLogin() {
      this.$store.store.commit('setUser', null);
      this.isLogin();

      const storage = window.localStorage;
      if (storage.user) {
        storage.removeItem('user');
      }
    },
  },
  // $$
  watch: {
    $route(to, from) {
      if (from.path === '/login') {
        this.isLogin();
      }
    },
  },
};
</script>

<style lang="scss">
@import '../assets/mixin';

.m-nav-log {
  position: relative;
  @include wh(200px, 140px);
  background: $re;
  .head,
  .out {
    @include wh(100px);
    padding: 20px 0 0 20px;
  }
  .head img {
    width: 80px;
    border-radius: 50%;
  }
  .name {
    color: #fff;
    font: 16px/30px $ff;
  }
  .exit {
    position: absolute;
    top: 20px;
    right: 20px;
    cursor: pointer;
    i {
      @include fc(30px, #fff);
    }
  }
  .out i {
    @include fc(80px, #fff);
  }
}
</style>
