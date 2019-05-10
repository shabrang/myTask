import React from 'react'
import { render } from 'react-dom'
import App from './App'
import * as serviceWorker from './serviceWorker'
import './assets/scss/_init.scss'

render(
  <App/>,
  document.getElementById('root')
)

serviceWorker.unregister()
