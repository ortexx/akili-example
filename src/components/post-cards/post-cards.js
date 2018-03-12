import './styles/post-cards.scss'
import Akili from 'akili';

/**
 * Define the universal component to display a list of posts anywhere
 * 
 * {@link https://akilijs.com/docs/best#docs_encapsulation_through_attributes}
 */
export default class PostCards extends Akili.Component {
  static template = require('./post-cards.html');

  static define() {
    Akili.component('post-cards', this);
  }

  created() {
    this.scope.selectPost = this.selectPost.bind(this);
    this.scope.removePost = this.removePost.bind(this);
  }
  
  compiled() {
    this.attr('data', 'data');
  }

  selectPost(post) {
    this.scope.data.forEach((item) => item.selected && delete item.selected);
    post.selected = true;
  }

  removePost(post) {   
    this.scope.data.forEach((item, i, arr) => item === post && arr.splice(i, 1));
  }
}