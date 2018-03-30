import axios from 'axios';

axios.defaults.baseURL = 'https://cnodejs.org/api/v1/';

const api = {
  // 话题相关
  // 话题列表，params：页数，类别，每页20
  topicList: (page, tab) => axios.get(`topics?page=${page}&limit=20&tab=${tab}`),
  // 话题收藏/取消收藏，params：是否收藏，data: token，话题id
  topicCollect: (isCollect, { accesstoken, topic_id }) =>
    axios.post(`topic_collect/${isCollect ? 'de_collect' : 'collect'}`, { accesstoken, topic_id }),
  // 话题信息，params：话题id，data: token，是否渲染为markdown
  topicInfo: (topicId, { accesstoken, mdrender }) =>
    axios.get(`topic/${topicId}?accesstoken=${accesstoken}&mdrender=${mdrender}`),
  // 话题编辑/新建，params：新建或编辑，data：类别，标题，token，内容，话题id(edit)
  topicEdit: (topicType, { tab, title, accesstoken, content, topic_id }) =>
    axios.post(`topics${topicType === 'edit' ? '/update' : ''}`, { tab, title, accesstoken, content, topic_id }),
  // 话题回复，params：话题id，data：token，回复内容, 评论id
  topicReply: (topicId, { accesstoken, content, reply_id }) =>
    axios.post(`topic/${topicId}/replies`, { accesstoken, content, reply_id }),
  // 话题评论点赞, params: 评论id，data: token
  commentUps: (commentId, { accesstoken }) => axios.post(`reply/${commentId}/ups`, { accesstoken }),

  // 用户相关
  // 用户登录, data: token
  userLogin: accesstoken => axios.post('accesstoken', { accesstoken }),
  // 用户信息，params: 用户id
  userInfo: userId => axios.get(`user/${userId}`),
  // 用户收藏，params: 用户名
  userCollect: loginname => axios.get(`topic_collect/${loginname}`),

  // 用户消息相关
  // 用户消息数量，params：token
  userMesCount: accesstoken => axios.get(`message/count?accesstoken=${accesstoken}`),
  // 用户消息，params：token
  userMessage: accesstoken => axios.get(`messages?accesstoken=${accesstoken}`),
  // 用户消息标记一个，params：消息id，data：token
  markOne: (mesId, { accesstoken }) => axios.post(`message/mark_one/${mesId}`, { accesstoken }),
  // 用户消息标记全部，data：token
  markAll: accesstoken => axios.post('message/mark_all', { accesstoken }),
};

export default api;
