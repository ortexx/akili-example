const webpack = require("webpack");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const CleanWebpackPlugin = require('clean-webpack-plugin')
const plugins = [];
const isProd = process.env.NODE_ENV === 'production';

plugins.push(new ExtractTextPlugin('style.css'));
plugins.push(new CleanWebpackPlugin(['public/assets/*'], { root: __dirname }));

if(isProd) {
  plugins.push(new webpack.optimize.UglifyJsPlugin({
    minimize: true,
    compress: {
      warnings: false
    }
  }));
}

const config = {
  watch: !isProd,
  devtool: "inline-source-map",
  entry: "./src/main.js",
  output: {
    path: __dirname + '/public/assets/',
    filename: "main.js",
    publicPath: '/'
  },
  module: {
    loaders: [
      {
        enforce: "pre",
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'eslint-loader',
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        query: {
          presets: ['env', 'stage-2', 'stage-3']
        }
      },
      {
        test: /\.html$/,
        use: 'html-loader'
      },
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: `css-loader?minimize=${isProd}!resolve-url-loader!sass-loader?sourceMap`
        })
      },
      {
        test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2)$/,
        loader: 'file-loader'
      }
    ]
  },
  plugins: plugins
};

module.exports = config;