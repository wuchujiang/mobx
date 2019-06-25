import React from 'react';

import store from './store';

export default () => <button onClick={() => store.remove()}>减少</button>