
import Akili from 'akili';
import router from 'akili/src/services/router';
import store from 'akili/src/services/store';
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
    this.scope.setPosts = this.setPosts.bind(this);
    this.scope.posts = store.posts;
  }

  setPosts(posts = []) {
    store.posts = this.scope.posts = posts;
  }
}