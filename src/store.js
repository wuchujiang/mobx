import {observable, action} from 'mobx';

class Store{
  @observable list = []

  @action add() {
    this.list = this.list.concat(111);
  }

  @action remove() {
    this.list.length = this.list.length - 1;
    console.log(this.list);
  }
}

export default new Store();