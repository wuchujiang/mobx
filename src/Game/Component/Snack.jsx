import React from 'react';
import { observer } from 'mobx-react';

export default observer(({ snackList }) => snackList
  .map((row, index) =>
    <div
      className={`snack ${index === snackList.length - 1 ? 'first' : ''}`}
      key={index}
      style={{ left: row.x, top: row.y }}
    />)
);