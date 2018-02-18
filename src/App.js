import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom'

import Intro from './components/Intro'
import Stage1 from './components/Stage1'
import Stage2 from './components/Stage2'
import Stage3 from './components/Stage3'
import Page from './components/Page'
import SignIn from './components/SignIn'
import QRCode from './components/QRCode'
import Forbidden from './components/Forbidden'

const IdentifiedRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      window.sessionStorage.getItem('userProfile') ? <Component {...props} /> : (
        <Redirect
          to={{
            pathname: '/sign-in',
            state: { from: props.location }
          }}
        />
      )
    }
  />
)

export default class App extends Component {
  render () {
    return (
      <Router>
        <div>
          <Route exact path='/' component={Intro} />
          <Route exact path='/page' component={Page} />
          <Route exact path='/sign-in' component={SignIn} />
          <Route exact path='/403' component={Forbidden} />
          <IdentifiedRoute path='/qrcode/:id' component={QRCode} />
          <Route exact path='/stage-1' render={props => <Redirect
            to={{ pathname: '/donation-center' }}
          />} />
          <IdentifiedRoute path='/donation-center' component={Stage1} />
          <Route exact path='/stage-2' render={props => <Redirect
            to={{ pathname: '/test-center' }}
          />} />
          <IdentifiedRoute path='/test-center' component={Stage2} />
          <Route exact path='/stage-3' render={props => <Redirect
            to={{ pathname: '/health-center' }}
          />} />
          <IdentifiedRoute path='/health-center' component={Stage3} />
        </div>
      </Router >
    )
  }
}
