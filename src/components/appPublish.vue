<template>
<!-- 评论回复、新建、编辑话题框及发布按钮组件 -->
  <div class="u-publish">
    <textarea
      class="ct"
      v-model="content"
      placeholder="支持markdown语法格式"></textarea>
    <button
      class="submit"
      :class="`sub-${small ? 'small' : 'normal'}`"
      @click="sub">{{ btnText }}</button>
  </div>
</template>

<script>
export default {
  name: 'appPublish',
  props: {
    at: String,
    index: Number,
    btnText: String,
    small: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      content: '',
    };
  },
  created() {
    this.content = this.at ? `${this.at} ${this.content}` : this.content;
  },
  methods: {
    sub() {
      this.$emit('reply', this.content, this.index);
      this.content = '';
    },
  },
};
</script>

<style lang="scss">
@import '../assets/mixin';

.u-publish {
  margin-bottom: 10px;
  .ct {
    width: 100%;
    height: 200px;
    padding: 20px;
    font-size: 14px;
    border-radius: 5px;
    &:focus {
      border: 1px solid $re;
      box-shadow: 1px 1px 10px rgba(255, 82, 82, 0.2), 5px 5px 21px rgba(255, 82, 82, 0.1);
    }
  }
  .submit {
    width: 100%;
    background: $re;
    color: #fff;
    border: none;
    border-right: 2px solid #d32f2f;
    border-bottom: 3px solid #d32f2f;
    border-radius: 5px;
    letter-spacing: 0.5em;
    &:hover {
      opacity: 0.9;
    }
  }
  .sub-normal {
    height: 40px;
    @include fl(20px, 2);
  }
  .sub-small {
    height: 30px;
    @include fl(14px, 30px);
  }
}
</style>
