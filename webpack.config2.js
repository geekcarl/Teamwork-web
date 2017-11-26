const
    path = require("path"),
    merge = require('webpack-merge'),
    webpack = require('webpack'),
    ManifestPlugin = require('webpack-manifest-plugin'),
    devWebpackConfig = require('./build/webpack.dev.config'),
    prodWebpackConfig = require('./build/webpack.prod.config'),
    ExtractTextPlugin = require('extract-text-webpack-plugin'),
    CleanWebpackPlugin = require('clean-webpack-plugin');

const webpackConfig = merge( process.env.NODE_ENV == 'development' ?  devWebpackConfig : prodWebpackConfig, {
    entry: {
        'app': './teamwork/js/index.js'
    },
    output: {
        filename: "[name].[hash].js",
        chunkFilename:'[name].[chunkhash].js',
        path: path.join(__dirname, "dist"),
        publicPath:"/",
    },
    module: {
        rules:[
            {
                test: /(\.less|\.css)$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: ['css-loader', 'less-loader']
                })
            },{
                test: /\.(png|svg|jpg|gif)$/,
                use: [
                    'file-loader'
                ]
            },{
                test: /\.(js|jsx)$/,
                exclude: /(node_module|bower_components)/,
                loader:'babel-loader'
                // },{
                //   test: /\.json$/,
                //   loader: 'json-loader'
            },{
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                use: [
                    'file-loader'
                ]
            }
        ]
    },
    plugins: [
        // new webpack.ContextReplacementPlugin(/moment[\\\/]locale$/, /^\.\/(en|zh-tw)$/),
        // new ManifestPlugin(path.join('dist', 'manifest.json')),
        new CleanWebpackPlugin(['dist']),
        new webpack.optimize.CommonsChunkPlugin({
            name: "vender",
            minChunks: function(module){
                return module.context && module.context.indexOf("node_modules") !== -1;
            }
        }),
        new ExtractTextPlugin({
            filename:'index.[hash].css'
        })
    ],
})


module.exports = webpackConfig;
