import React, { Component } from 'react'
import { Button } from 'antd'

import Page from './Page'

export default class Forbidden extends Component {
  render () {
    return (
      <Page backgroundColor='transparent'>
        <div style={{ display: 'flex', justifyContent: 'space-around' }}>
          <img style={{ width: 400, height: 600 }} src={process.env.PUBLIC_URL + '403.svg'} alt='403' />
          <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <h1 style={{ marginBottom: 0, fontSize: 46 }}>403</h1>
            <p>You do not have the access to view this page.</p>
            <Button type='primary' onClick={() => (window.location.href = '/')}>Back to Home</Button>
          </div>
        </div>
      </Page>
    )
  }
}
