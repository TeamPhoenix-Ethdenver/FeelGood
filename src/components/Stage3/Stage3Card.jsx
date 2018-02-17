import React from 'react'
import { Card, List, Tag, Icon, Button, Popconfirm } from 'antd'
import * as moment from 'moment'

import QRModal from '../QRModal'
import * as api from '../../api'

const Stage3Card = props => {
  console.log(props)
  const data = [
    { title: 'Donation Center', description: props.donationCenter },
    { title: 'Name', description: props.nameOfDonor },
    { title: 'Age', description: props.age },
    { title: 'Sex', description: props.sex },
    { title: 'Blood Group', description: <Tag>{props.bloodGroup}</Tag> },
    { title: 'Donate Time', description: moment(props.donationTime).format('MMM/DD/YYYY HH:mm') },
    { title: 'Test Center', description: props.testCenter }
  ]
  if (window.parseInt(props.healthCenter)) {
    data.push({ title: 'Consumed', description: <Tag>Yes</Tag> })
    data.push({ title: 'Health Center', description: props.healthCenter })
    data.push()
  } else {
    data.push({ title: 'Consumed', description: <Tag>No</Tag> })
  }
  return (
    <Card
      title={'# ' + props.donorID}
      extra={<QRModal donorID={props.donorID} />}
      actions={props.hasRole && !window.parseInt(props.healthCenter) && [
        // TODO: confirm text
        <Popconfirm placement='top' title='I confirm to CONSUME and digital signing this confirmation.' onConfirm={() => api.consume(props.donorID)} okText='Consume' cancelText='Cancel'>
          <Button type='primary'><Icon type='smile-o' />Consume</Button>
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

export default Stage3Card
