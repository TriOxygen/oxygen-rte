var path = require('path');
var webpack = require('webpack');
var fs = require('fs');
var path = require('path');
var babelConfig = JSON.parse(fs.readFileSync(path.resolve('.babelrc')));

module.exports = {
  // cache: true,
  devtool: 'cheap-module-source-map',
  entry: [
    'webpack-dev-server/client?http://localhost:3003',
    'webpack/hot/only-dev-server',
    './app/index'
  ],
  resolve: {
    root: [
      path.join(__dirname, 'src'),
      path.join(__dirname, 'app'),
      path.resolve('dist')
    ],
    modulesDirectories: ['node_modules'],
    fallback: path.resolve(__dirname, 'node_modules')
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/static/'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ],
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'react-hot',
        include: [path.join(__dirname, 'src'), path.join(__dirname, 'app')]
      },
      {
        test: /\.js$/,
        loader: 'babel',
        include: [path.join(__dirname, 'src'), path.join(__dirname, 'app')],
        query: babelConfig,
      },
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader?name=[path][name].[hash].[ext]',
      },
    ]
  }
};
