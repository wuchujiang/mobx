import { observable, action, computed, observe, when } from 'mobx';
import todo from './todo';

class Time {
  @observable count = 0;
  @observable list = [];
  @action add = () => {
    this.list.push('11');
  }

  get len() {
    return this.count;
  }

  constructor() {
    when(
      () => this.list.length,
      (aaa) => {
        console.log(aaa);
      }
    )
  }

}

export default new Time();