import React from 'react'
import { Card, List, Tag } from 'antd'
import QRModal from '../QRModal'
import * as moment from 'moment'

const Stage1Card = props => {
  const data = [
    { title: 'Name', description: props.name },
    { title: 'Age', description: props.age },
    { title: 'Gender', description: props.gender },
    { title: 'Blood Group', description: <Tag>{props.bloodGroup}</Tag> },
    { title: 'Donate Time', description: moment(props.donationTime).format('MMM/DD/YYYY HH:mm') }
  ]
  return (
    <Card title={'# ' + props.id} extra={<QRModal id={props.id} />}>
      <List
        itemLayout='horizontal'
        size='small'
        dataSource={data}
        renderItem={item => (
          <List.Item>
            <List.Item.Meta {...item} />
          </List.Item>
        )}
      />
    </Card>
  )
}

export default Stage1Card
