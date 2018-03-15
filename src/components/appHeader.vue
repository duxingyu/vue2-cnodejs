<template>
<!-- 顶栏 -->
<header class="u-header">
  <!-- logo，导航到主页 -->
  <h1 class="logo">
    <router-link to="/">
      <img src="https://o4j806krb.qnssl.com/public/images/cnodejs_light.svg" alt="cnodejs">
    </router-link>
  </h1>
  <!-- 左上角页面标题 -->
  <h2>
    {{ title }}
  </h2>
</header>
</template>

<script>
export default {
  name: 'appHeader',
  props: ['title'],
};
</script>

<style lang="scss">
@import '../assets/mixin';
$h: 64px;

.u-header {
  position: fixed;
  z-index: 100;
  top: 0;
  left: 0;
  width: 100%;
  @include wh(100%, $h);
  background: $bl;
  color: #fff;
  box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.157647), 5px 5px 40px rgba(0, 0, 0, 0.157647);
  .logo {
    text-align: center;
    a {
      display: inline-block;
    }
    img {
      display: block;
      height: $h;
      padding: $h/4 0;
    }
  }
  h2 {
    position: absolute;
    left: $h;
    top: 0;
    font: normal 18px /#{$h} $ff;
    color: #fff;
  }
}
@media all and (max-width: 500px) {
  .u-header .logo img {
    display: none;
  }
}
</style>
