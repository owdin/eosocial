import React from 'react'
import {
  Button,
  Card,
  Form,
  Icon,
  Input,
  Spin,
  message,
} from 'antd'
import {
  createAccount,
} from '../libs/EosJsApi'

const FormItem = Form.Item

export default class CreateAccount extends React.Component {
  state = {
    loading: false,
  }

  handleClick = () => {
    this.setState({ loading: true })
    message.success('Account Created', 5)
    createAccount(this.state.username, this.state.ownerKey)
    this.setState({ loading: false })
  }

  handleInputChange = (event) => {
    const target = event.target
    const value = target.type === 'checkbox' ? target.checked : target.value
    const name = target.name

    this.setState({
      [name]: value,
    }, () => this.validateForm(name))
  }

  validateForm = (name) => {
    const field = name + 'Check'

    switch (name) {
    case 'username':
      if (this.state.username !== undefined && this.state.username.length === 12) {
        this.setState({
          [field]: {
            validateStatus: 'success',
          },
        })
      } else {
        this.setState({
          [field]: {
            validateStatus: 'warning',
            help: 'You can create username with 12 characters or numbers.',
          },
        })
      }

      break
    case 'ownerKey':
      if (this.state.ownerKey !== undefined && this.state.ownerKey.length === 53) {
        this.setState({
          [field]: {
            validateStatus: 'success',
          },
        })
      } else {
        this.setState({
          [field]: {
            validateStatus: 'warning',
            help: 'You should input valid public key.',
          },
        })
      }
      break

    case 'activeKey':
      if (this.state.activeKey !== undefined && this.state.activeKey.length === 53) {
        this.setState({
          [field]: {
            validateStatus: 'success',
          },
        })
      } else {
        this.setState({
          [field]: {
            validateStatus: 'warning',
            help: 'You should input valid public key.',
          },
        })
      }
      break

    default:
      this.setState({
        [field]: {
          validateStatus: 'error',
          help: 'Form doesn not exist!',
        },
      })
      break
    }
  }

  render() {
    const formItemLayout = {
      labelCol: {
        xs: { span: 8 },
        sm: { span: 5 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
      },
    }
    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0,
        },
        sm: {
          span: 16,
          offset: 4,
        },
      },
    }

    // const formValidator = {
    //   validateStatus=['success', 'warning', 'error', 'validating']
    //   help='The prompt message. If not provided, the prompt message will be generated by the validation rule.'
    // }

    return (
      <div>
        <Spin
          indicator={<Icon type='loading' size='large' style={{ textAlign: 'center', fontSize: '2rem' }} spin />}
          spinning={this.state.loading}
        >
          <Card
            title='Create Account'
          >
            <Form onSubmit={this.handleClick}>
              <FormItem
                {...formItemLayout}
                {...this.state.usernameCheck}
                required='true'
                hasFeedback
                label='Username'
              >
                <Input
                  name='username'
                  placeholder='Username'
                  size='large'
                  width='10rem'
                  onChange={this.handleInputChange}
                  value={this.state.username}
                />
              </FormItem>
              <FormItem
                {...formItemLayout}
                {...this.state.ownerKeyCheck}
                required='true'
                hasFeedback
                label='Owner Key'
              >
                <Input
                  name='ownerKey'
                  placeholder='Owner Key (Public Key)'
                  size='large'
                  onChange={this.handleInputChange}
                  value={this.state.ownerKey}
                />
              </FormItem>
              <FormItem
                {...formItemLayout}
                {...this.state.activeKeyCheck}
                required='true'
                hasFeedback
                label='Active Key'
              >
                <Input
                  name='activeKey'
                  placeholder='Active Key (Public Key)'
                  size='large'
                  onChange={this.handleInputChange}
                  value={this.state.activeKey}
                />
              </FormItem>
              <FormItem
                {...tailFormItemLayout}
              >
                {/* <Button type='primary' htmlType='submit'>Create Account</Button> */}
                <Button type='primary' onClick={this.handleClick}>Create Account</Button>
              </FormItem>
            </Form>
          </Card>
        </Spin>
      </div>
    )
  }
}
