<template>
<!-- 侧边导航栏上方用户简要信息组件 -->
<div class="m-nav-log">
  <!-- 登录状态 -->
  <div class="in" v-if="getName">
    <!-- 用户头像，点击后进入用户页 -->
    <div class="head">
      <router-link :to="`/user/${getName}`">
        <img :src="getAvatar" :alt="getName">
      </router-link>
      <!-- 用户名 -->
      <p class="name">{{getName}}</p>
    </div>
    <!-- 退出登录按钮 -->
    <div class="exit" @click="exitLogin">
      <i class="material-icons">exit_to_app</i>
    </div>
  </div>
  <!-- 未登录状态，点击进入登录页 -->
  <div class="out" v-else>
    <router-link to="/login">
      <i class="material-icons">account_circle</i>
    </router-link>
  </div>
</div>
</template>

<script>
export default {
  name: 'appSelf',
  computed: {
    // 获取用户名
    getName() {
      return this.$store.store.state.user.loginname;
    },
    // 获取用户头像
    getAvatar() {
      return this.$store.store.state.user.avatar;
    },
  },
  methods: {
    // 退出登录，如果localStorage存在，则删除数据
    exitLogin() {
      this.$store.store.commit('setUser', {
        id: '',
        loginname: '',
        avatar: '',
        token: null,
      });

      const storage = window.localStorage;
      if (storage.user) {
        storage.removeItem('user');
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
    @include fl(16px, 30px);
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
