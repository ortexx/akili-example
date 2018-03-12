import Akili from 'akili';

/**
 * Define the universal component to display a list of users anywhere
 * 
 * {@link https://akilijs.com/docs/best#docs_encapsulation_through_attributes}
 */
export default class UserCards extends Akili.Component {
  static template = require('./user-cards.html');

  static define() {
    Akili.component('user-cards', this);
  }
  
  compiled() {
    this.attr('data', 'data');  
  }
}