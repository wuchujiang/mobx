import { observable, reaction, computed, autorun, action, intercept, runInAction, flow } from 'mobx';

export default class Time {
  constructor(root) {
    this.root = root;
    console.log(this.list);

  }
  @observable count = 0

  @observable list = [1, 2, 3]

  @action plus() {
    this.count++;
  }


  setTime = flow(function* () {

  })



  dispose = intercept(this, 'count', change => {
    change.newValue = change.newValue * 2;
    return change;
  })

  @action subtract() {
    this.count--;
  }
}