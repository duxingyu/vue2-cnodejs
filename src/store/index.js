import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    // 登录用户基本信息
    user: {
      id: '',
      loginname: '',
      avatar: '',
      token: null,
    },
    // 用户消息数
    mesCount: 0,
    // 编辑话题信息
    topicMes: {
      accesstoken: '',
      topic_id: '',
      title: '',
      tab: '',
      content: '',
    },
    // 临时用户accesstoken
    defaultToken: 'aabc3938-ad2f-40c4-aa7c-d4f36181b62a',
  },
  mutations: {
    setUser(state, data) {
      Object.keys(data).forEach(val => {
        state.user[val] = data[val];
      });
    },
    setCount(state, data) {
      state.mesCount += data;
    },
    editTopic(state, data) {
      Object.keys(data).forEach(val => {
        state.topicMes[val] = data[val];
      });
    },
  },
});

export default {
  store,
};
