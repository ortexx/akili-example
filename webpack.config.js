const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const TerserPlugin = require('terser-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');
const path = require('path');
const plugins = [];
const isProd = process.env.NODE_ENV === 'production';

plugins.push(new MiniCssExtractPlugin({ filename: 'style.css' }));
plugins.push(new ESLintPlugin());

const config = {
  mode: isProd? 'production': 'development',
  performance: { hints: false },
  watch: !isProd,
  devtool: "inline-source-map",
  entry: "./src/main.js",
  output: {
    clean: true,
    path: __dirname + '/public/assets/',
    filename: "main.js",
    publicPath: '/'
  },
  optimization: {
    minimizer: [
      new TerserPlugin({
        extractComments: false
      }),
      new CssMinimizerPlugin(),
    ]
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        options: {
          configFile: path.resolve('./.babelrc')
        }
      },
      {
        test: /\.html$/,
        use: {
          loader: 'html-loader',
          options: {
            esModule: false
          }
        }        
      },
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader, 
          'css-loader',
          'resolve-url-loader',
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true
            }
          }
        ]
      },
      {
        test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2)$/,
        loader: 'file-loader',
        options: {
          esModule: false
        }
      }
    ]
  },
  plugins
};

module.exports = config;