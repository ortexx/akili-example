import './styles/post-cards.scss'
import Akili from 'akili';

/**
 * Universal component to display a list of posts anywhere
 * 
 * {@link https://akilijs.com/docs/best#docs_encapsulation_through_attributes}
 * 
 * @tag post-cards
 * @selector post-cards[data]
 * @attr {object[]} data - list of the posts
 * @scope {object[]} data - list of the users
 * @message {object[]} data - sent on any data change
 */
export default class PostCards extends Akili.Component {
  static matches = '[data]';
  static template = require('./post-cards.html');
  static events = ['select', 'delete'];

  static define() {
    Akili.component('post-cards', this);
  }

  created() {
    this.scope.selectPost = this.selectPost.bind(this);
    this.scope.deletePost = this.deletePost.bind(this);
  }
  
  compiled() {
    /**
     * Link attribute "data" with scope property "data"
     * 
     * {@link https://akilijs.com/docs/attributes#docs_attribute's_handling}
     */
    this.attr('data', 'data');
  }

  selectPost(post) {    
    this.scope.data.forEach(item => item === post? (item.selected = true): delete item.selected);
    this.attrs.onSelect.trigger(post.id);
  }

  deletePost(post) { 
    this.scope.data.forEach((item, i, arr) => item === post && arr.splice(i, 1));
    this.attrs.onDelete.trigger(post.id);  
  }
}