
import Akili from 'akili';
import router from 'akili/src/services/router';
import { getAll as getUsers } from '../../actions/users';
import store from 'akili/src/services/store';

/**
 * Define the component as a controller to get a list of users
 * 
 * {@link https://akilijs.com/docs/best#docs_component_as_a_module}
 */
export default class Users extends Akili.Component {
  static template = require('./users.html');

  static define() {
    Akili.component('users', this);

    /**
     * Create a nested route to get a list of users
     * 
     * {@link https://akilijs.com/docs/routing#docs_router.add}
     */
    router.add('app.users', '/users', {
      component: this,
      title: 'Akili example | users', 
      handler: transition => getUsers()
    });
  }

  created() {
    this.scope.users = router.transition.path.data;
  }
}