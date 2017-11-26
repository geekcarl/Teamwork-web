const path = require('path');
const webpack = require('webpack');
const autoprefixer = require('autoprefixer');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const OpenBrowserPlugin = require('open-browser-webpack-plugin');
// 引入css 单独打包插件
var ExtractTextPlugin = require("extract-text-webpack-plugin");
// 设置生成css 的路径和文件名，会自动将对应entry入口js文件中引入的CSS抽出成单独的文件
const models = [
    'index',
    'activity',
    'login',
    'register'
    // 'demo'
];
var entrys = {};
models.forEach(function(mode){
    entrys[mode] = './js/' + mode + '.js';
});
module.exports = {
    context: path.join(__dirname, './teamwork'),
    // entry: {
    //     index: './js/index.js',
    //     activity: './js/activity.js'
    // },
    entry: entrys,
    output: {
        path: path.join(__dirname, './dist/teamwork'),
        // path: 'G:\\01_Project\\Teamwork\\src\\main\\resources\\static',
        // filename: 'js/[name]-[hash].js',
        filename: 'js/[name].js',
        publicPath: '/'
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel'
            },
            {
                test: /\.html$/,
                exclude: /node_modules/,
                loader: 'html?minimize'
            },
            {
                test: /\.less$/,
                exclude: /node_modules/,
                loader: 'style!css?modules&importLoaders=1&localIdentName=[name]__[local]_[hash:base64:5]!postcss!less'
            },
            {
                test: /\.css$/,
                exclude: /node_modules/,
                loader: 'style!css!postcss'
            }
        ]
    },
    postcss: [autoprefixer],
    plugins: [
        new webpack.DefinePlugin({
            NODE_ENV: '"dev"',
            'process.env.NODE_ENV': '"dev"'
        }),
        new OpenBrowserPlugin({url: 'http://localhost:8001'})
    ]
};

models.forEach(function(mode){
    var conf = {
        filename: mode + '.html',
        template: path.join(__dirname, './teamwork/' + mode + '.html'),
        // chunks:['./js/index.js']
        chunks: [mode],
        inject: true
    };
    module.exports.plugins.push(new HtmlWebpackPlugin(conf));
});
