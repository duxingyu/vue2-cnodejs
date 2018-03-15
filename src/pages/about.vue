<template>
<div class="m-about">
  <app-header title="关于"></app-header>
  <dl>
    <dt>关于项目</dt>
    <dd>该项目最初来源于@shinygang的<a href="https://github.com/shinygang/Vue-cnodejs" target="blank">Vue-cnodejs</a>，感谢cnodejs社区提供的API。项目依赖了vue2，vue-router，vuex，axios以及一个vue-infinite-loading组件。做了简单的响应式。大多数功能已经实现。但编辑主题及未读消息目前没有实现。</dd>
    <dt>源码地址</dt>
    <dd>
      <a href="https://github.com/duxingyu/vue2-cnodejs" target="blank">
        <img src="../assets/img/github.svg" alt="github">
        <em>https://github.com/duxingyu/vue2-cnodejs</em>
      </a>。
    </dd>
    <dt>其他</dt>
    <dd>如果没有Accesstoken(登录用)，可以使用
      <em>aabc3938-ad2f-40c4-aa7c-d4f36181b62a</em>
      进行登录。
    </dd>
  </dl>
</div>
</template>

<script>
import appHeader from '../components/appHeader';

export default {
  name: 'about',
  components: {
    appHeader,
  },
};
</script>

<style lang="scss">
@import '../assets/mixin';

.m-about {
  padding: 20px;
  @include wh(100%);
  dl {
    a, a:hover {
      color: $re;
      font-weight: bold;
      text-decoration: underline;
    }
    dt {
      font: bold 20px/3 $ff;
    }
    dd {
      font: 16px/24px $ff;
    }
    img {
      width: 20px;
      vertical-align: text-bottom;
    }
  }
}
@media all and (max-width: 500px) {
  .m-about {
    padding: 10px;
  }
}
</style>
