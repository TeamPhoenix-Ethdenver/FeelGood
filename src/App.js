import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom'

import Intro from './components/Intro'
import Stage1 from './components/Stage1'
import Stage2 from './components/Stage2'
import Stage3 from './components/Stage3'
import Page from './components/Page'
import QRCode from './components/QRCode'
import Forbidden from './components/Forbidden'

export default class App extends Component {
  render () {
    return (
      <Router>
        <div>
          <Route exact path='/' component={Intro} />
          <Route exact path='/page' component={Page} />
          <Route exact path='/403' component={Forbidden} />
          <Route path='/qrcode/:id' component={QRCode} />
          <Route exact path='/stage-1' render={props => <Redirect
            to={{ pathname: '/donation-center' }}
          />} />
          <Route path='/donation-center' component={Stage1} />
          <Route exact path='/stage-2' render={props => <Redirect
            to={{ pathname: '/test-center' }}
          />} />
          <Route path='/test-center' component={Stage2} />
          <Route exact path='/stage-3' render={props => <Redirect
            to={{ pathname: '/health-center' }}
          />} />
          <Route path='/health-center' component={Stage3} />
        </div>
      </Router >
    )
  }
}
