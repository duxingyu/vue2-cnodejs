<template>
<header class="u-header">
  <h1 class="logo">
    <router-link to="/">
      <img src="https://o4j806krb.qnssl.com/public/images/cnodejs_light.svg" alt="cnodejs">
    </router-link>
  </h1>
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
  @include hl($h);
  background: $bl;
  color: #fff;
  box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.157647), 5px 5px 40px rgba(0, 0, 0, 0.157647);
  .logo {
    height: $h;
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
  .more {
    float: right;
    @include wh(64px);
    line-height: 64px;
    cursor: pointer;
  }
  h2 {
    position: absolute;
    left: $h;
    top: 0;
    font: normal 18px/64px $ff;
    color: #fff;
  }
}
@media all and (max-width: 500px) {
  .u-header {
    .logo img {
      display: none;
    }
  }
}
</style>