import React from 'react';
import { observer } from 'mobx-react';

export default observer(({ foodList }) => foodList
  .map((item, index) => <div
    className="food"
    style={{ left: item.x, top: item.y }}
    key={index}
  />))
