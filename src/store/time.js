import { obserbable, reaction, computed, autorun } from 'mobx';
class Store {
  @obserbable list = [];
  constructor() {
    autorun(() => {
      console.log(this.list.length);
    });
  }

  dispose = reaction(
    () => this.list.length,
    () => {
      console.log('list length ---> reaction');
    }
  )
  @computed get len() {
    return this.list.length;
  }
}

const store = new Store();

store.list.push(111);
console.log(store.len);

store.dispose();

store.list.push(222);


import { observable, computed } from "mobx";
class OrderLine {
  @observable price = 0;
  @observable amount = 1;

  constructor(price) {
    this.price = price;
  }
  @computed get total() {
    return this.price * this.amount;
  }
}