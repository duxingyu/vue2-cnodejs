<template>
<!-- 用户消息页面 -->
<div class="m-message">
  <app-header title="个人消息"></app-header>
  <!-- 获取到数据才可以加载 -->
  <div v-if="finish" class="wrap">
    <div class="m-usermes">
      <!-- 用户新消息、过往消息 -->
      <div v-for="(item, index) of mesItem" :key="item">
        <h4 class="u-desc-title">
          {{ item }}
          <!-- 消息数目 -->
          <span class="u-list-count">{{mesList[index].length}}</span>
          <!-- 标记全部已读 -->
          <button
            class="other"
            v-if="index === 0"
            :disabled="mesList[0].length === 0"
            :class="{'mark-not' : mesList[0].length === 0}"
            @click="markAll">标记全部已读</button>
        </h4>
        <!-- 消息列表 -->
        <ul v-if="mesList[index].length">
          <li v-for="mes of changeContent(mesList[index])" :key="mes.id" class="list">
            <!-- title 包括消息用户、时间、类型、标题 -->
            <p class="title">
              <router-link :to="`/user/${mes.author.loginname}`">
                {{ mes.author.loginname }}
              </router-link>于<span>{{getTime(mes.reply.create_at)}}</span>&nbsp;在&nbsp;<router-link :to="`/topic/${mes.topic.id}#a${mes.reply.id}`" @click.native.prevent="markOne(mes, index)">{{ mes.topic.title }}
              </router-link>&nbsp;中{{mesType[mes.type]}}了你：
            </p>
            <!-- 消息内容 -->
            <article class="content markdown-body" v-html="mes.reply.content"></article>
          </li>
          <!-- 分页 -->
          <li class="e-page" v-if="mesList[index].length >= 10">
            <el-pagination
              background
              layout="prev, pager, next"
              :current-page.sync="mesList[index].crtPage"
              @current-change="changePage"
              :total="mesList[index].length">
            </el-pagination>
          </li>
        </ul>
        <p class="not" v-else>无消息</p>
      </div>
    </div>
  </div>
  <app-utils></app-utils>
  <app-prompt
    :show="prompt"
    :text="promptText"
    @close="hide"></app-prompt>
</div>
</template>

<script>
import { Loading } from 'element-ui';
import { error, getTime } from '../assets/utils';
import appUtils from '../components/appUtils';
import appHeader from '../components/appHeader';
import appPrompt from '../components/appPrompt';
import userPanel from './userPanel';
import userTopics from './userTopics';
import api from '../assets/api';

export default {
  name: 'appUser',
  data() {
    return {
      mesItem: ['新消息', '过往消息'],
      mesList: [],
      mesType: {
        reply: '回复',
        at: '@',
      },
      token: '',
      prompt: false,
      promptText: '',
      finish: false,
    };
  },
  props: ['userId'],
  components: {
    appUtils,
    appPrompt,
    appHeader,
    userPanel,
    userTopics,
  },
  // 用户未登录跳转到登录页
  created() {
    const token = this.$store.store.state.user.token;
    if (!token) {
      this.$router.push('/login');
    } else {
      this.token = this.$store.store.state.user.token;
      this.getMessage(Loading.service(this.$loadConfig));
    }
  },
  methods: {
    hide() {
      this.prompt = false;
    },
    // 获取信息，加入当前页为第一页
    getMessage(load) {
      api.userMessage(this.token)
        .then(res => {
          const data = res.data.data;
          this.mesList.push(data.hasnot_read_messages, data.has_read_messages);
          this.$set(this.mesList[0], 'crtPage', 1);
          this.$set(this.mesList[1], 'crtPage', 1);
          this.finish = true;
          load.close();
        })
        .catch(err => error(err, this));
    },
    // 页码改变时回到顶部
    changePage() {
      window.scrollTo(0, 0);
    },
    // 改变页码时改变内容
    changeContent(list) {
      return list.slice((list.crtPage - 1) * 10, list.crtPage * 10);
    },
    // 标记单个已读：当点击话题名时标记已读并跳转
    markOne(mes, index) {
      if (index === 0) {
        api.markOne(mes.id, {accesstoken: this.token})
          .then(() => {
            this.$store.store.commit('setCount', -1);
          })
          .catch(err => error(err, this));
      }
      this.$router.push(`/topic/${mes.topic.id}#a${mes.reply.id}`);
    },
    // 标记全部已读,当按钮disabled时，click事件不会触发
    markAll() {
      api.markAll(this.token)
        .then(() => {
          // 将新消息移到过往消息中
          this.$store.store.commit('setCount', -this.mesList[0].length);
          this.mesList[1].unshift(...this.mesList[0]);
          this.mesList[0].splice(0);
        })
        .catch(err => error(err, this));
    },
    getTime,
  },
};
</script>

<style lang="scss">
@import '../assets/mixin';

.m-message {
  padding: 50px 20px;
  background: #f1f1f1;
  min-height: 100vh;
  .m-usermes {
    min-width: 300px;
    > div {
      background: #fff;
      margin-bottom: 20px;
      border-radius: 0 0 10px 10px;
      padding-bottom: 20px;
      > ul {
        box-shadow: $bs;
      }
    }
    .not {
      padding: 20px 0 0 20px;
      font-size: 16px;
    }
  }
  .list {
    padding: 10px;
    border-bottom: 1px solid #ccc;
    .title {
      font-size: 14px;
      a {
        color: #4078c0;
        font-weight: bold;
        &:hover {
          color: $re;
          text-decoration: underline;
        }
      }
    }
    .content {
      margin-top: 10px;
      background: #f6f6f6;
      padding: 10px 10px 0 10px;
    }
  }
  .e-page {
    margin-bottom: -20px;
    padding: 10px 0;
    display: flex;
    justify-content: center;
  }
  .mark-not {
    background: #bdbdbd;
    cursor: not-allowed;
    &:hover {
      background: #bdbdbd;
    }
  }
}

@media all and (max-width: 600px) {
  .m-message {
    padding: 10px 0;
  }
}
</style>
