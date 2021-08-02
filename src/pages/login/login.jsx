import React,{Component} from 'react'
import logo from './images/logo.png'
import './css/login.less'
import { Form, Input, Button} from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
export default class Login extends Component{
    
    render(){
            const onFinish = (values) => {
              console.log('Received values of form: ', values);
            }
            const showUserModal = (a,b,c) => {
                console.log(a,b,c)
              };
              let aa=(a)=>{
                  console.log(a.values)
              }
        return(
            <div className='login'>
                
              <header>
                  <img src={logo} alt=""/>
                  <h1>商品管理系统</h1>
              </header>
              <section>
                  <h1>用户登录</h1>
                  <Form
      name="normal_login"
      className="login-form"
      initialValues={{
        remember: true,
      }}
      onFinish={onFinish}
      onFinishFailed={aa}
    >
      <Form.Item
        name="username"
        rules={[
          {
            required: true,
            message: '请输入用户名',
          },
          {
            min:3,
            max:5,
            message: '用户名为3到5位',
          }
        ]}
      >
        <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="用户" />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[
          {
            required: true,
            message: '请输入密码',
          },{
            message: '密码至少8-16位',
            min:8,
            max:16
          }
        ]}
      >
        <Input
          prefix={<LockOutlined className="site-form-item-icon" />}
          type="password"
          placeholder="密码"
        />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit" className="login-form-button" block='true' onClick={showUserModal}>
          登录
        </Button>
      </Form.Item>
    </Form>
              </section>
            </div>
        )
    }
}