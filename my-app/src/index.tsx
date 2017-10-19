import React from 'react'
import { render } from 'react-dom'

import './index.css'

import App from './App'

// import registerServiceWorker from './registerServiceWorker'

const mountNode = document.getElementById('root') as HTMLElement

render(<App />, mountNode)
// registerServiceWorker()

if (module.hot) {
  module.hot.accept('./App', () => {
    // tslint:disable-next-line:no-console
    console.log('🔁  HMR Reloading `./App`...')
    render(<App />, mountNode)
  })
}
