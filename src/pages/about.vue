<template>
<!-- 关于项目页面 -->
<div class="m-about">
  <app-header title="关于"></app-header>
  <dl>
    <dt>关于项目</dt>
    <dd>该项目最初来源于@shinygang的<a href="https://github.com/shinygang/Vue-cnodejs" target="blank">Vue-cnodejs</a>，感谢cnodejs社区提供的API。项目依赖了vue2，vue-router，vuex，axios以及一个vue-infinite-loading无限加载组件、element-ui的分页、选择框、加载组件。使用了所有的API，使用提供的API能实现的功能均已实现。</dd>
    <dt>源码地址</dt>
    <dd>
      <a href="https://github.com/duxingyu/vue2-cnodejs" target="blank">
        <img src="../assets/img/github.svg" alt="github">
        <em>https://github.com/duxingyu/vue2-cnodejs</em>
      </a>。
    </dd>
    <dt>使用须知</dt>
    <dd>1. 如果没有accesstoken，根据登录页下方的提示直接进入。</dd>
    <dd>2. 临时用户只能在客户端测试版块发表话题。</dd>
    <dd>3. 用户accesstoken使用localStorage存储，临时用户不进行存储。</dd>
    <dd>4. 体验完整功能：<a href="https://cnodejs.org">cnodejs社区原地址</a></dd>
    <dt>项目不足</dt>
    <dd>1. 社区提供的API有限，一部分功能无法实现。</dd>
    <dd>2. 简单地做了响应式处理，没有针对移动端进行处理。</dd>
    <dd>3. 当用户在话题中评论、回复后返回的数据不包含格式化后的内容(markdown => html)，选择了重新获取完整数据插入到最后，使用相应的js可能更好。</dd>
    <dd>4. 编辑话题时重新请求了未渲染的话题内容, 性能有影响。</dd>
    <dd>5. 路由跳转后的滚动行为没有处理好，如滚动到锚点。</dd>
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
  dl {
    text-align: justify;
    a {
      color: $re;
      font-weight: bold;
      text-decoration: underline;
    }
    dt {
      font: bold 20px/3 $ff;
    }
    dd {
      @include fl(16px, 24px);
    }
    img {
      width: 20px;
      vertical-align: text-bottom;
    }
  }
}
@media all and (max-width: 600px) {
  .m-about {
    padding: 10px;
  }
}
</style>
