import React, { Component } from 'react'
import { Layout, Menu, Dropdown, Icon, Spin } from 'antd'

import * as api from '../api'

const { Header, Content, Footer } = Layout
const MenuItem = Menu.Item

const menu = (
  <Menu theme='dark'>
    <MenuItem>
      <a href='/sign-in'>Sign Out</a>
    </MenuItem>
  </Menu>
)

export default class Page extends Component {
  constructor (props) {
    super(props)
    const profileJSON = window.sessionStorage.getItem('userProfile')
    const profile = JSON.parse(profileJSON)
    this.state = {
      name: profile && profile.name,
      spinning: true
    }
    const role = {
      '/donation-center': 'DonationCenter',
      '/test-center': 'TestCenter',
      '/health-center': 'HealthCenter'
    }[window.location.pathname]
    if (role) {
      api.hasRole(role).then(res => {
        if (!res) {
          window.location.href = '/403'
        }
      })
    }
  }

  componentDidMount () {
    window.setTimeout(() => this.setState({ spinning: false }), Math.random() * 2000)
  }

  render () {
    return (
      <Spin spinning={this.state.spinning}>
        <Layout>
          <Header>
            <div style={{
              width: '100%',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
              <div>
                <a href='/' style={{ color: 'white', fontSize: 32 }}>FeelGood</a>
              </div>
              {this.state.name
                ? <Dropdown overlay={menu}>
                  <a className='header-dropdown'>
                    {this.state.name}<Icon type='down' />
                  </a>
                </Dropdown>
                : <div>Login</div>}
            </div></Header>
          <Content>
            <Content style={{ backgroundColor: this.props.backgroundColor || 'white', margin: 24, padding: 24 }}>
              {this.props.children}
            </Content>
          </Content>
          <Footer style={{ textAlign: 'center', backgroundColor: 'rgba(0, 96, 255, 0.6)', color: 'white', padding: 10 }}>
            Built With Love @ ETHDenver
          <br />
            <small>Copyright © Team Phoenix</small>
          </Footer>
        </Layout>
      </Spin>
    )
  }
}
