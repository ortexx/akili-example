import Akili from 'akili';
import router from 'akili/src/services/router';
import { getAll as getPosts } from '../../actions/posts';

/**
 * Define the component as a controller to get a list of posts
 * 
 * {@link https://akilijs.com/docs/best#docs_component_as_a_module}
 */
export default class Posts extends Akili.Component {
  static template = require('./posts.html');

  static define() {
    Akili.component('posts', this);

    /**
     * Create a nested route to get a list of posts 
     * 
     * {@link https://akilijs.com/docs/routing#docs_router.add}
     */
    router.add('app.posts', '/posts', {
      component: this,
      title: 'Akili example | posts',
      handler: () => getPosts()
    });
  }

  created() {
    this.scope.selectPost = this.selectPost.bind(this);
    this.scope.deletePost = this.deletePost.bind(this);
  }

  compiled() {
    this.store('posts', 'posts');
  }

  selectPost(id) {    
    this.scope.posts.forEach(post => post.id == id? (post.selected = true): delete post.selected);
  }

  deletePost(id) {
    this.scope.posts.forEach((post, i, arr) => post.id == id && arr.splice(i, 1));
  }
}


