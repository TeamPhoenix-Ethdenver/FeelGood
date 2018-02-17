import React, { Component } from 'react'
import { Modal, Button, Icon, Form, Input, message, Select, InputNumber, DatePicker } from 'antd'
import * as moment from 'moment'

import * as api from '../../mockApi'

const Option = Select.Option
const FormItem = Form.Item

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 6 }
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 18 }
  }
}
const tailFormItemLayout = {
  wrapperCol: {
    xs: { span: 24, offset: 0 },
    sm: { span: 20, offset: 4 }
  }
}

class Stage1FormComponent extends Component {
  constructor (props) {
    super(props)
    this.state = { isSubmitting: false }
  }
  handleSubmit (e) {
    this.setState({ isSubmitting: true })
    e.preventDefault()
    this.props.form.validateFields((err, values) => {
      if (!err) {
        api.newStage1(values.name, values.age, values.gender, values.bloodGroup, values.donationTime)
          .then(() => {
            this.setState({ isSubmitting: false })
            message.success('Submitted.')
          })
          .catch(err => message.error(err.message))
      }
    })
    return false
  }

  render () {
    const { getFieldDecorator } = this.props.form
    return (
      <Form onSubmit={e => this.handleSubmit(e)} autoComplete='nope'>
        <FormItem {...formItemLayout} label='Name'>
          {getFieldDecorator('name', {
            rules: [
              {
                required: true,
                message: 'Please input Name',
                whitespace: true
              }
            ]
          })(<Input placeholder='Please input donor name' />)}
        </FormItem>
        <FormItem {...formItemLayout} label='Age'>
          {getFieldDecorator('age', {
            rules: [{
              required: true,
              message: 'Please input Age'
            }]
          })(<InputNumber min={18} style={{ width: '100%' }} placeholder='Please input donor age' />)}
        </FormItem>
        <FormItem {...formItemLayout} label='Gender'>
          {getFieldDecorator('gender', {
            rules: [{
              required: true,
              message: 'Please input Gender'
            }]
          })(
            <Select placeholder='Please select gender'>
              <Option key='Male'>Male</Option>
              <Option key='Female'>Female</Option>
              <Option key='Other'>Other</Option>
            </Select>
          )}
        </FormItem>

        <FormItem {...formItemLayout} label='Blood Group'>
          {getFieldDecorator('bloodGroup', {
            rules: [{
              required: true,
              message: 'Please select Blood Group.'
            }]
          })(
            <Select placeholder='Please select blood group'>
              <Option key='A+'>A+</Option>
              <Option key='A-'>A-</Option>
              <Option key='B+'>B+</Option>
              <Option key='B-'>B-</Option>
              <Option key='AB+'>AB+</Option>
              <Option key='AB-'>AB-</Option>
              <Option key='O+'>O+</Option>
              <Option key='O-'>O-</Option>
            </Select>
          )}
        </FormItem>
        <FormItem {...formItemLayout} label='Donation Time'>
          {getFieldDecorator('donationTime', {
            rules: [{ required: true, message: 'Please input Donation Time' }],
            initialValue: moment()
          })(<DatePicker showTime format='MMM/DD/YYYY HH:mm' style={{ width: '100%' }} />)}
        </FormItem>
        <FormItem {...tailFormItemLayout}>
          <Button type='primary' htmlType='submit'>
            Submit
          </Button>
        </FormItem>
      </Form>
    )
  }
}

const Stage1Form = Form.create()(Stage1FormComponent)

export default class Stage1Modal extends Component {
  constructor (props) {
    super(props)
    this.state = { visible: false }
  }

  render () {
    return (
      <div>
        <Button type='primary' onClick={() => this.setState({ visible: true })}>
          <Icon type='plus' />
          New Donation
                </Button>
        <Modal
          title='New Donation'
          width={600}
          visible={this.state.visible}
          onCancel={() => this.setState({ visible: false })}
          footer={null}
        >
          <Stage1Form roles={this.props.roles} />
        </Modal>
      </div>
    )
  }
}
