import React from 'react'
import { Card, List, Tag } from 'antd'
import QRModal from '../QRModal'
import * as moment from 'moment'

const Stage1Card = props => {
  const data = [
    { title: 'Donation Center', description: props.donationCenter },
    { title: 'Name', description: props.nameOfDonor },
    { title: 'Age', description: props.age },
    { title: 'Sex', description: props.sex },
    { title: 'Blood Group', description: <Tag>{props.bloodGroup}</Tag> },
    { title: 'Donate Time', description: moment(props.donationTime).format('MMM/DD/YYYY HH:mm') }
  ]
  return (
    <Card title={'# ' + props.donorID} extra={<QRModal donorID={props.donorID} />}>
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
