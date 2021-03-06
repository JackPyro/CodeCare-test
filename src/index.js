import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import injectTapEventPlugin from 'react-tap-event-plugin'
import { BrowserRouter } from 'react-router-dom'
import { injectGlobal } from 'styled-components'
import App from './pages/App'
import store from './store'
import 'normalize.css/normalize.css'
injectTapEventPlugin()

const appElement = document.createElement('div')
appElement.setAttribute('id', 'app')
document.body.appendChild(appElement)

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App/>
    </BrowserRouter>
  </Provider>,
  document.getElementById('app'),
)

injectGlobal`
  @import url('https://fonts.googleapis.com/css?family=Open+Sans&subset=cyrillic');
  * {
    font-family: 'Open Sans', sans-serif;
  }
`