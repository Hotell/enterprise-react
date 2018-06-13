import React, { Component } from 'react'
import './App.css'

import { HelloMessage } from './examples'
import logo from './logo.svg'

class App extends Component {
  render() {
    return (
      <div className="App">
        <HelloMessage greeting="Jane" />
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <p className="App-intro">
          To get started, edit sadsa <code>src/App.tsx</code> and save to reload.
        </p>
      </div>
    )
  }
}

export default App
