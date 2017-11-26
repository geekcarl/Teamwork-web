var path = require('path');
var webpack = require('webpack');
var glob = require('glob'); 
var entries = getEntry('./teamwork/**/*.js');
var HtmlWebpackPlugin = require('html-webpack-plugin'); 

module.exports = {
  //entry: './src/main.js',
  entry: entries,          
  output: {
    path: path.resolve(__dirname, './dist/'),
    publicPath: '/',  
    filename: '[name].js'
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue',
        options: {
          loaders: {
            'scss': 'vue-style-loader!css-loader!sass-loader'
          }
        }
      },
      {
        test: /\.html$/,
        exclude: /node_modules/,
        loader: 'html?minimize'
      },
      {
        test: /\.js$/,
        loader: 'babel',
        exclude: /node_modules/
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: 'file',
        options: {
          name: 'assets/image/[name].[ext]?[hash]'
        }
      },
      { 
        test: /\.scss$/,
        loader:  ['style', 'css', 'resolve-url', 'sass']
      },
      {
        test:/\.css$/,
        loader:['style', 'css']
      }
    ]
  },
  resolve: {
    alias: {
      'vue$': 'vue/dist/vue',
      'pubscss':path.resolve(__dirname, 'teamwork/css'),
      'pubimg': path.resolve(__dirname, 'teamwork/img')
    }
  },
  devServer: {
    contentBase: path.join(__dirname, "dist/teamwork/"),
    historyApiFallback: true,
    noInfo: true
  },
  devtool: '#eval-source-map',
  plugins:[]
}

if (process.env.NODE_ENV === 'production') {
  module.exports.devtool = '#source-map'
  // http://vue-loader.vuejs.org/en/workflow/production.html
  module.exports.plugins = (module.exports.plugins || []).concat([
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true
    })
  ])
}


//获取多页面的路径
function getEntry(globPath) {
  var entries = {},
      basename, tmp, pathname;

  glob.sync(globPath).forEach(function (entry) {
    basename = path.basename(entry, path.extname(entry));  //basename 为：detail
    tmp = entry.split('/').splice(-3);
    //pathname = tmp.splice(0, 1) + '\/' + basename; // 正确输出js和html的路径
    pathname = tmp[0] + '\/' + tmp[1] + '\/' + basename; // modify by ls正确输出js和html的路径
    entries[pathname] = entry;
  });
  console.log(entries);
  return entries;
}



//add by ls 自动注入
var pages = getEntry('./teamwork/**/*.html');
for (var pathname in pages) {
  // 配置生成的html文件，定义路径等
  var conf = {
    filename: pathname + '.html', 
    template: pages[pathname],    
    chunks: [pathname+'.js', 'vendor', 'manifest'], 
    inject: true             
  };
console.log(conf);
console.log('--------------------------');
  module.exports.plugins.push(new HtmlWebpackPlugin(conf));
}