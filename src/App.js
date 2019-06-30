import React, { Component } from 'react';
import { observable, autorun, action, runInAction, intercept, computed, when, reaction, observe } from 'mobx';
import axios from './axios';
import Game from './Game2/Component/Game';
const time = observable.box(0);

// @return 一个销毁函数
// const disposer = autorun(() => {
//   document.querySelector('.App').innerHTML = time.get();
// });

// reaction 更加细粒度的对某个值的变化做出反应，第一个参数返回的参数作为第二个参数的参数， 并且不像autorun那样，初始化的时候就会调用。reaction只有在值变化的时候才开始执行
const disposer = reaction(() => time.get(), (data, reaction) => {
  // document.querySelector('.App').innerHTML = data;
  // 只执行一次
  // reaction.dispose();
});

// 属性修改拦截器  @return 一个销毁函数,取消拦截
const disposer2 = intercept(time, change => {
  change.newValue = change.newValue * 2;
  return change;
});

// args[0] 当xxx条件满足时，执行后面的函数  @return 一个销毁函数,取消拦截
when(() => time.get() > 100, () => {
  console.log('when');
  disposer();
  clearInterval(timer);
})

var timer = setInterval(function () {
  // 计算属性 自动收集依赖  
  // computed跟autorun的区别在于computed返回的是可观察对象的值，而auturun返回的是一个销毁函数。
  const t = computed(() => time.get() + 1)
  time.set(t);
}, 1000);

// mobx5会自动给新增加的属性绑定状态
const testObj = observable({
  a: 1,
  b: 2,
  c: 3
});

autorun(() => {
  console.log(testObj.c);
})

// 观察者，观察某个值的改变
observe(testObj, change => {
  console.log(change, change.oldValue);
});

delete testObj.c;
class App extends Component {
  componentDidMount = () => {

  }

  render() {
    return (
      <div className="App">
        <Game />
      </div>
    );
  }
}

export default App;
