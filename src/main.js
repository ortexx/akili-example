import './styles/main.scss';
import Akili from 'akili';
import router from 'akili/src/services/router';
import store from 'akili/src/services/store';
import request, { Request } from 'akili/src/services/request';
import App from './controllers/app/app';
import Posts from './controllers/posts/posts';
import PostEdit from './controllers/post-edit/post-edit';
import Users from './controllers/users/users';
import PostCards from './components/post-cards/post-cards';
import PostForm from './components/post-form/post-form';
import UserCards from './components/user-cards/user-cards';

/**
 * Define the components
 * 
 * {@link https://akilijs.com/docs/best#docs_component_as_a_module}
 */
App.define();
Posts.define();
PostEdit.define();
Users.define();
PostCards.define();
PostForm.define();
UserCards.define();

/**
 * Create a special instance of Request class to work with the api
 * 
 * {@link https://akilijs.com/docs/requests}
 */
request.addInstance('api', new Request('/api', { json: true }));

/**
 * Set the logo loader on url state change
 * 
 * {@link https://akilijs.com/docs/routing#docs_state_change_handling}
 */
window.addEventListener('state-change', () => store.loader = true);
window.addEventListener('state-changed', () => store.loader = false);

/**
 * Initialize the framework and the routing
 *  
 * {@link https://akilijs.com/docs/getting-started}
 * {@link https://akilijs.com/docs/routing#docs_router.init}
 */
document.addEventListener('DOMContentLoaded', () => {
  router.init('/app/posts', false);
  // eslint-disable-next-line no-console
  Akili.init().catch((err) => console.error(err));
});