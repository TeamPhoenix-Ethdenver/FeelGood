import React, { Component } from 'react'
import { Layout, Menu, Dropdown, Icon } from 'antd'

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
          <Content style={{ backgroundColor: 'white', margin: 24, padding: 24 }}>
            {this.props.children}
          </Content>
        </Content>
        <Footer style={{ textAlign: 'center', backgroundColor: 'rgba(0, 96, 255, 0.6)', color: 'white', padding: 10 }}>
          Built With Love @ ETHDenver
          <br />
          <small>Copyright © Team Phoenix</small>
        </Footer>
      </Layout>
    )
  }
}
