const htmlFiles = require('./htmlfiles');

const path = require('path');
const Webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HardSourceWebpackPlugin = require('hard-source-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

const pathToPublicAssets = 'public/';
const pathToCss = 'css/[name].[hash].css';
const pathToJs = 'js/[name].[hash].js';
const pathToSrc = `${__dirname}/src/`;
const NODE_MODULES = /(node_modules|bower_components)/;

const uglifyJsPluginConfig = {
  uglifyOptions: {
    mangle: {
      toplevel: true
    },
    compress: {
      toplevel: true,
      unused: true,
      dead_code: true,
      drop_console: true,
    }
  }
}

const compressionPluginConfig = {
  asset: '[path].gz[query]',
  algorithm: 'gzip',
  test: /\.js$|\.css$|\.html$/,
}

const sassLoader = () => {
  return {
    test: /\.scss$/,
    use: ExtractTextPlugin.extract({
      fallback: 'style-loader',
      use: [
        'css-loader',
        'postcss-loader',
        'sass-loader'
      ]
    })
  }
}

const jsLoader = () => {
  return {
    test: /\.js$/,
    exclude: NODE_MODULES,
    use: {
      loader: 'babel-loader',
      options: {
        presets: [['@babel/preset-env', { modules: false }]]
      }
    }
  }
}

const jsOutput = () => {
  return {
    path: path.resolve(__dirname, pathToPublicAssets),
    filename: pathToJs,
  }
}

const webpackConfig = {
  entry: './webpack-entry-points.js',

  output: jsOutput(),

  module: {
    rules: [
      sassLoader(),
      jsLoader()
    ]
  },

  plugins: [
    new CleanWebpackPlugin(pathToPublicAssets),
    new HardSourceWebpackPlugin(),
    new ExtractTextPlugin(pathToCss),
    new UglifyJsPlugin(uglifyJsPluginConfig),
    new CompressionPlugin(compressionPluginConfig),
    new Webpack.DefinePlugin({
      'process.env.NODE_ENV': '"production"'
    }),
  ],
}

htmlFiles.forEach(htmlFile => webpackConfig.plugins.push(
  new HtmlWebpackPlugin({
    filename: htmlFile,
    template: `src/markup/${htmlFile}`
  })
));

module.exports = webpackConfig;