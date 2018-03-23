import Akili from 'akili';

/**
 * Universal component to display a post form
 * 
 * {@link https://akilijs.com/docs/best#docs_encapsulation_through_attributes}
 * 
 * @tag post-form
 * @attr {object} post - actual post
 * @scope {object} post - actual post
 * @message {object} post - sent on any post's property change
 * @message {object} save - sent on form save
 */
export default class UserCards extends Akili.Component {
  static matches = '[post]';
  static template = require('./post-form.html');
  static events = ['save'];

  static define() {
    Akili.component('post-form', this);
  }

  created() {
    this.scope.save = this.save.bind(this);
  }
  
  compiled() {
    /**
     * Link attribute "post" with scope property "post"
     * 
     * {@link https://akilijs.com/docs/attributes#docs_attribute's_handling}
     */
    this.attr('post', 'post');  
  }

  save() {
    /**
     * Trigger the event to save post
     * 
     * {@link https://akilijs.com/docs/events}
     */
    this.attrs.onSave.trigger(this.scope.post);
  }
}