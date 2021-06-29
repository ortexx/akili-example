"use strict";

const express = require('express');
const path = require('path');
const argv = require('yargs').argv;
const favicon = require('serve-favicon');
const akiliConnect = require('akili-connect');
const webpack = require('webpack');
const webpackConfig = require('./webpack.config');
const posts = require('./data/posts');
const users = require('./data/users');
const app = express();

// Create akili middlewares
const akili = akiliConnect({
  indexFile: path.join(__dirname, 'public/main.html')
});

app.use(favicon(path.join(__dirname, 'src/img/favicon.png')));
app.use(express.static(path.join(__dirname, 'public/assets')));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Api to return posts and users
app.get('/api/posts', (req, res) => res.send(posts));
app.get('/api/users', (req, res) => res.send(users));
app.put('/api/posts/:id', (req, res) => res.send(req.body));

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

// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  // eslint-disable-next-line no-console
  console.log(err.stack);
  res.send(err.message);
});

// run the server
const server = app.listen(3300, function () {
  // eslint-disable-next-line no-console
  console.log('Server run on 3300 port');

  if(!argv.webpack) {
    return;
  }

  // run webpack
  const compiler = webpack(webpackConfig, (err, stats) => {
    if (err) { 
      throw err; 
    }

    // eslint-disable-next-line no-console
    console.log(stats.toString({ colors: true, children: false }));
  });

  process.on('SIGINT', () => {
    server.close();
    compiler.close? compiler.close(() => process.exit()): process.exit();    
  });
});

