import React, { Component } from 'react'
import { Row, Col, Divider, Spin } from 'antd'
import * as moment from 'moment'
import { decode } from 'mnid'

import Page from '../Page'
import Stage1Modal from './Stage1Modal'
import Stage1Card from './Stage1Card'
import { uport, login } from '../../uport'
import * as api from '../../api'

export default class Stage1 extends Component {
  constructor (props) {
    super(props)
    this.state = { data: [], loggedin: false }
    login().then(userProfile => {
      const address = decode(userProfile.address).address
      this.setState({ name: userProfile.name })
      api.getContract(uport.getProvider()).deployed()
        .then(i => i.hasRole(address, 'DonationCenter'))
        .then(res => {
          if (!res) {
            window.location.href = '/403'
          } else {
            this.setState({ loggedin: true })
          }
        }).then(() => {
          const newStage1 = (nameOfDonor, age, sex, bloodGroup, donationTime) => api.getContract(uport.getProvider()).deployed()
            .then(i => i.setDonor(nameOfDonor, age, sex, bloodGroup, donationTime, { from: address }))
          this.setState({ newStage1 })
        })
    })
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
  }

  render () {
    return (
      <Spin spinning={!this.state.loggedin}>
        {this.state.loggedin && <Page name={this.state.name}>
          <div>
            <Row type='flex' justify='space-between' align='middle'>
              <Col>
                <h1>Donation Center</h1>
              </Col>
              <Col>
                <Stage1Modal newStage1={this.state.newStage1} />
              </Col>
            </Row>
            <Divider style={{ margin: '10px 0' }} />
            <Row gutter={16} type='flex'>
              {this.state.data.map(one => <Col key={one.donorID} sm={24} md={12} lg={8} xl={6} style={{ marginBottom: 10 }}>
                <Stage1Card {...one} />
              </Col>
              )}
            </Row>
          </div>
        </Page >}
      </Spin>
    )
  }
}
