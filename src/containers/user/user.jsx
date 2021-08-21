import React,{Component} from 'react'
import {Card,Button,Table,Modal,Form,Input,message,Select} from 'antd';
import {connect} from 'react-redux'
import dayjs from 'dayjs'
import {reqUserList,reqAddUser,reqDeleteUser} from '../../api/'
import {menuInfo} from '../../redux/action_creators/menu_action'
const { Option } = Select;
const { confirm } = Modal;
@connect(
  state=>({username:state.userInfo.user.username,userId:state.userInfo.user._id}),
  {saveTitle:menuInfo}
) 
class User extends Component{
    state={
        visible:false,
        userList:[],
        roleList:[],
        add:true,
       
    }
    //请求获取用户列表
    getUserList=async()=>{
        let result=await reqUserList()
        const {data,status,msg}=result
        if(status===0){
          
            this.setState({userList:data.users,roleList:data.roles})
        }else{
            message(msg,1)
        }
    }
    componentDidMount(){
        this.getUserList()
    }
    //创建容器获取以便于获取form的方法
    formRef = React.createRef()
     //用于展示弹窗角色添加
    showAdd = (item) => {
        this.setState({visible:true,add:true})
      };
    //新增角色--确认按钮
    handleOk = () => {
        //验证表单
        this.formRef.current.validateFields()
        .then(async(value)=>{
         console.log(value)
          if(this.state.add){
            //添加用户
            let result=await reqAddUser(value)
            const {status,msg}=result
            if(status===0){
              message.success('添加用户成功',1)
              this.setState({visible:false})
              this.formRef.current.resetFields()
              this.getUserList()
            }else{
              message.error(msg,1)
            }
          }else{
            //修改用户
          }
        })
        .catch(error=>{console.log(error)})
        
      };
   
    //取消弹窗展示第一个model
    handleCancel = () => {
            this.setState({visible:false})
            this.formRef.current.resetFields()
          };
    //删除用户弹窗确认
   deleteConfirm=(item)=>{
      let that=this
      confirm({
        content: '是否确定删除此用户',
        onOk() {
        //调用删除用户方法
        that.deleteUser(item)
        },
        cancelText:'取消',
        okText:'确认'
      });
    }
    //删除用户
   deleteUser=async(item)=>{
    if(item._id!==this.props.userId){
      let result=await reqDeleteUser(item._id)
      if(result.status===0){
        message.success('删除用户成功')
        this.getUserList()
      }
    }else{
      message.error('请求错误你没有权限删除自己',1)
    }
   }
  //  modifyUser=async(item)=>{
  //   this.setState({visible:true,add:false})
  // }
  
    render(){
        const dataSource = this.state.userList
        const columns = [
            {
              title: '用户',
              dataIndex: 'username',
              key:'username',
            },
            {
                title: '邮箱',
                dataIndex: 'email',
                key:'email',
              },
            
            {
              title: '电话',
              dataIndex: 'phone',
              key:'phone',
            },
            {
                title: '注册时间',
                dataIndex: 'create_time',
                key:'create_time',
                render:(time)=>{
                  return dayjs(time).format('YYYY年 M月D日 HH:mm:ss')
                }
              },
            {
                title: '所属角色',
                dataIndex: 'role_id',
                key:'role_id',
                render:(id)=>{
                    let result=this.state.roleList.find((item)=>{
                        return item._id===id
                    })
                    if(result){return result.name}
                }
              },
            {
              title: '操作',
              
              render:(item)=>{
                  return(<div>
                      <Button type='link' onClick={()=>{this.props.history.push(`/admin/user/modfiy/${item._id}`)}}>修改</Button> <Button type='link' onClick={()=>{this.deleteConfirm(item)}}>删除</Button>
                  </div>
                  )
              },
              align:'center'
            },
          ];
         
        return(
        <div ref='allRef'>
            <Card  extra={<Button type='primary' onClick={this.showAdd}>+创建用户
            </Button>} >
            <Table  dataSource={dataSource} columns={columns} border='true' rowKey='_id' pagination={{defaultPageSize:4}} loading={this.state.isLoading} bordered='true'/>
            </Card>
            <Modal title='添加用户' visible={this.state.visible} onOk={this.handleOk} onCancel={this.handleCancel} okText='确认' cancelText='取消'>
            <Form  ref={this.formRef} labelCol={{span:4}} wrapperCol={{span:16}}>
            <Form.Item name="username" rules={[{required: true,min:3,max:5,message: '用户名为3-5位',}]} label='用户名'>
                <Input  placeholder="请输入用户名"/>
            </Form.Item>
            <Form.Item name="password" rules={[{required: true,min:5,max:10,message: '密码为5-10位'}] } label='密码'>
                <Input  placeholder="请输入密码"  type='password'/>
            </Form.Item>
            <Form.Item name="phone" rules={[{required: true,message: '请输入正确的手机号码',}] } label='手机号'>
                <Input  placeholder="请输入手机号码" />
            </Form.Item>
            <Form.Item name="email" rules={[{required: true,message: '请输入邮箱',}] } label='邮箱'>
                <Input  placeholder="请输入邮箱" type='email' />
            </Form.Item>
            <Form.Item name="role_id" label="角色" rules={[{required: true,message:'请选择分类'},]}>
                <Select placeholder="请选择分类">
                {this.state.roleList.map((item)=>{
                      return <Option key={item._id} value={item._id}>{item.name}</Option>
                    })}
                </Select>
            </Form.Item>
            </Form>
            
            </Modal>
        </div>
        )
    }
}
export default User