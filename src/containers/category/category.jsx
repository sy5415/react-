import React,{Component} from 'react'
import {Card,Button,Table,Modal,Form,Input,message} from 'antd';
import {connect} from 'react-redux'
import {reqCategoryList,reqAddCategory,reqUpdateCategory
} from '../../api/'
import {createSaveCategoryAction} from '../../redux/action_creators/category_action'
@connect(
  state=>({}),
  {saveCategory:createSaveCategoryAction}
) 
class Categery extends Component{
    state={
        categoryList:[],
        modalCurrentValue:'',
        modalCurrentId:'',
        visible:false,
        operType:'',
        //加载效果设置
        isLoading:true,
        
    }
    //创建容器获取以便于获取form的方法
    formRef = React.createRef()
    //获取请求分类列表
    getCategoryList=async()=>{
        let result=await reqCategoryList()
        this.setState({isLoading:false})
        const{status,data,msg}=result
        if(status===0){
            this.setState({categoryList:data})
            this.props.saveCategory(data)
        }else{
            MessageChannel.error(msg,1)
        }
    }
    componentDidMount(){
        this.getCategoryList()
    }
     //用于展示弹窗修改
    showUpdate = (item) => {
        const{_id,name}=item
        this.setState({operType:'update',modalCurrentValue:name,visible:true,modalCurrentId:_id})
      };
     //用于展示弹窗添加
    showAdd = () => {
        this.setState({visible:true,operType:'add'})
      };
    //确认弹窗内的修改最后传递值
    handleOk = () => {
        const {operType}=this.state
        //验证表单
        this.formRef.current.validateFields()
        .then(
            async(values)=>{
                if(operType==='add'){
                  let result1=await reqAddCategory(values.category)
                  const {status,msg}=result1
                  if(status===0){
                      message.success('新增商品成功',1);
                      this.getCategoryList();
                      this.setState({visible:false});
                      //重置内容
                      this.formRef.current.resetFields();
                    }
                  else{message.error(msg,1)}
                }else if(operType==='update'){
                  let result2=await reqUpdateCategory(this.state.modalCurrentId,values.category)
                  const {status,msg}=result2
                  console.log(result2)
                  console.log(status,msg)
                  if(status===0){
                    console.log(this.state.modalCurrentId)
                    this.getCategoryList();
                    message.success('修改分类名成功',1);
                    this.setState({visible:false});
                    //重置内容
                    this.formRef.current.resetFields();
                  }else{
                    message.error(msg,1)
                  }
                }
                //重置内容
                
            })
        .catch(error=>{message.warning(error.errorFields[0].errors[0],1)})
        
      };
        //取消弹窗展示
    handleCancel = () => {
            this.setState({visible:false})
            this.formRef.current.resetFields()
          };
    render(){
        const dataSource = this.state.categoryList
        const columns = [
            {
              title: '分类名',
              dataIndex: 'name',
              key:'name',
            },
            {
              title: '操作',
              render:(item)=>{
                  return(<Button type='link' onClick={()=>{this.showUpdate(item)}}>修改分类</Button>
                  )
              },
              align:'center'
            },
          ];
         
        return(
        <div>
            <Card  extra={<Button type='primary' onClick={this.showAdd}>+添加</Button>} >
            <Table  dataSource={dataSource} columns={columns} border='true' rowKey='_id' pagination={{defaultPageSize:4}} loading={this.state.isLoading}/>
            </Card>
            <Modal title={this.state.operType==='add'?'添加分类':'修改分类'} visible={this.state.visible} onOk={this.handleOk} onCancel={this.handleCancel} okText='确认' cancelText='取消'>
            <Form  ref={this.formRef} >
            <Form.Item name="category"
        rules={[
          {
            required: true,
            message: '请输入分类名',
          },
        
        ]}>
                <Input  placeholder="请输入分类名"  />
                </Form.Item>
            </Form>
            </Modal>
        </div>
        )
    }
}
export default Categery