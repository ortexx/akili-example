import Akili from 'akili';

/**
 * Define the universal component to display a post form
 * 
 * {@link https://akilijs.com/docs/best#docs_encapsulation_through_attributes}
 */
export default class UserCards extends Akili.Component {
  static template = require('./post-form.html');
  static events = ['save'];

  static define() {
    Akili.component('post-form', this);
  }

  created() {
    this.scope.save = this.save.bind(this);
  }
  
  compiled() {
    this.attr('post', 'post');  
  }

  save() {
    this.attrs.onSave.trigger(this.scope.post);
  }
}