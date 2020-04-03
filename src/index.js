import React from 'react';
import ReactDOM from 'react-dom';
import './index.module.scss';
import './index.css';
import App from './core/main';
import 'react-tippy/dist/tippy.css'

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);