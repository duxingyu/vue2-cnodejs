# vue2-cnodejs

## 前言

该项目是使用vue-cli搭建的，基于vue2 + vue-router + vuex重写的cnodejs社区。线上访问地址：[vue2-cnodejs](https://duxy1995.coding.me)。

## 项目运行

```
git clone https://github.com/duxingyu/vue2-cnodejs.git  

cd vue2-cnodejs

npm install

```

### 编译环境
```
npm run dev

访问 http://localhost:8088
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
|      |-- mixin.scss                // scss 变量及mixin
|      |-- utils.js                  // 公共js方法
|   |-- components                   // 组件
|      |-- appBar.vue                // 导航栏
|      |-- appHeader.vue             // 页面头部
|      |-- appPrompt.vue             // 错误信息提示
|      |-- appUtils.vue              // 右下角回到顶部，发布话题
|      |-- appSelf.vue               // 导航栏登陆，退出
|   |-- pages                        // 页面
|   |-- router                       // 路由配置
|   |-- store                        // vuex状态管理
|   |-- App.vue                      // 页面入口文件
|   |-- main.js                      // 程序入口文件
|-- .babelrc                         // ES6语法编译配置
|-- .editorconfig                    // 代码编写规格
|-- .gitignore                       // 忽略的文件
|-- postcssrc.js                     // postcss autoprefixer配置
|-- index.html                       // html入口文件
|-- package.json                     // 项目及工具的依赖配置文件
|-- README.md                        // 项目说明
```

## 关于

该项目最初来源于@shinygang的[Vue-cnodejs](https://github.com/shinygang/Vue-cnodejs)，感谢cnodejs社区提供的API。项目依赖了vue2，vue-router，vuex，axios以及一个vue-infinite-loading组件。做了简单的响应式。大多数功能已经实现。但编辑主题及未读消息目前没有实现。
