<template>
<div class="g-bar">
  <div 
    class="menu" 
    @click.stop="toggle" 
  >
    <i class="material-icons">menu</i>
  </div>
  <div 
    class="wrap" 
    @click="toggle"
    :class="{show: show}"
    @mousewheel.prevent
    >
  <nav class="m-nav" :class="{fold: show}">
    <app-self></app-self>
    <ul class="list">
      <li 
        v-for="item of nav" 
        :key="item.icon" 
      > 
        <router-link :to="item.router">
        <i class="material-icons">{{item.icon}}</i>
        {{ item.text }}
        </router-link>
      </li>
    </ul>
  </nav>
  </div>
</div>
</template>

<script>
import appSelf from './appSelf';

export default {
  name: 'appBar',
  data() {
    return {
      nav: [
        { text: '首页', router: '/?tab=home', icon: 'home' },
        { text: '精华', router: '/?tab=good', icon: 'grade' },
        { text: '分享', router: '/?tab=share', icon: 'share' },
        { text: '问答', router: '/?tab=ask', icon: 'help' },
        { text: '招聘', router: '/?tab=job', icon: 'contact_mail' },
        { text: '关于', router: '/about', icon: 'info' },
      ],
    };
  },
  components: {
    appSelf,
  },
  props: ['show'],
  methods: {
    toggle() {
      this.$emit('hide');
    },
  },
};
</script>

<style lang="scss">
@import '../assets/mixin';

.g-bar {
  position: relative;
  z-index: 200;
  .menu {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 20;
    display: flex;
    justify-content: center;
    align-items: center;
    @include wh(64px);
    cursor: pointer;
    background: $bl;
    font-size: 32px;
    color: #fff;
  }
  .wrap {
    position: fixed;
    visibility: hidden;
    top: 0;
    left: 0;
    z-index: 50;
    @include wh(100%);
    opacity: 0;
    transition: .3s;
    background: rgba(0, 0, 0, 0.3);
    &.show {
      opacity: 1;
      visibility: visible;
    }

  }
}
.m-nav {
  position: fixed;
  z-index: 100;
  @include wh(200px, 100%);
  top: 0;
  left: 0;
  background: #fff;
  transition: transform .3s;
  transform: translate(-200px, 0);
  box-shadow: 5px 1px 6px rgba(0,0,0,.117647), 0 1px 4px rgba(0,0,0,.117647);
  &.fold {
    transform: translate(0, 0);
  }
  li {
    a {
      display: block;
      @include wh(100%, 48px);
      color: $bl;
      font: bold 16px/3 $ff;
      padding-left: 24px;
      cursor: pointer;
    }
    i {
      font-size: 20px;
      padding-right: 20px;
      vertical-align: text-bottom;
    }
    &:hover{
      background: $bl;
      a {
        color: #fff;
      }
    }
  }
}
</style>