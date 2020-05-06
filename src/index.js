import React from 'react'
import ReactDOM from 'react-dom'
import 'react-tippy/dist/tippy.css'

import './styles/index.module.scss'
import './styles/index.css'
import App from './site/main'

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,

  document.getElementById('root')
)
