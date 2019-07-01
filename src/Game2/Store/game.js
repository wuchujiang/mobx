import { observable, computed, reaction, action, intercept, configure } from 'mobx';
import Snack from './snack';
import Food from './food';


configure({ enforceActions: 'observed' });

class Game {
  constructor() {
    this.snack = new Snack(this);
    this.food = new Food(this);
  }

  @observable status = 'stop'

  @observable speed = 300

  @observable direction = 'right'

  @action setDirection(direction) {
    this.direction = direction;
  }

  @action.bound setStatus(status) {
    this.status = status;
  }

  dispose = intercept(this, 'direction', (change) => {
    if (
      (change.newValue === 'left' && this.direction === 'right') ||
      (change.newValue === 'top' && this.direction === 'bottom') ||
      (change.newValue === 'right' && this.direction === 'left') ||
      (change.newValue === 'bottom' && this.direction === 'top')
    ) {
      return null;
    }
    return change;
  });

  @action restart() {
    this.speed = 250;
    this.status = 'stop';
    this.direction = 'right';
    this.food.createFood(30);
    this.snack.reset();
  }

}

export default new Game();