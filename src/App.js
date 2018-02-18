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
  render() {
    return (
      <Router>
        <div>
          <Route exact path='/FeelGood' component={Intro} />
          <Route exact path='/FeelGood/page' component={Page} />
          <Route exact path='/FeelGood/403' component={Forbidden} />
          <Route path='/FeelGood/qrcode/:id' component={QRCode} />
          <Route exact path='/FeelGood/stage-1' render={props => <Redirect
            to={{ pathname: '/FeelGood/donation-center' }}
          />} />
          <Route path='/FeelGood/donation-center' component={Stage1} />
          <Route exact path='/FeelGood/stage-2' render={props => <Redirect
            to={{ pathname: '/FeelGood/test-center' }}
          />} />
          <Route path='/FeelGood/test-center' component={Stage2} />
          <Route exact path='/FeelGood/stage-3' render={props => <Redirect
            to={{ pathname: '/FeelGood/health-center' }}
          />} />
          <Route path='/FeelGood/health-center' component={Stage3} />
        </div>
      </Router >
    )
  }
}
