import React from 'react';
import ReactDOM from 'react-dom';
import { createRoot } from 'react-dom/client'
import Root from './component/index'

const container = document.getElementById('root') as HTMLElement;
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>
)