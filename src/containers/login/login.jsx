import React,{Component} from 'react'
import logo from './images/logo.png'
import './css/login.less'
import { Form, Input, Button,message} from 'antd';
import {connect} from 'react-redux' //redux组件
import {Redirect} from 'react-router-dom'
import {UserOutlined, LockOutlined } from '@ant-design/icons';
//登录功能redux
import {createSaveUserInfoAction} from  '../../redux/action_creators/login_action'
import {reqLogin} from '../../api'

@connect(
  state=>({userInfo:state.userInfo}),
  {
    saveUserInfo:createSaveUserInfoAction
  }
  )
class Login extends Component{
    componentDidMount(){
    }
    render(){
            if(this.props.userInfo.isLogin){
              return <Redirect to='/admin/home' />
            }
            const onFinish = async (values) => {
             let result=await reqLogin(values)
             console.log(result)
             if(result.status === 0){
              this.props.saveUserInfo(result.data)
              this.props.history.replace('/admin/home')
             }else{
              message.warning(result.msg,1.3)
             }
            }
        return(
            <div className='login'>
                
              <header>
                  <img src={logo} alt=""/>
                  <h1>商品管理系统 {this.props.test}</h1>
              </header>
              <section>
                  <h1>用户登录</h1>
      <Form name="normal_login" className="login-form" initialValues={{remember: true}} onFinish={onFinish}>
        <Form.Item name="username"
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
      <Form.Item name="password"
        rules={[
          {
            required: true,
            message: '请输入密码',
          },{
            message: '密码至少5-16位',
            min:5,
            max:16
          }
        ]}
      >
        <Input prefix={<LockOutlined className="site-form-item-icon" />} type="password" placeholder="密码"/>
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit" className="login-form-button" block='true'>
          登录
        </Button>
      </Form.Item>
    </Form>
              </section>
            </div>
        )
    }
}
export default Login