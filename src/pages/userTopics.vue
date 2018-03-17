<template>
<!-- 用户信息 -->
<div class="m-usertopics">
  <!-- 用户参与、创建、收藏的话题-->
  <div v-for="(topicItem, index) of (topicNum === 3 ? topic : [topic[topicNum]])" :key="topicItem">
    <h4 class="u-desc-title">{{ topicItem }}</h4>
    <!-- 各项列表 -->
    <ul v-if="topicList[index].length">
      <li v-for="item of sendList(topicList[index])" :key="item.id" class="list">
        <!-- 用户头像，跳转到用户页面 -->
        <router-link :to="{ name: 'appUser', params: { userId: item.author.loginname } }">
        <img
          class="avatar"
          :src="item.author.avatar_url"
          :title="item.author.loginname"
          :alt="item.author.loginname">
        </router-link>
        <!-- 话题 -->
        <router-link
          :to="{ name: 'appTopic', params: { topicId: item.id } }"
          :title="item.title"
          class="title ellipsis">{{item.title}}</router-link>
        <!-- 上次回复时间 -->
        <span class="time">{{ getTime(item.last_reply_at) }}</span>
      </li>
      <li class="more" v-if="getMore(topicList[index])">
        <router-link :to="{ name: 'appUserList', params: { list: index === 1 ? 'topics' : 'collections' }}">查看更多 &gt;&gt;</router-link>
      </li>
    </ul>
    <p class="not" v-else>无话题</p>
  </div>
</div>
</template>

<script>
import { getTime } from '../assets/utils';

export default {
  name: 'userTopics',
  data() {
    return {
      topic: ['最近参与的话题', '最近创建的话题', '我的收藏'],
    };
  },
  props: ['topicNum', 'topicList'],
  methods: {
    // 用户主页只显示5条话题
    sendList(list) {
      return this.topicNum === 3 ? list.slice(0, 5) : list;
    },
    getMore(list) {
      return list.length > 5 && this.topicNum === 3;
    },
    getTime,
  },
};
</script>

<style lang="scss">
@import '../assets/mixin';

.m-usertopics {
  min-width: 300px;
  margin-left: 30px;
  flex-grow: 1;
  > div {
    background: #fff;
    margin-bottom: 20px;
    border-radius: 0 0 10px 10px;
    padding-bottom: 20px;
  }
  ul {
    box-shadow: $bs;
  }
  .list {
    display: flex;
    height: 60px;
    padding: 10px;
    border-bottom: 1px solid #ccc;
    .avatar {
      width: 40px;
      margin-right: 20px;
      border-radius: 50%;
    }
    .title {
      color: $bl;
      font: bold 18px/40px SimHei;
      &:hover {
        color: $re;
        text-decoration: underline;
      }
    }
    .time {
      line-height: 40px;
      color: #333;
      flex-grow: 1;
      text-align: right;
      min-width: 54px;
    }
  }
  .more {
    padding-left: 10px;
    font: 14px/40px $ff;
    margin-bottom: -20px;
    a {
      color: $re;
      &:hover {
        text-decoration: underline;
      }
    }
  }
  .not {
    padding: 20px 0 0 20px;
    font-size: 16px;
  }
}

@media all and (max-width: 600px) {
  .m-usertopics {
    margin: 0;
    width: 100%;
    > div {
      border-width: 0;
      border-radius: 0;
      margin: 0;
    }
    .list {
      padding: 5px 10px;
      height: 50px;
      .avatar,
      .time {
        display: none;
      }
    }
  }
}
</style>
