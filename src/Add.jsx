import React from 'react';

import Store from './store';

export default () => <button onClick={() => Store.add()}>增加</button>