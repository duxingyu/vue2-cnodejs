<template>
<!-- 用户面板 -->
<aside class="m-userpanel">
  <h4 class="u-desc-title">个人信息</h4>
  <!-- 用户头像及用户名 -->
  <div class="content">
    <div class="basic">
      <img
        class="avatar"
        :src="data.avatar_url"
        :alt="data.loginname">
      <span class="loginname">{{ data.loginname }}</span>
    </div>
    <!-- github地址、积分、注册时间 -->
    <div class="other">
      <span class="github">
        <a
          v-if="data.githubUsername"
          target="blank"
          :href="`https://github.com/${data.githubUsername}`">
          <img src="../assets/img/github.svg" alt="github">@{{ data.githubUsername }}
        </a>
      </span>
      <span class="score">积分：<span>{{ data.score }}</span></span>
      <span class="collect"><span>{{ count }}</span> 个话题收藏</span>
      <span>注册时间：</span>
      <span class="time">{{getTime(data.create_at, true)}}</span>
    </div>
  </div>
</aside>
</template>
<script>
import { getTime } from '../assets/utils';

export default {
  name: 'userPanel',
  props: ['data', 'count'],
  methods: {
    getTime,
  },
};
</script>

<style lang="scss">
@import '../assets/mixin';

.m-userpanel {
  min-width: 200px;
  .content {
    display: flex;
    flex-direction: column;
    background: #fff;
    border-radius: 0 0 10px 10px;
    padding: 20px 0;
  }
  .basic,
  .other {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .other {
    font: bold 14px/24px $ff;
  }
  .avatar {
    width: 100px;
    border-radius: 50%;
  }
  .loginname {
    font: bold 16px/30px $ff;
  }
  .github {
    a {
      color: #4fc3f7;
    }
    img {
      width: 18px;
      vertical-align: text-bottom;
    }
  }
  .score span,
  .collect span {
    color: $re;
  }
}
@media all and (max-width: 600px) {
  .m-userpanel {
    width: 100%;
    min-width: 250px;
    .content {
      padding: 10px;
      border-radius: 0;
      flex-direction: row;
      background: #fafafa;
      box-shadow: $bs;
    }
    > h4 {
      display: none;
    }
    .basic {
      width: 40%;
      .avatar {
        width: 80px;
        margin: 0;
      }
    }
    .other {
      align-items: flex-start;
    }
  }
}
</style>
