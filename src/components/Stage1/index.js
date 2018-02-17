import React, { Component } from 'react'
import { Row, Col, Divider } from 'antd'

import Page from '../Page'
import Stage1Modal from './Stage1Modal'
import Stage1Card from './Stage1Card'
import * as api from '../../mockApi'

export default class Stage1 extends Component {
  constructor (props) {
    super(props)
    this.state = { data: [] }
  }

  componentDidMount () {
    api.getAllStage1().then(data => this.setState({ data }))
  }

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
          <Divider style={{ margin: '10px 0' }} />
          <Row gutter={16}>
            {this.state.data.map(one =>
              <Col key={one.id} sm={24} md={12} lg={8} xl={6} style={{ marginBottom: 10 }}>
                <Stage1Card {...one} />
              </Col>
            )}
          </Row>
        </div>
      </Page >
    )
  }
}
