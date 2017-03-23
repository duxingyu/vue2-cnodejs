/* 使用SSE（服务端发送事件）实现热更新 */

/* eslint-disable */
require('eventsource-polyfill')
var hotClient = require('webpack-hot-middleware/client?noInfo=true&reload=true')

hotClient.subscribe(function(event) {
  if (event.action === 'reload') {
    window.location.reload()
  }
})
