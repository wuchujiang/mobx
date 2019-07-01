import React, { Component } from 'react';
import { observer } from 'mobx-react';

export default observer(({ snackList }) =>
  snackList.map((item, index, current) => <div
    className={['snack', current.length - 1 === index && 'first'].filter(Boolean).join(' ')}
    style={{ left: item.x, top: item.y }}
    key={index}
  />))
