<template>
<div class="m-nav-log">
  <div class="in" v-if="user">
    <div class="head">
      <router-link :to="`/user/${user.loginname}`">
        <img 
          :src="user.avatar_url" 
          :alt="user.loginname">
      </router-link>
      <p class="name">{{user.loginname}}</p>
    </div>
    <div
      class="exit" 
      @click="exitLogin">
      <i class="material-icons">exit_to_app</i>
    </div>
  </div>
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
  watch: {
    '$route'(to, from) {
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
  .head, .out {
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