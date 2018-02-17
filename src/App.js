import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom'

import Intro from './components/Intro'

class App extends Component {
  render () {
    return (
      <Router>
        <div>
          <Route exact path='/' component={Intro} />
        </div>
      </Router >
    )
  }
}

export default App
