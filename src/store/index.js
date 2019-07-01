import Time from './time';

class Store {
  constructor() {
    this.time = new Time(this);
    // this.root = new Time(this);
  }
}
export default new Store();