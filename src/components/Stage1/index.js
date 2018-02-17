import React, { Component } from 'react'
import { Row, Col } from 'antd'

import Page from '../Page'
import Stage1Modal from './Stage1Modal'

export default class Stage1 extends Component {
  render () {
    return (
      <Page>
        <div>
          <Row type='flex' justify='space-between' align='middle'>
            <Col>
              <h1>Donation Center</h1>
            </Col>
            <Col>
              <Stage1Modal />
            </Col>
          </Row>
        </div>
      </Page>
    )
  }
}
