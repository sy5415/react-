import React,{Component} from 'react'
import {Card,Button,Table,Modal,Form,Input,message} from 'antd';
import {connect} from 'react-redux'
import dayjs from 'dayjs'
import {reqRoleList,reqAddRole,reqAuthRole} from '../../api/'
import TreeMenu from './treeMenu.jsx'
@connect(
  state=>({username:state.userInfo.user.username}),
  {}
) 
class Role extends Component{
    state={
      
        //弹窗默认不展示
        visible:false,
        visible2:false,
        //加载效果设置
        // isLoading:true,
        roleList:[],
        menus:[],
        create_time:'',
        _id:'',
        auth_name:'',
        lsit:''
        
    }
    //创建容器获取以便于获取form的方法
    formRef = React.createRef()
    treeMenuRef = React.createRef()
    componentDidMount(){
        this.getRoleList()
    }
   //用于展示弹窗授权弹窗 
    handleAuthOk = (item) => {
       let result=this.state.roleList.find((item1)=>{
          return item1._id===item._id
        })
        this.setState({visible2:true,_id:item._id,auth_name:this.props.username,lsit:result.menus})
        
      };
     //用于展示弹窗角色添加
    showAdd = () => {
        this.setState({visible:true})
      };
    //获取角列表
    getRoleList=async()=>{
      let result=await reqRoleList()
      this.setState({roleList:result.data})
    }
    //新增角色--确认按钮
    handleOk = () => {
        //验证表单
        this.formRef.current.validateFields()
        .then(async(value)=>{
          console.log(value)
          let result=await reqAddRole(value)
          const {data,status,msg}=result
          if(status===0){
            this.setState({...data,visible:false})
            message.success('新增角色成功',1)
            this.getRoleList()
          }else{
            message.error(msg,1)
          }
        })
        .catch(error=>{console.log(error)})
        
      };
    //设置权限--确认按钮
    onOk=async()=>{
      let result= await reqAuthRole({_id:this.state._id,auth_name:this.state.auth_name,menus:this.treeMenuRef.current.state.checkedKeys})
      const {status,msg,data}=result
      if(status===0){
        this.setState({visible2:false,menus:this.treeMenuRef.current.state.checkedKeys})
        message.success('设置权限成功',1)
        this.getRoleList()
        console.log(data)
      }else{message.error(msg,1)}
    }
    //取消弹窗展示第一个model
    handleCancel = () => {
            this.setState({visible:false})
            this.formRef.current.resetFields()
          };
  //取消弹窗展示第二个model
   handleCancel2 = () => {
            this.setState({visible2:false})
    };
   
    render(){
        const dataSource = this.state.roleList
        const columns = [
            {
              title: '角色名称',
              dataIndex: 'name',
              key:'name',
            },
            {
              title: '创建时间',
              dataIndex: 'create_time',
              key:'create_time',
              render:(time)=>{
                return dayjs(time).format('YYYY年 M月D日 HH:mm:ss')
              }
            },
            {
              title: '授权时间',
              dataIndex: 'auth_time',
              key:'auth_time',
              render:(time)=>{
                return time?dayjs(time).format('YYYY年 M月D日 HH:mm:ss'):''
              }
            },
            {
              title: '授权人',
              dataIndex: 'auth_name',
              key:'auth_name',
            },
            {
              title: '操作',
              render:(item)=>{
                  return(<Button type='link' onClick={()=>{this.handleAuthOk(item)}}>设置权限</Button>
                  )
              },
              align:'center'
            },
          ];
         
        return(
        <div>
            <Card  extra={<Button type='primary' onClick={this.showAdd}>添加角色
            </Button>} >
            <Table  dataSource={dataSource} columns={columns} border='true' rowKey='_id' pagination={{defaultPageSize:4}} loading={this.state.isLoading} bordered='true'/>
            </Card>
            <Modal title='新增角色' visible={this.state.visible} onOk={this.handleOk} onCancel={this.handleCancel} okText='确认' cancelText='取消'>
            <Form  ref={this.formRef} >
            <Form.Item name="roleName" rules={[{required: true,message: '请输入角色名',}]}>
                <Input  placeholder="请输角色"  />
                </Form.Item>
            </Form>
            </Modal>
            <Modal title='设置权限' visible={this.state.visible2} onOk={this.onOk} onCancel={this.handleCancel2} okText='确认' cancelText='取消'>
              <TreeMenu ref={this.treeMenuRef} content={this.state.lsit}/>
            </Modal>
        </div>
        )
    }
}
export default Role