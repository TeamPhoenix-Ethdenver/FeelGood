import React, { Component } from 'react'
import { Spin, Card, List, Tag } from 'antd'
import * as moment from 'moment'

import Page from '../Page'
import * as api from '../../api'

const QRCard = props => {
  const data = [
    { title: 'Donation Center', description: props.donationCenter },
    { title: 'Name', description: props.nameOfDonor },
    { title: 'Age', description: props.age },
    { title: 'Sex', description: props.sex },
    { title: 'Blood Group', description: <Tag>{props.bloodGroup}</Tag> },
    { title: 'Donate Time', description: moment(props.donationTime).format('MMM/DD/YYYY HH:mm') },
    { title: 'Is Verified', description: props.isVerified },
    { title: 'Test Center', description: props.verifierAddress }
  ]
  if (props.hospitalAddress) {
    data.push({ title: 'Hospital', description: props.hospitalAddress })
  }

  return (
    <Card title={'# ' + props.donorID}>
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
  constructor (props) {
    super(props)
    this.state = {
      donor: null
    }
  }

  componentDidMount () {
    const donorID = this.props.match.params.id
    api.getByID(donorID).then(args => {
      this.setState({
        donor: {
          donorID,
          donationCenter: args[0],
          nameOfDonor: args[1],
          age: args[2].toString(),
          sex: args[3],
          donationTime: moment(args[4].toNumber()),
          bloodGroup: args[5],
          isVerified: args[6],
          verifierAddress: args[7],
          hospitalAddress: args[8]
        }
      })
    })
  }

  render () {
    return (
      <Page>
        <Spin spinning={!this.state.donor}>
          {this.state.donor && <QRCard {...this.state.donor} />}
        </Spin>
      </Page>
    )
  }
}
