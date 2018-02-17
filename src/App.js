import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom'

import Intro from './components/Intro'
import Stage1 from './components/Stage1'
import Page from './components/Page'
import SignIn from './components/SignIn'

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
          <Route exact path='/stage-1' render={props => <Redirect
            to={{ pathname: '/donation-center' }}
          />} />
          <IdentifiedRoute path='/donation-center' component={Stage1} />
        </div>
      </Router >
    )
  }
}
