# vue2-cnodejs

## 前言

该项目是使用 vue-cli 搭建的，基于 vue2 + vue-router + vuex 重写的 cnodejs 社区。线上访问地址：[vue2-cnodejs](https://duxingyu.github.io)。

## 项目运行

```
git clone https://github.com/duxingyu/vue2-cnodejs.git

cd vue2-cnodejs

npm install
```

### 编译环境

```
npm start

自动打开浏览器 http://localhost:8088
```

### 线上版本

```
npm run build
```

## 项目布局

```
|-- build                            // webpack配置文件
|-- config                           // 项目打包路径
|-- dist                         	   // 项目生成目录
|-- src                              // 源码目录
|   |-- assets                       // js, css及图片资源
|      |-- css                       // 公共CSS文件
|      |-- img                       // 图片资源
|      |-- el.scss                   // element-ui主题色
|      |-- mixin.scss                // scss 变量及mixin
|      |-- utils.js                  // 公共js方法
|   |-- components                   // 组件
|      |-- appBar.vue                // 导航栏
|      |-- appHeader.vue             // 页面头部
|      |-- appPrompt.vue             // 错误信息提示
|      |-- appPublish.vue            // 评论回复、新建编辑话题框及发送按钮
|      |-- appUtils.vue              // 右下角回到顶部，发布话题
|      |-- appSelf.vue               // 导航栏用户登录，退出
|   |-- pages                        // 页面(略)
|   |-- router                       // 路由配置
|   |-- store                        // vuex状态管理
|   |-- App.vue                      // 页面入口文件
|   |-- main.js                      // 程序入口文件
|-- .babelrc                         // ES6语法编译配置
|-- .editorconfig                    // 代码编写规格
|-- .eslintignore                    // eslint忽略文件夹、文件
|-- .eslintrc.js                     // eslint规则
|-- .gitignore                       // 忽略的文件
|-- postcssrc.js                     // postcss autoprefixer配置
|-- index.html                       // html入口文件
|-- LICENSE                          // LICENSE
|-- package-lock.json                // package-lock
|-- package.json                     // 项目及工具的依赖配置文件
|-- README.md                        // 项目说明
```

## 关于

该项目最初来源于@shinygang 的[Vue-cnodejs](https://github.com/shinygang/Vue-cnodejs)，感谢 cnodejs 社区提供的 API。项目依赖了 vue2，vue-router，vuex，axios 以及一个 vue-infinite-loading 无限加载组件、element-ui 的分页、选择框、加载组件。使用了所有的 API，使用提供的 API 能实现的功能均已实现。

## 使用须知

1.  如果没有 accesstoken，根据登录页下方的提示直接进入。
2.  临时用户只能在客户端测试版块发表话题。
3.  用户 accesstoken 使用 localStorage 存储，临时用户不进行存储。
4.  体验完整功能：[cnodejs 社区原地址](https://cnodejs.org)

## 项目不足

1.  社区提供的 API 有限，一部分功能无法实现。
2.  简单地做了响应式处理，没有针对移动端进行处理。
3.  当用户在话题中评论、回复后返回的数据不包含格式化后的内容(markdown => html)，选择了重新获取完整数据插入到最后，使用相应的 js 可能更好。
4.  编辑话题时重新请求了未渲染的话题内容, 性能有影响。
5.  路由跳转后的滚动行为没有处理好，如滚动到锚点。
