import React from 'react';
import ReactDOM from 'react-dom/client';
import Root from './app/index';
import { Provider } from 'react-redux';
import rootReducer from './app/redux/index';
import { store,persistor } from './app/redux/index';
import { PersistGate } from "redux-persist/integration/react";

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Root />
      </PersistGate>
    </Provider>
  </React.StrictMode>
);
