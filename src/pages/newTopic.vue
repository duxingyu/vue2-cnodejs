<template>
<!-- 新建话题、编辑话题 -->
<div class="m-new-topic">
  <app-header :title="type === 'new' ? '新建话题' : '编辑话题'"></app-header>
  <label for="select" class="select">选择版块：
    <el-select v-model="data.tab" placeholder="请选择" id="select" size="small">
      <el-option
        v-for="item in options"
        :key="item.tab"
        :label="item.label"
        :value="item.tab"
        :disabled="item.disabled">
      </el-option>
    </el-select>
  </label>
  <input
    v-model="data.title"
    placeholder="标题字数 10字以上"
    class="title">
  <app-publish
    btnText="发布"
    :at="data.content"
    @reply="addArticle"></app-publish>
  <app-prompt
    :show="prompt"
    :text="promptText"
    @close="hide"></app-prompt>
</div>
</template>

<script>
import appHeader from '../components/appHeader';
import appPublish from '../components/appPublish';
import appPrompt from '../components/appPrompt';
import { error } from '../assets/utils';

export default {
  name: 'newTopic',
  data() {
    return {
      options: [
        { label: '问答', tab: 'ask', disabled: false },
        { label: '分享', tab: 'share', disabled: false },
        { label: '招聘', tab: 'job', disabled: false },
        { label: '测试', tab: 'dev', disabled: false },
      ],
      type: '',
      data: {
        tab: '',
        title: '',
        accesstoken: '',
        content: '',
      },
      send: 'before',
      prompt: false,
      promptText: '',
    };
  },
  components: {
    appHeader,
    appPublish,
    appPrompt,
  },
  created() {
    const state = this.$store.store.state;
    this.type = this.$route.name === 'newTopic' ? 'new' : 'edit';
    if (!state.user.token) {
      this.$router.push('/login');
    } else {
      // 临时用户只能选择在测试版块发帖
      if (state.user.token === state.defaultToken) {
        this.options.forEach((val, index) => {
          if (val.tab !== 'dev') {
            this.options[index].disabled = true;
          }
        });
      }
      this.data.accesstoken = state.user.token;
      // 编辑话题部分
      if (this.type === 'edit') {
        Object.keys(state.topicMes).forEach(val => {
          this.data[val] = state.topicMes[val];
        });
      }
    }
  },
  methods: {
    // 新建话题、编辑话题
    addArticle(content) {
      if (this.send === 'loading') return;
      this.send = 'loading';

      this.data.content = content;
      this.$http
        .post(`topics${this.type === 'edit' ? '/update' : ''}`, this.data)
        .then(res => {
          // 转到话题页面
          this.$router.push(`/topic/${res.data.topic_id}`);
        })
        .catch(err => {
          error(err, this);
          this.send = 'before';
        });
    },
    hide() {
      this.prompt = false;
    },
  },
};
</script>

<style lang="scss">
@import '../assets/mixin';

.m-new-topic {
  width: 100%;
  padding: 30px 10%;
  .select {
    font-size: 14px;
    display: block;
    height: 40px;
  }
  .title {
    width: 100%;
    text-indent: 1em;
    margin-bottom: 10px;
    font: 14px/34px SimHei;
    border: 1px solid #dcdfe6;
    border-radius: 5px;
    &:hover {
      border-color: #c0c4cc;
    }
    &:focus {
      border-color: $re;
      box-shadow: 1px 1px 10px rgba(255, 82, 82, 0.2), 5px 5px 21px rgba(255, 82, 82, 0.1);
    }
  }
  .ct {
    height: 50vh;
  }
}
@media all and (max-width: 600px) {
  .m-new-topic {
    padding: 10px;
  }
}
</style>
