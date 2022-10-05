# vue2-template
## 初始化项目
> ` npm init -y `

**-y** 的含义：yes的意思，默认生成package.json文件；


初始化package.json内部文件：

1. version:版本号，一般从1.0.0开始；
2. description:项目描述；
3. keywords:关键词用逗号隔开；
4. author:名字加邮箱；
5. license:版权许可证，一般不授权公用；

## 安装生产环境依赖-S
> `npm install vue vue-router -S`

## 安装开发环境依赖-D
> `npm install babel-core babel-loader vue-loader css-loader style-loader webpack webpack-cli webpack-dev-server html-webpack-plugin vue-template-compiler -D`

### 各个依赖的作用

> `babel-core`：使用Babel进行转码的核心npm包。兼容新语法在低版本中的编译，如箭头函数、[rest参数](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Functions/Rest_parameters)、函数默认值等；</br>
> `babel-loader`：用于webpack的一个loader，以便webpack在构建的时候用Babel对JS代码进行转译，这样就不用再通过命令行手动转译了；</br>
> `vue-loader`：允许你以一种名为[单文件组件 (SFCs)](https://vue-loader.vuejs.org/zh/spec.html)的格式撰写 Vue 组件，更多[炫酷的特性](https://vue-loader.vuejs.org/zh/#vue-loader-%E6%98%AF%E4%BB%80%E4%B9%88%EF%BC%9F)；</br>
> `css-loader`：会对@import和url()进行处理，就像js解析import/require()一样，[详解](https://webpack.docschina.org/loaders/css-loader/)；</br>
> `style-loader`：把CSS插入到DOM中，建议style-loader和css-loader一起使用，[详解](https://webpack.docschina.org/loaders/style-loader)；</br>
> `webpack`：模块打包工具；</br>
> `webpack-cli`：简化webpack的工作，可在webpack.config.js中对webpack进行配置，cli中传入的任何参数会在配置文件中映射为对应的参数；</br>
> `webpack-dev-server`：DevServer是webapck3开放的一个实验功能，使用webpack-dev-middleware中间件，提供热更新的开发服务器，旨在帮助我们再开发阶段快速进行环境搭建；</br>
> `html-webpack-plugin`：简化HTML文件的创建，以便为webpack包提供服务。</br>
> `vue-template-compiler`：该模块可用于将Vue2.0模板预编译为渲染函数(template=>ast=>render)，以避免运行时编译开销和[CSP限制](https://developer.mozilla.org/zh-CN/docs/web/http/csp)；


## 配置项目启动执行脚本命令

```js
 "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "dev":"webpack-dev-server --config webpack.config.js"
  },
```
## 创建index.html文件
在body下添加id为app的元素，用于挂载vue实例

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Vue2</title>
</head>
<body>
    <div id="app"></div>
</body>
</html>
```
## 创建src文件
### src文件下创建
> \- App.vue</br>
> \- main.js</br>
> \- views文件夹</br>
> \----Home.vue</br>
> \----About.vue</br>
> \- router文件夹</br>
> \----index.js

#### 在main.js构建vue实例，引入路由

```js
import Vue from "vue";
import App from './App.vue';
import router from './router';

new Vue({
    el:"#app",
    router,
    render:h=>h(App)
})
```
#### 在Home.vue和About.vue文件中写入

```vue
<template>
    <div>Home</div>
</template>
```

```vue
<template>
    <div>About</div>
</template>
```
#### 在router路由文件index.js中写入

```js
import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

const routes=[
    {
        path:'/',
        name:'home',
        title:'首页',
        component:()=>import('../views/Home.vue')
    },
    {
        path:'/about',
        name:'about',
        title:'关于',
        component:()=>import('../views/About.vue')
    }
]

const router = new Router({
    routes
})

export default router
```
#### 在App.vue中写入

```vue
<template>
  <div id="nav">
    <router-link to="/">Home</router-link>
    <router-link to="/about">About</router-link>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
};
</script>

<style>
/* 可以安装sass或less */
#nav {
  font-family: Arial, Helvetica, sans-serif;
  text-align: center;
  padding: 20px;
}
a {
  text-decoration: none;
  color: black;
  font-weight: bold;
}
a .router-link-exact-active {
  color: #42b983;
}
</style>
```
## 关键：在根目录创建并配置webpack.config.js文件

```js
const path = require("path");
const webpack = require("webpack");
const HtmlwebpackPlugin = require("html-webpack-plugin");
const { VueLoaderPlugin } = require("vue-loader");
const config = {
  // entry:入口文件
  entry: path.join(__dirname, "src/main.js"),
  // output:输出文件，文件名称为bundle
  output: {
    filename: "bundle.js", // 配置输出文件名，可添加路径配置（例如：bundle/）
    path: path.join(__dirname, "dist"), // 文件输出路径，必须是绝对路径
  },
  // mode:三种模式：development（生产环境），production（开发环境）或none
  mode: "development",
  module: {
    rules: [
      {
        test: /\.vue$/, // test：识别出那些文件会被转换
        use: "vue-loader", // use：定义在转换时，使用哪个loader
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      // 还可配置其他loader，如scss,less
    ],
  },
  plugins: [
    new VueLoaderPlugin(),
    new HtmlwebpackPlugin({
      filename: "index.html",
      template: "index.html",
      inject: true,
    }),
  ],
};

module.exports = config;
```
