import React, { Component } from 'react'
import { Row, Col, Divider } from 'antd'
import * as moment from 'moment'

import Page from '../Page'
import Stage1Modal from './Stage1Modal'
import Stage1Card from './Stage1Card'
import * as api from '../../api'

export default class Stage1 extends Component {
  constructor (props) {
    super(props)
    this.state = { data: [], addButtonVisible: false }
  }

  addData (args) {
    console.group('Stage1 - addData')
    console.log(args)
    let alreadyExists = false
    this.state.data.forEach(one => {
      if (one.donorID === args.donorID) {
        alreadyExists = true
      }
    })
    console.log(alreadyExists)
    if (!alreadyExists) {
      const data = JSON.parse(JSON.stringify(this.state.data))
      args.donorID = args.donorID.toString()
      args.age = args.age.toString()
      args.donationTime = moment(args.donationTime.toNumber())
      data.push({ ...args })
      console.log(data)
      this.setState({ data })
    }
    console.groupEnd()
  }

  componentDidMount () {
    api.onStage1Event(ev => window.setTimeout(() => this.addData(ev), 0)) // FIXME: ...
    api.hasRole('DonationCenter').then(addButtonVisible => this.setState({ addButtonVisible }))
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
              {this.state.addButtonVisible && <Stage1Modal api={api} />}
            </Col>
          </Row>
          <Divider style={{ margin: '10px 0' }} />
          <Row gutter={16}>
            {this.state.data.map(one => <Col key={one.donorID} sm={24} md={12} lg={8} xl={6} style={{ marginBottom: 10 }}>
              <Stage1Card {...one} />
            </Col>
            )}
          </Row>
        </div>
      </Page >
    )
  }
}
