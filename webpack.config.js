const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const TerserPlugin = require('terser-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const plugins = [];
const isProd = process.env.NODE_ENV === 'production';

plugins.push(new MiniCssExtractPlugin({ filename: 'style.css' }));
plugins.push(new CleanWebpackPlugin(['public/assets/*'], { root: __dirname }));

const config = {
  mode: isProd? 'production': 'development',
  performance: { hints: false },
  watch: !isProd,
  devtool: "inline-source-map",
  entry: "./src/main.js",
  output: {
    path: __dirname + '/public/assets/',
    filename: "main.js",
    publicPath: '/'
  },
  optimization: {
    minimizer: [
      new TerserPlugin({
        extractComments: false     
      }),
      new OptimizeCSSAssetsPlugin()
    ]
  },
  module: {
    rules: [
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
          presets: ['akili']
        }
      },
      {
        test: /\.html$/,
        use: 'html-loader'
      },
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader, 
          'css-loader',
          'resolve-url-loader',
          'sass-loader?sourceMap',
        ]
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