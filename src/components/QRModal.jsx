import React, { Component } from 'react'
import { Icon, Modal } from 'antd'
import QRCode from 'qrcode.react'

export default class QRCodeModal extends Component {
  constructor (props) {
    super(props)
    this.state = { visible: false }
    console.log(props)
  }

  render () {
    const uri = `#${this.props.id}`
    return (
      <div>
        <a href={uri} onClick={() => this.setState({ visible: true })}>
          <Icon type='qrcode' />
        </a>
        <Modal
          title={'# ' + this.props.id}
          visible={this.state.visible}
          onCancel={() => this.setState({ visible: false })}
          footer={null}
          width={400}
        >
          <QRCode value={uri} size={352} />
        </Modal>
      </div >
    )
  }
}
