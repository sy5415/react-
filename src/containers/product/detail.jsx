import React, { Component } from 'react'
import {connect} from 'react-redux'
import {Button,Card,List,message} from 'antd'
import { LeftOutlined } from '@ant-design/icons';
import {reqProdById,reqCategory} from '../../api/index'
import './css/detail.less'
@connect(
  state=>({productList:state.productInfo,categoryList:state.categoryList})
)
class Detail extends Component {
  state={
    categoryId:'',
    name:'',
    desc:'',
    price:'',
    imgs:[],
    detail:'',
  }
  //当用户刷新时从后台获取商品信息
  getProdById=async(id)=>{
    let result=await reqProdById(id)
    const{status,data}=result
    if(status===0){
      const {categoryId,name,desc,price,imgs,detail}=data
      this.setState({categoryId,name,desc,price,imgs,detail})
      //这个是如果用户没有获取到redux中的信息时从服务器获取值
      //为了避免setState是异步的在生命周期钩子函数里面拿不到的解决方法
      this.categoryId=data.categoryId
    }
  }
  //当用户刷新时从后台获取商品分类信息同上一样原因redux中的信息会被清除
  getCategorylist=async()=>{
    let result= await reqCategory()
    console.log(result)
    const {status,data,msg}=result
    if(status===0){
      let result=data.find((item)=>{
        return item._id===this.categoryId
      })
      if(result){this.setState({categoryId:result.name})}
    }else{
      message.error(msg)
    }
  }
  componentDidMount(){
    //用户点击时直接从redux中获取商品详细信息
    const reduxProductList=this.props.productList
    //获取路由传递过来的商品id信息
    const {id}=this.props.match.params
    //从redux获取商品分类信息 注意是在category.jsx中就存入redux状态的
    const reduxCateList=this.props.categoryList
    if(reduxProductList.length!==0){
      let result= reduxProductList.find((item)=>{
        return item._id===id
      })
      if(result){ const {categoryId,name,desc,price,imgs,detail}=result
      //重要setState是异步的在生命周期钩子函数里面拿不到的
      this.setState({categoryId,name,desc,price,imgs,detail})}
      //为了避免setState是异步的在生命周期钩子函数里面拿不到的解决方法
      this.categoryId=result.categoryId
    }else{
      this.getProdById(id)
    }
    //判断redux中是否有分类信息在对当前点击的商品判断分类
    if(reduxCateList.length){
     let result= reduxCateList.find((item)=>{
        return item._id===this.categoryId
      })
    this.setState({categoryId:result.name})
    }else{
      //没有redux是请求服务器获取分类
      this.getCategorylist()
    }
   
   
  }
    render() {
            return (
            <div>
                <Card title={
                <div>
                    <Button type='link' style={{color:'green'}} icon={<LeftOutlined />} onClick={()=>{this.props.history.goBack()}}>返回</Button><span>商品详情</span>
                </div>} extra>
                <List>
                  <List.Item>
                     <div><span className='listItemSpan'>商品名称:</span>{this.state.name}</div> 
                  </List.Item>
                  <List.Item>
                  <div><span className='listItemSpan'>商品描述:</span>{this.state.desc}</div> 
                  </List.Item>
                  <List.Item>
                  <div><span className='listItemSpan'>所属分类:</span>{this.state.categoryId}</div> 
                  </List.Item>
                  <List.Item>
                  <div>
                    <span className='listItemSpan'>商品图片:</span>
                    {this.state.imgs.map((item,index)=>{
                      return <img key={index} src={`/upload/`+item} alt="商品图片" style={{width:'220px',height:'220px'}}/>
                    })}
                  </div> 
                  </List.Item>
                  <List.Item>
                  <div><span className='listItemSpan'>商品详情:</span><span dangerouslySetInnerHTML={{__html:this.state.detail}}></span></div> 
                  </List.Item>
                </List>
                </Card>
            </div>
        )
    }
}
export default Detail
