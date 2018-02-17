import React, { Component } from 'react'
import { Row, Col, Divider, Radio, Select } from 'antd'
import * as moment from 'moment'

import Page from '../Page'
import Stage3Card from './Stage3Card'
import * as api from '../../api'

const RadioButton = Radio.Button
const RadioGroup = Radio.Group
const SelectOption = Select.Option

export default class Stage3 extends Component {
  constructor (props) {
    super(props)
    this.state = { data: [], hasRole: false, showAll: true, bloodGroup: 'All' }
  }

  addStage2 (args) {
    console.group('Stage3 - addDataStage2')
    console.log(args)

    if (!args.isQualified) {
      return
    }

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

  addStage3 (args) {
    console.group('Stage3 - addDataStage3')
    console.log(args)
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
    } else if (!window.parseInt(oldData.healthCenter)) { // new stage
      console.log('new stage')
      oldData.healthCenter = args.healthCenter
      const data = JSON.parse(JSON.stringify(this.state.data))
      this.setState({ data })
      console.log(data)
    }
    console.groupEnd()
  }

  componentDidMount () {
    api.onStage2Event(args => window.setTimeout(() => this.addStage2(args))) // FIXME: ...)
    api.onStage3Event(args => window.setTimeout(() => this.addStage3(args)))
    api.hasRole('HealthCenter').then(hasRole => this.setState({ hasRole }))
  }

  renderCards () {
    let data = this.state.data
    if (!this.state.showAll) {
      data = data.filter(one => !window.parseInt(one.healthCenter))
    }
    if (this.state.bloodGroup !== 'All') {
      data = data.filter(one => one.bloodGroup === this.state.bloodGroup)
    }
    return data.map(one => <Col key={one.donorID} sm={24} md={12} lg={8} xl={6} style={{ marginBottom: 10 }}>
      <Stage3Card hasRole={this.state.hasRole} {...one} />
    </Col>
    )
  }

  render () {
    return (
      <Page>
        <div>
          <Row type='flex' justify='space-between' align='middle'>
            <Col>
              <h1>Health Center</h1>
            </Col>
            <Col>
              <Row type='flex' justify='space-around' align='middle' gutter={16}>
                <Col>
                  <RadioGroup onChange={e => this.setState({ showAll: e.target.value === 'All' })} defaultValue='All'>
                    <RadioButton value='All'>All</RadioButton>
                    <RadioButton value='unConsumed'>unConsumed</RadioButton>
                  </RadioGroup>
                </Col>
                <Col>
                  <Select defaultValue='All' style={{ width: 72 }} onChange={bloodGroup => this.setState({ bloodGroup })}>
                    <SelectOption value='All'>All</SelectOption>
                    <SelectOption value='A+'>A+</SelectOption>
                    <SelectOption value='A-'>A-</SelectOption>
                    <SelectOption value='B+'>B+</SelectOption>
                    <SelectOption value='B-'>B-</SelectOption>
                    <SelectOption value='AB+'>AB+</SelectOption>
                    <SelectOption value='AB-'>AB-</SelectOption>
                    <SelectOption value='O+'>O+</SelectOption>
                    <SelectOption value='O-'>O-</SelectOption>
                  </Select>
                </Col>
              </Row>
            </Col>
          </Row>
          <Divider style={{ margin: '10px 0' }} />
          <Row gutter={16}>
            {this.renderCards()}
          </Row>
        </div>
      </Page >
    )
  }
}
