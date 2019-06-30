import React from 'react';
import { observer } from 'mobx-react';

export default observer(({ snackList }) => snackList
  .map((item, index, current) => <div
    className={`snack ${index === current.length - 1 ? 'first' : ''}`}
    style={{ left: item.x, top: item.y }}
    key={index}
  />))
