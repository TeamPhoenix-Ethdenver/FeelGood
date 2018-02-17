import React from 'react'
import { Card, List, Tag, Icon, Button, Popconfirm } from 'antd'
import * as moment from 'moment'

import QRModal from '../QRModal'
import * as api from '../../api'

const Stage2Card = props => {
  const data = [
    { title: 'Donation Center', description: props.donationCenter },
    { title: 'Name', description: props.nameOfDonor },
    { title: 'Age', description: props.age },
    { title: 'Sex', description: props.sex },
    { title: 'Blood Group', description: <Tag>{props.bloodGroup}</Tag> },
    { title: 'Donate Time', description: moment(props.donationTime).format('MMM/DD/YYYY HH:mm') }
  ]
  if (window.parseInt(props.testCenter)) {
    data.push({ title: 'Tested', description: <Tag>Yes</Tag> })
    data.push({
      title: 'Is Qualified',
      description: <Tag color={props.isQualified ? 'green' : 'red'}>
        <Icon type={props.isQualified ? 'check' : 'close'} />
      </Tag>
    })
    data.push({ title: 'Test Center', description: props.testCenter })
  } else {
    data.push({ title: 'Tested', description: <Tag>No</Tag> })
  }
  return (
    <Card
      title={'# ' + props.donorID}
      extra={<QRModal donorID={props.donorID} />}
      actions={props.hasRole && !window.parseInt(props.testCenter) && [
        // TODO: confirm text
        <Popconfirm placement='top' title='I confirm to REJECT and digital signing this confirmation.' onConfirm={() => api.testReject(props.donorID)} okText='Reject' okType='danger' cancelText='Cancel'>
          <Button type='danger'><Icon type='close' />Reject</Button>
        </Popconfirm>,
        // TODO: confirm text
        <Popconfirm placement='top' title='I confirm to APPROVE and digital signing this confirmation.' onConfirm={() => api.testApprove(props.donorID)} okText='Approve' cancelText='Cancel'>
          <Button type='primary'><Icon type='check' />Approve</Button>
        </Popconfirm>
      ]}
    >
      <List
        itemLayout='horizontal'
        size='small'
        dataSource={data}
        renderItem={item => (
          <List.Item>
            <List.Item.Meta {...item} style={{ overflowX: 'auto' }} />
          </List.Item>
        )}
      />
    </Card>
  )
}

export default Stage2Card
