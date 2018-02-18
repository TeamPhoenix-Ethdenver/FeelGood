import React, { Component } from 'react'
import { Icon, Modal } from 'antd'
import QRCode from 'qrcode.react'

export default class QRCodeModal extends Component {
  constructor (props) {
    super(props)
    this.state = { visible: false }
  }

  render () {
    const uri = `/qrcode/${this.props.donorID}`
    return (
      <div>
        <a onClick={() => this.setState({ visible: true })}>
          <Icon type='qrcode' />
        </a>
        <Modal
          title={'# ' + this.props.donorID}
          visible={this.state.visible}
          onCancel={() => this.setState({ visible: false })}
          footer={null}
          width={400}
        >
          <QRCode value={`${window.location.origin}${uri}`} size={352} />
        </Modal>
      </div >
    )
  }
}
