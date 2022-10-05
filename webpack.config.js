const path = require("path");
const webpack = require("webpack");
const HtmlwebpackPlugin = require("html-webpack-plugin");
const { VueLoaderPlugin } = require("vue-loader");
module.exports = {
  // entry:入口文件
  entry: "./src/main.js",
  // output:输出文件，文件名称为bundle
  output: {
    filename: "bundle.js", // 配置输出文件名，可添加路径配置（例如：bundle/）
    path: path.resolve(__dirname, "dist"), // 文件输出路径，必须是绝对路径
  },
  // mode:三种模式：development（生产环境），production（开发环境）或none
  mode: "development",
  module: {
    rules: [
      {
        test: /.vue$/, // test：识别出那些文件会被转换
        use: "vue-loader", // use：定义在转换时，使用哪个loader
      },
      {
        test: /.css$/,
        use: ["style-loader", "css-loader"],
      },
      // 还可配置其他loader，如scss,less
    ],
  },
  plugins: [
    new VueLoaderPlugin(),
    new HtmlwebpackPlugin({
      template: "./src/index.html"
    }),
  ],
};

