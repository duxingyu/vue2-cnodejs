<template>
<transition name="utils">
  <ul class="u-utils">
    <!--回到顶部-->
    <transition name="top">
      <li class="item" v-if="pos">
        <i 
          @click="top"
          class="material-icons top">
          arrow_upward</i>
      </li>
    </transition>
    <!--发表话题-->
    <li class="item">
      <i 
        @click="edit"
        class="material-icons edit">
        edit</i>
    </li>
  </ul>
</transition>
</template>

<script>
export default {
  name: 'appUtils',
  data() {
    return {
      token: null,
      pos: false,
    };
  },
  created() {
    const user = this.$store.store.state.user;
    if (user) this.token = user.token;
    window.addEventListener('scroll', this.scroll);
  },
  methods: {
    edit() {
      this.$router.push('/create');
      if (!this.token) {
        this.$router.push('/login');
      }
    },
    scroll() {
      this.pos = window.scrollY > 500;
    },
    top() {
      // 0.5s
      const w = window;
      const v = w.scrollY / 10;
      this.pos = false;
      w.removeEventListener('scroll', this.scroll);

      let timer = null;
      timer = setInterval(() => {
        w.scrollBy(0, -v);

        if (w.scrollY <= 0) {
          clearInterval(timer);
          w.addEventListener('scroll', this.scroll);
        }
      }, 50);
    },
  },
};
</script>

<style lang="scss">
@import '../assets/mixin';

.u-utils {
  position: fixed;
  bottom: 30px;
  right: 30px;
  z-index: 100;
  .item {
    @include wh(40px);
    margin-top: 5px;
    background: $re;
    border-radius: 50%;
    text-align: center;
    box-shadow: 1px 1px 10px rgba(0, 0, 0, 0.157647), 5px 5px 21px rgba(0, 0, 0, 0.157647);
    a {
      display: block;
    }
    i {
      position: relative;
      color: #fff;
      cursor: pointer;
      line-height: 40px;
      &::before {
        position: absolute;
        top: 8px;
        right: 30px;
        visibility: hidden;
        height: 24px;
        padding: 6px;
        font: 12px/1 $ff;
        color: #fff;
        border-radius: 3px;
        background: rgba(0, 0, 0, 0.1);
        transform: translate(0, 0);
      }
      &:hover {
        color: #000;
        &::before {
          transition: .3s;
          visibility: visible;
          background: rgba(0, 0, 0, 0.7);
          transform: translate(-10px, 0);
        }
      }
      &.edit::before {
        content: "发布话题";
      }
      &.top::before {
        content: "回到顶部";
      }
    }
  }
}
.utils-enter-active, .utils-leave-active,
.top-enter-active, .top-leave-active {
  transition: .5s;
}
.utils-enter, .utils-leave-active,
.top-enter, .top-leave-active {
  opacity: 0;
  transform: translate(0, 50px);
}
</style>