// import React from 'react';
// import { render } from 'react-dom';
// import { Provider } from 'react-redux';
// import store from './store';
// import { createRoot } from 'react-dom/client';

// import App from './App';

// const rootElemenet = document.getElementById('root')
// const root = createRoot(rootElemenet)

// root.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>
// );

import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import store from './store';
import { createRoot } from 'react-dom/client';
import App from './App';

const rootElemenet = document.getElementById('root');
const root = createRoot(rootElemenet);

root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
