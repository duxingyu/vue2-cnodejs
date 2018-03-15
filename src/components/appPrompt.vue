<template>
<!-- 顶栏下方错误提示组件 -->
<div class="u-prompt" :class="{show: show}">
  <div class="prompt-ct" :class="{show: show}">
    <i class="material-icons">error</i>
    {{ text }}
  </div>
</div>
</template>

<script>
export default {
  name: 'appPrompt',
  // 错误提示文本，显示
  props: ['text', 'show'],
  watch: {
    // 1.5s后错误提示消失
    show() {
      if (this.show) {
        setTimeout(() => {
          this.$emit('close');
        }, 1500);
      }
    },
  },
};
</script>

<style lang="scss">
@import '../assets/mixin';
$h: 40px;

.u-prompt {
  position: fixed;
  top: 24px;
  left: 0;
  z-index: 20;
  display: flex;
  justify-content: center;
  @include wh(100%, $h);
  visibility: hidden;
  .prompt-ct {
    padding: 0 $h/2;
    height: $h;
    border-radius: $h/2;
    background: rgba(255, 73, 73, 0.8);
    font: 14px /#{$h} $ff;
    color: #fff;
    transform: translate(0, 0);
    transition: 0.3s;
    i {
      font-size: 20px;
      vertical-align: text-bottom;
    }
  }
  &.show {
    visibility: visible;
    .prompt-ct {
      transform: translate(0, 40px);
      transition: 0.3s;
    }
  }
}
</style>
