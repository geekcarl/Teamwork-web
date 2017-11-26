const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackInlineSVGPlugin = require('html-webpack-inline-svg-plugin');

module.exports = {
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Chat For Github',
      favicon:'./assets/images/chat.svg',
      template: './assets/template/index.ejs',
      // svgoConfig: {
      //   removeTitle: false,
      //   removeViewBox: true,
      // }
    }),
    // new HtmlWebpackInlineSVGPlugin()
  ]
}
