<template>
<div class="m-userpanel clearfix">
  <div class="user-sim">
    <img 
      class="head"
      :src="data.avatar_url" 
      :alt="data.loginname">
    <p class="name">{{ data.loginname }}</p>
  </div>
  <div class="user-other">
    <p class="github">
      <a 
        v-if="data.githubUsername"
        target="blank" 
        :href="`https://github.com/${data.githubUsername}`">
        <img src="../assets/img/github.svg" alt="github">@{{ data.githubUsername }}
      </a>
    </p>
    <p class="score">积分：<span>{{ data.score }}</span></p>
    <p class="collect">{{ count }}个话题收藏</p>
    <p class="time">注册时间：<br>{{getTime(data.create_at, true)}}</p>
  </div>
</div>
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
  float: left;
  width: 200px;
  background: #fff;
  border-radius: 5px;
  border: 2px solid $bl;
  padding: 20px 0;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.157647), 5px 5px 40px rgba(0, 0, 0, 0.157647);
  .user-sim, .user-other {
    text-align: center;
  }
  .head {
    @include wh(100px);
    border-radius: 50%;
  }
  >p {
    text-align: center;
  }
  .name {
    font: bold 16px/30px $ff;
  }
  .github {
    a {
      color: #4fc3f7;
    }
    img {
      @include wh(18px);
      vertical-align: text-bottom;
    }
  }
  .score span {
    color: $re;
  }
  .score, .collect, .time, .github {
    font: bold 14px/24px $ff;
  }
}
@media all and (max-width: 500px) {
  .m-userpanel {
    float: none;
    width: 100%;
    margin: 0;
    padding: 10px;
    border: none;
    background: #fafafa;
    .user-sim {
      float: left;
      width: 40%;
      .head {
        @include wh(80px);
        margin: 0;
      }
    }
    .user-other {
      float: right;
      width: 60%;
      text-align: left;
    }
  }
}
</style>