import React, { Component } from 'react'
import { Spin, Card, List, Tag, Icon, Button, Popconfirm } from 'antd'
import * as moment from 'moment'
import { decode } from 'mnid'

import Page from '../Page'
import * as api from '../../api'
import { uport, login } from '../../uport'

const QRCard = props => {
  const data = [
    { title: 'Donation Center', description: props.donor.donationCenter },
    { title: 'Name', description: props.donor.nameOfDonor },
    { title: 'Age', description: props.donor.age },
    { title: 'Sex', description: props.donor.sex },
    { title: 'Blood Group', description: <Tag>{props.donor.bloodGroup}</Tag> },
    { title: 'Donate Time', description: moment(props.donor.donationTime).format('MMM/DD/YYYY HH:mm') }
  ]
  if (!window.parseInt(props.donor.testCenter)) {
    data.push({ title: 'Tested', description: <Tag>No</Tag> })
  } else {
    data.push({ title: 'Tested', description: <Tag>Yes</Tag> })
    data.push({
      title: 'Is Qualified',
      description: <Tag color={props.donor.isQualified ? 'green' : 'red'}>
        <Icon type={props.donor.isQualified ? 'check' : 'close'} />
      </Tag>
    })
    data.push({ title: 'Test Center', description: props.donor.testCenter })
    if (!window.parseInt(props.donor.healthCenter)) {
      data.push({ title: 'Consumed', description: <Tag>No</Tag> })
    } else {
      data.push({ title: 'Consumed', description: <Tag>Yes</Tag> })
      data.push({ title: 'Health Center', description: props.donor.healthCenter })
    }
  }
  const actions = []
  if (!window.parseInt(props.donor.testCenter) && props.TestCenter) {
    actions.push(
      <Popconfirm placement='top' title='I confirm to REJECT and digital signing this confirmation.' onConfirm={() => props.testReject(props.donor.donorID)} okText='Reject' okType='danger' cancelText='Cancel'>
        <Button type='danger'><Icon type='close' />Reject</Button>
      </Popconfirm>
    )
    actions.push(<Popconfirm placement='top' title='I confirm to APPROVE and digital signing this confirmation.' onConfirm={() => props.testApprove(props.donor.donorID)} okText='Approve' cancelText='Cancel'>
      <Button type='primary'><Icon type='check' />Approve</Button>
    </Popconfirm>)
  }
  if (!window.parseInt(props.donor.healthCenter) && props.HealthCenter) {
    actions.push(<Popconfirm placement='top' title='I confirm to CONSUME and digital signing this confirmation.' onConfirm={() => props.consume(props.donor.donorID)} okText='Consume' cancelText='Cancel'>
      <Button type='primary'><Icon type='smile-o' />Consume</Button>
    </Popconfirm>)
  }
  return (
    <Card
      title={'# ' + props.donor.donorID}
      actions={actions}
    >
      <List
        itemLayout='horizontal'
        size='small'
        dataSource={data}
        renderItem={item => (
          <List.Item>
            <List.Item.Meta {...item} style={{ overflowY: 'auto' }} />
          </List.Item>
        )}
      />
    </Card>
  )
}

export default class QRCode extends Component {
  constructor(props) {
    super(props)
    this.state = {
      donor: null,
      loggedin: false
    }

    login().then(userProfile => {
      const address = decode(userProfile.address).address
      this.setState({ name: userProfile.name })
      let instance
      api.getContract(uport.getProvider()).deployed()
        .then(i => {
          instance = i
          const getByID = id => api.getContract(uport.getProvider()).deployed().then(i => i.donors(id))
          this.setState({ getByID })
        })
        .then(() => instance.hasRole(address, 'TestCenter'))
        .then(TestCenter => {
          if (TestCenter) {
            this.setState({ TestCenter })
            const testReject = donorID => api.getContract(uport.getProvider()).deployed()
              .then(i => i.isTested(donorID, false, { from: address }))
            const testApprove = donorID => api.getContract(uport.getProvider()).deployed()
              .then(i => i.isTested(donorID, true, { from: address }))
            this.setState({ testReject, testApprove })
          }
        })
        .then(() => instance.hasRole(address, 'HealthCenter'))
        .then(HealthCenter => {
          if (HealthCenter) {
            this.setState({ HealthCenter })
            const consume = donorID => api.getContract(uport.getProvider()).deployed()
              .then(i => i.isConsumed(donorID, { from: address }))
            this.setState({ consume })
          }
        })
        .then(() => this.setState({ loggedin: true }))
        .then(() => instance.donors(this.props.match.params.id))
        .then(args => this.setState({
          donor: {
            donorID: this.props.match.params.id,
            donationCenter: args[0],
            nameOfDonor: args[1],
            age: args[2].toString(),
            sex: args[3],
            donationTime: moment(args[4].toNumber()),
            bloodGroup: args[5],
            isQualified: args[6],
            testCenter: args[7],
            healthCenter: args[8]
          }
        }))
    })
  }

  render() {
    return (
      <Spin style={{ width: '100%', marginTop: 32 }} spinning={!this.state.loggedin}>
        {this.state.loggedin && <Page>
          {this.state.donor && <QRCard {...this.state} />}
        </Page>}
      </Spin>
    )
  }
}
