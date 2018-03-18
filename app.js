"use strict";

const express = require('express');
const path = require('path');
const argv = require('optimist').argv;
const favicon = require('serve-favicon');
const akiliConnect = require('akili-connect');
const webpack = require('webpack');
const webpackConfig = require('./webpack.config');
const app = express();

// Create akili middlewares
const akili = akiliConnect({
  indexFile: path.join(__dirname, 'public/main.html')
});

app.use(favicon(path.join(__dirname, 'src/img/favicon.png')));
app.use(express.static(path.join(__dirname, 'public/assets')));

/**
 *  Set the necessary routes for the server rendering
 * 
 * {@link https://github.com/ortexx/akili-connect}
 * {@link https://akilijs.com/docs/server}
 */

if(argv.render) {  
  app.get('/', akili.route);
  app.get('/app', akili.route);
  app.get('/app/posts', akili.route);
  app.get('/app/users', akili.route);
  app.get('/app/post-edit/:id', akili.route);
}

app.get('*', akili.index);

app.use((err, req, res, next) => {
  console.log(err.stack);
  res.send(err.message);
});

// run the server
const server = app.listen(3300, function () {
  console.log('Server run on 3300 port');

  if(!argv.webpack) {
    return;
  }

  // run webpack
  const compiler = webpack(webpackConfig, (err, stats) => {
    if (err) { 
      throw err; 
    }

    console.log(stats.toString({ colors: true, children: false }));
  });

  process.on('SIGINT', () => {
    server.close();
    compiler.close && compiler.close();
    process.exit();
  });
});

