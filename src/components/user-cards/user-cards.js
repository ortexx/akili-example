import Akili from 'akili';

/**
 * Universal component to display a list of users anywhere
 * 
 * {@link https://akilijs.com/docs/best#docs_encapsulation_through_attributes}
 * 
 * @tag user-cards
 * @attr {object[]} data - list of the users
 * @scope {object[]} data - list of the users
 * @message {object[]} data - sent on any data change
 */
export default class UserCards extends Akili.Component {
  static matches = '[data]';
  static template = require('./user-cards.html');

  static define() {
    Akili.component('user-cards', this);
  }
  
  compiled() {
    /**
     * Link attribute "data" with scope property "data"
     * 
     * {@link https://akilijs.com/docs/attributes#docs_attribute's_handling}
     */
    this.attr('data', 'data');  
  }
}