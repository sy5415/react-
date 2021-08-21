import React, { Component } from 'react'
import {Button,Card,Form, Input,Select,message,} from 'antd'
import { LeftOutlined} from '@ant-design/icons';
import {connect} from 'react-redux'
import {reqCategory,reqAddProduct,reqProdById,reqUpdateProduct} from '../../api/index'
import PicturesWall  from './picture_wall'
import RichText from './rich_text'
const { Option } = Select;
@connect(
    state=>({categoryList:state.categoryList,productInfo:state.productInfo}),{}
)
class AddUpdate extends Component {
state={
        categoryList:[],//商品分类列表
        operaType:'add',
        name:'',
        desc:'',
        price:'',
        categoryId:'',
        detail:'',
        imgs:[],

    }
getCategoryList=async()=>{
    let result=await reqCategory();
    const {status,data,msg} =result
    if(status===0){this.setState({categoryList:data})}
    else{message.error(msg)}
}
//获取商品信息修改商品用于回显使用
getProductList=async(id)=>{
  let result=await  reqProdById(id)
  if(result.data){
    this.setState({...result.data})
    this.formRef.current.setFieldsValue({...result.data})
    this.picturWall.current.setImgArr(result.data.imgs)
    this.richText.current.setRichText(result.data.detail)
}
}
componentDidMount(){
    const {categoryList}=this.props
    const {id}=this.props.match.params
    if(categoryList.length){this.setState({categoryList})}
    else{this.getCategoryList()}
    if(id){
        this.setState({operaType:'update'})
        if(this.props.productInfo.length){
            let result=this.props.productInfo.find((item)=>{
                return item._id===id
            })
            if(result){
                this.setState({...result})
                this.formRef.current.setFieldsValue({...result})
                this.picturWall.current.setImgArr(result.imgs)
                this.richText.current.setRichText(result.detail)
            } 
        }else{
            //因为尽量不能在生命周期钩子函数上加async所以在外面声名一个函数
            this.getProductList(id)
        }
    }
}
//这里是为了获取图片的路径创建的ref
picturWall=React.createRef()
richText=React.createRef()
formRef=React.createRef()
    render() {
        const layout = {
            labelCol: {
              span: 2,
            },
            wrapperCol: {
              span:6,
            },
          };
          const onFinish = async(values) => {
            let imgs=this.picturWall.current.getImgArr()
            let detail=this.richText.current.getRichText()
            if(this.state.operaType==='add'){
            let result=await reqAddProduct({...values,detail,imgs})
            const {status,msg}=result
            if(status===0){message.success('添加商品成功');this.props.history.replace('/admin/prod_about/product')}
            else{message.error(msg)}
            }else{
            //修改商品逻辑
            let result=await reqUpdateProduct({...values,detail,imgs,_id:this.props.match.params.id})
            const {status,msg}=result
            if(status===0){message.success('商品修改成功');this.props.history.replace('/admin/prod_about/product')}
            else{message.error(msg)}
            }
            
          };
        return (
            <div>
                <Card title={
                <div>
                    <Button type='link' style={{color:'green'}} icon={<LeftOutlined />} onClick={()=>{this.props.history.goBack()}}>返回</Button><span>{this.state.operaType==='add'?'商品添加':'商品修改'}</span>
                </div>} extra>
                <Form {...layout}  name="control-hooks" onFinish={onFinish} ref={this.formRef}>
                <Form.Item name="name" label="商品名称"  rules={[{required: true,message:'商品名称必须输入'}]} >
                    <Input placeholder='商品名称' />
                </Form.Item>
                <Form.Item name="desc" label="商品描述"  rules={[{required: true,message:'商品描述必须输入'}]}>
                    <Input placeholder='商品描述' />
                </Form.Item>
                <Form.Item name="price" label="商品价格" rules={[{required: true,message:'请输入商品价格'}]} >
                    <Input placeholder='商品价格' prefix='¥' addonAfter='元' type='number' />
                </Form.Item>
                <Form.Item name="categoryId" label="商品分类" rules={[{required: true,message:'请选择分类'},]}>
                <Select placeholder="请选择商品分类">
                    {this.state.categoryList.map((item)=>{
                      return <Option key={item._id} value={item._id}>{item.name}</Option>
                    })}
                </Select>
                </Form.Item>
                <Form.Item name="imgs" label="商品图片"   extra="请上传图片" wrapperCol={{span:10}} >
                   <PicturesWall ref={this.picturWall}/>
                </Form.Item>
                <Form.Item name="detail" label="商品详情"   wrapperCol={{span:18}}>
                   <RichText ref={this.richText}/>
                </Form.Item>
                <Form.Item  wrapperCol={{offset:2}}  >
                <Button type="primary" htmlType="submit">添加</Button>
                </Form.Item>
                </Form>
                </Card>
            </div>
        )
    }
}
export default AddUpdate
