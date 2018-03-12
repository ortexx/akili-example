
import './styles/app.scss'
import Akili from 'akili';
import swal from 'sweetalert';
import router from 'akili/src/services/router';
import store from 'akili/src/services/store';
import { getAll as getPosts } from '../../actions/posts';

/**
 * Define the main component
 * 
 * {@link https://akilijs.com/docs/best#docs_component_as_a_module}
 */
export default class App extends Akili.Component {
  static template = require('./app.html');

  static define() {
    Akili.component('app', this);

    /**
     * Create the main route to show header and entry point for nested routes
     * 
     * {@link https://akilijs.com/docs/routing}
     */
    router.add('app', '/app', {
      component: this,
      title: 'Akili example site'         
    });
  }

  compiled() {
    this.store('loader', 'showLoader');
    this.store('posts', posts => this.scope.post = posts.find(p => p.selected));
  }
}