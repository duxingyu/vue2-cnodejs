<template>
<div id="app" @click="toggleBar(true)">
  <app-bar :show="bar" @hide="toggleBar"></app-bar>
  <!--内容区-->
  <div class="g-ct">
    <router-view></router-view>
  </div>
</div>
</template>

<script>
import appBar from './components/appBar';

export default {
  name: 'app',
  data() {
    return {
      bar: false,
    };
  },

  created() {
    // 如果localStorage中存在用户数据则获取
    const storage = window.localStorage;
    if (storage && storage.user) {
      this.$store.store.commit('setUser', JSON.parse(storage.user));
    }
  },
  components: {
    appBar,
  },
  methods: {
    toggleBar(close) {
      this.bar = close ? false : !this.bar;
    },
  },
};
</script>

<style>
#app {
  position: relative;
  min-height: 100vh;
  min-width: 250px;
}
.g-ct {
  margin-top: 64px;
}
</style>
