import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom'
import { Layout, Dropdown, Menu, Icon } from 'antd'

import Intro from './components/Intro'

const { Header, Content, Footer } = Layout
const MenuItem = Menu.Item

const menu = (
  <Menu theme='dark'>
    <MenuItem>
      <a href='/sign-in'>Sign Out</a>
    </MenuItem>
  </Menu>
)

class Page extends Component {
  constructor (props) {
    super(props)
    const profileJSON = window.sessionStorage.getItem('userProfile')
    const profile = JSON.parse(profileJSON)
    this.state = {
      name: profile && profile.name
    }
  }

  render () {
    return (
      <Layout>
        <Header>
          <div style={{
            width: '100%',
            display: 'flex',
            flexDirection: 'row-reverse',
            alignItems: 'center'
          }}>
            {this.state.name
              ? <Dropdown overlay={menu}>
                <a className='ant-dropdown-link'>
                  {this.state.name}<Icon type='down' />
                </a>
              </Dropdown>
              : <div>Login</div>}
          </div></Header>
        <Content>
          {this.props.children}
        </Content>
        <Footer style={{ textAlign: 'center' }}>
          Built With Love @ ETHDenver
          <br />
          <small>Copyright © Team Phoenix</small>
        </Footer>
      </Layout>
    )
  }
}

class App extends Component {
  render () {
    return (
      <Router>
        <div>
          <Route exact path='/' component={Intro} />
          <Route exact path='/page' component={Page} />
        </div>
      </Router >
    )
  }
}

export default App
