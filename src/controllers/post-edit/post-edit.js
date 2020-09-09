
import Swal from 'sweetalert2';
import Akili from 'akili';
import router from 'akili/src/services/router';
import { getPost, updatePost } from '../../actions/posts';

/**
 * Define the component as a controller to get a post
 * 
 * {@link https://akilijs.com/docs/best#docs_component_as_a_module}
 */
export default class PostEdit extends Akili.Component {
  static template = require('./post-edit.html');

  static define() {
    Akili.component('post-edit', this);

    /**
     * Create a nested route to get the necessary post
     * 
     * {@link https://akilijs.com/docs/routing#docs_router.add}
     */
    router.add('app.post-edit', '/post-edit/:id', {
      component: this,
      title: transition => `Akili example | ${ transition.path.data.title }`, 
      handler: transition => getPost(transition.path.params.id)
    });
  }

  created() {
    this.scope.savePost = this.savePost.bind(this);
    this.scope.post = this.transition.data;
  }

  savePost(post) { 
    return updatePost(post).then(() => {       
      Swal.fire({ title: 'Post has been changed', icon: 'success'});
      return router.state('app.posts');
    }).catch((err) => {
      //eslint-disable-next-line no-console
      console.error(err);
      Swal.fire({ title: 'Oops, there are some troubles', icon: 'error'});
    });
  }
}