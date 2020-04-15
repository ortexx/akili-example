/**
 * Actions to work with posts
 * 
 * {@link https://akilijs.com/docs/requests}
 * {@link https://akilijs.com/docs/store}
 */

import request from 'akili/src/services/request';
import store from 'akili/src/services/store';

export function getAll() {
  if(store.posts) {    
    return Promise.resolve(store.posts);
  }

  return request.use.api.get('/posts').then(res => store.posts = res.data);
}

export function getPost(id) {
  return getAll().then(posts => {
    let post = posts.find(post => post.id == id);

    if(!post) {
      throw new Error(`Not fount post with id "${id}"`);
    }  
    
    return post;
  });
}

export function updatePost(post) {
  return request.use.api.put(`/posts/${post.id}`, { json: post }).then(res => {
    store.posts = store.posts.map(item => item.id == post.id? {...item, ...post}: item);
    return res.data;
  });
}