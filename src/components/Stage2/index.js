import React, { Component } from 'react'
import { Row, Col, Divider, Radio, Spin } from 'antd'
import * as moment from 'moment'
import { decode } from 'mnid'

import Page from '../Page'
import Stage2Card from './Stage2Card'
import { uport, login } from '../../uport'
import * as api from '../../api'

const RadioButton = Radio.Button
const RadioGroup = Radio.Group

export default class Stage2 extends Component {
  constructor (props) {
    super(props)
    this.state = { data: [], showAll: true, loggedin: false, spinnings: {} }
    login().then(userProfile => {
      const address = decode(userProfile.address).address
      this.setState({ name: userProfile.name })
      api.getContract(uport.getProvider()).deployed()
        .then(i => i.hasRole(address, 'DonationCenter'))
        .then(res => {
          if (!res) {
            window.location.href = '/FeelGood/403'
          } else {
            this.setState({ loggedin: true })
          }
        }).then(() => {
          const testReject = donorID => api.getContract(uport.getProvider()).deployed()
            .then(i => {
              const spinnings = this.state.spinnings
              spinnings[donorID] = true
              this.setState({ spinnings })
              i.isTested(donorID, false, { from: address })
            })
          const testApprove = donorID => api.getContract(uport.getProvider()).deployed()
            .then(i => {
              const spinnings = this.state.spinnings
              spinnings[donorID] = true
              this.setState({ spinnings })
              i.isTested(donorID, true, { from: address })
            })
          this.setState({ testReject, testApprove })
        })
    })
  }

  addStage1 (args) {
    console.group('Stage2 - addDataStage1')
    console.log(args)

    const spinnings = this.state.spinnings
    spinnings[args.donorID] = false
    this.setState({ spinnings })

    let alreadyExists = false
    this.state.data.forEach(one => {
      if (one.donorID.toString() === args.donorID.toString()) {
        alreadyExists = true
      }
    })
    console.log(`alreadyExists: ${alreadyExists}`)
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

  addStage2 (args) {
    console.group('Stage2 - addDataStage2')
    console.log(args)

    const spinnings = this.state.spinnings
    spinnings[args.donorID] = false
    this.setState({ spinnings })

    let oldData = null
    this.state.data.forEach(one => {
      if (one.donorID.toString() === args.donorID.toString()) {
        oldData = one
      }
    })
    console.log(`oldData: ${oldData}`)
    if (oldData === null) {  // push newData
      console.log('push new data')
      const data = JSON.parse(JSON.stringify(this.state.data))
      args.donorID = args.donorID.toString()
      args.age = args.age.toString()
      args.donationTime = moment(args.donationTime.toNumber())
      data.push({ ...args })
      console.log(data)
      this.setState({ data })
    } else if (!window.parseInt(oldData.testCenter)) { // new stage
      console.log('new stage')
      oldData.isQualified = args.isQualified
      oldData.testCenter = args.testCenter
      const data = JSON.parse(JSON.stringify(this.state.data))
      this.setState({ data })
      console.log(data)
    }
    console.groupEnd()
  }

  componentDidMount () {
    api.onStage1Event(args => window.setTimeout(() => this.addStage1(args))) // FIXME: ...
    api.onStage2Event(args => window.setTimeout(() => this.addStage2(args)))
  }

  renderCards () {
    let data
    if (!this.state.showAll) {
      data = this.state.data.filter(one => !window.parseInt(one.testCenter))
    } else {
      data = this.state.data
    }
    return data.map(one => <Col key={one.donorID} sm={24} md={12} lg={8} xl={6} style={{ marginBottom: 10 }}>
      <Spin spinning={this.state.spinnings[one.donorID]}>
        <Stage2Card {...this.state} {...one} />
      </Spin>
    </Col>
    )
  }

  render () {
    return (
      <Spin style={{ width: '100%', marginTop: 32 }} spinning={!this.state.loggedin}>
        {this.state.loggedin && <Page name={this.state.name}>
          <div>
            <Row type='flex' justify='space-between' align='middle'>
              <Col>
                <h1>Test Center</h1>
              </Col>
              <Col>
                <RadioGroup onChange={e => this.setState({ showAll: e.target.value === 'All' })} defaultValue='All'>
                  <RadioButton value='All'>All</RadioButton>
                  <RadioButton value='unTested'>unTested</RadioButton>
                </RadioGroup>
              </Col>
            </Row>
            <Divider style={{ margin: '10px 0' }} />
            <Row gutter={16} type='flex'>
              {this.renderCards()}
            </Row>
          </div>
        </Page >}
      </Spin>
    )
  }
}
