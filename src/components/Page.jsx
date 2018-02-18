import React, { Component } from 'react'
import { Layout, Menu, Dropdown, Icon } from 'antd'

const { Header, Content, Footer } = Layout
const MenuItem = Menu.Item

const menu = (
  <Menu theme='dark'>
    <MenuItem>
      <a href='/'>Sign Out</a>
    </MenuItem>
  </Menu>
)

export default class Page extends Component {
  constructor (props) {
    super(props)
    this.state = {
      name: props.name
    }
  }

  render () {
    return (
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
          <Content style={{ backgroundColor: this.props.backgroundColor || 'white', margin: 12, padding: 12 }}>
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
