const htmlFiles = require('./htmlfiles');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const HardSourceWebpackPlugin = require('hard-source-webpack-plugin');
const HappyPack = require('HappyPack');
const happyThreadPool = HappyPack.ThreadPool({ size: 4 });

const pathToSrc = `${__dirname}/src/`
const NODE_MODULES = /(node_modules|bower_components)/;

const fs = require('fs');

const devServer = () => {
  return {
    contentBase: path.join(`${__dirname}/src/`),
    watchContentBase: true,
    watchOptions: {
      ignored: NODE_MODULES
    },
    overlay: true,
  }
}

const sassLoader = () => {
  return {
    test: /\.scss$/,
    use: 'happypack/loader?id=styles'
  }
}

const jsLoader = () => {
  return {
    test: /\.js$/,
    exclude: NODE_MODULES,
    use: 'happypack/loader?id=js'
  }
}

const webpackConfig = {
  entry: './webpack-entry-points.js',
  devtool: 'eval',
  mode: 'development',

  module: {
    rules: [
      sassLoader(), jsLoader()
    ]
  },

  devServer: devServer(),

  plugins: [
    new HardSourceWebpackPlugin(),
    new HappyPack({
      id: 'js',
      threadPool: happyThreadPool,
      loaders: ['babel-loader']
    }),

    new HappyPack({
      id: 'styles',
      threadPool: happyThreadPool,
      loaders: ['style-loader', 'css-loader', 'sass-loader']
    })
  ]
}

htmlFiles.forEach(htmlFile => webpackConfig.plugins.push(
  new HtmlWebpackPlugin({
    filename: htmlFile,
    template: `src/markup/${htmlFile}`
  })
));

module.exports = webpackConfig;