import React, { Component } from 'react'
import {Form,Input,message,Select,Button,Card} from 'antd';
import { LeftOutlined} from '@ant-design/icons';
import {reqUserList,reqModifyUser} from '../../api/'
const { Option } = Select;

export default class modify extends Component {
    state={
        roleList2:''
    }
    formModifyRef = React.createRef()
    //获取用户列表便于回显使用
    getUser=async()=>{
        let result=await reqUserList()
        const {data,status,msg}=result
        if(status===0){
         let userInfomations= data.users.find(element => {
            return element._id===this.props.match.params.id
          });
          console.log(userInfomations)
          this.formModifyRef.current.setFieldsValue({...userInfomations})
        }else{
            message(msg,1)
        }
    }
    //获取用户角色信息
    getRole=async()=>{
        let result=await reqUserList()
        const {data,status,}=result
        if(status===0){
            this.setState({roleList2:data.roles})
        }
    }
    //提交确认
    onFinish=async(value)=>{
        let result=await reqModifyUser({...value,_id:this.props.match.params.id})
        if(result.status===0){
            message.success('修改用户信息成功',1)
            this.props.history.goBack()
        }else{
            message.error(result.msg,1)
        }

    }
    componentDidMount(){
        this.getUser()
        this.getRole()
    }
    render() {
        return (
            <div>
            <Card title={
                <div>
                    <Button type='link' style={{color:'green'}} icon={<LeftOutlined />} onClick={()=>{this.props.history.goBack()}}>返回</Button><span>用户修改</span>
                </div>} extra>
            <Form onFinish={this.onFinish} ref={this.formModifyRef}  labelCol={{span:6}} wrapperCol={{span:8}}>
            <Form.Item name="username" rules={[{required: true,min:3,max:5,message: '用户名为3-5位',}]} label='用户名'>
                <Input  placeholder="请输入用户名" />
            </Form.Item>
            <Form.Item name="phone" rules={[{message: '请输入正确的手机号码',}] } label='手机号'>
                <Input  placeholder="请输入手机号码" />
            </Form.Item>
            <Form.Item name="email" rules={[{required: true,message: '请输入邮箱',}] } label='邮箱'>
                <Input  placeholder="请输入邮箱" type='email' />
            </Form.Item>
            <Form.Item name="role_id" label="角色" rules={[{required: true,message:'请选择分类'},]}>
                <Select placeholder="请选择分类">
                {this.state.roleList2===''?'':this.state.roleList2.map((item1)=>{
                    console.log(item1)
                      return <Option key={item1._id} value={item1._id}>{item1.name}</Option>
                    })}
                </Select>
            </Form.Item>
            <Form.Item  wrapperCol={{offset:8}}  >
                <Button type="primary" htmlType="submit">提交</Button>
            </Form.Item>
            </Form>
            </Card>
            
            </div>
        )
    }
}

