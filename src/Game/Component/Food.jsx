import React from 'react';
import { observer } from 'mobx-react';

export default observer(({ foodList }) => foodList
  .map((row, index) =>
    <div
      className="food"
      key={index}
      style={{ left: row.x, top: row.y }}
    />)
);
