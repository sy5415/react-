import React,{Component} from 'react'
import {Card,Button,Select,Input,Table,message} from 'antd';
import {PlusOutlined,SearchOutlined} from '@ant-design/icons';
import {connect} from 'react-redux'
import {reqProductList,reqUpdateProdStatus,reqSeachProduct} from '../../api'
import {createSaveProductAction} from '../../redux/action_creators/product_action'
import {PAGE_SIZE} from '../../config' 

const {Option}= Select;
@connect(
    state=>({productList:state.productList}),
    {saveProduct:createSaveProductAction}
)
 class Product extends Component{
    state={
        //获取列表
        productList:[],
        //获取数据总条数
        total:'',
        //当前页
        current:1,
        //搜索框内容
        keyWord:'',
        //搜索类型 默认为name
        seachType:'productName',
        //切换搜索
        flag:false,
        isLoading:true,
    }
    //获取列表及其分页改变状态等
    getProductList=async(num,a,b)=>{
        if(this.state.flag){
            this.seach(num.current)
        }else{
        let result=await reqProductList(num.current,PAGE_SIZE)
        // console.log(num);
        const {status,data}=result
        if(status===0){
            this.setState({isLoading:false})
            this.setState({productList:data.list,total:data.total,current:num.current})
            this.props.saveProduct(data.list)
        }
        }
    }
    //获取点击页数的值同时改变状态ant有个组件的方法
    // demo1=(a)=>{
    //     this.setState({current:a.current})
    // }
    updateProductStatus=async({_id,status})=>{
        if(status===1){status=2}else{status=1}
        let result =await reqUpdateProdStatus(_id,status)
        if(result.status===0){
            message.success('更改状态成功',1)
            this.getProductList({current:this.state.current})
        }else{
            message.error(result.msg,1)
        }
    }
    //搜索功能
    seach=async(num)=>{
     let {status,data,msg}=await reqSeachProduct(num instanceof Object?1:num,PAGE_SIZE,this.state.seachType,this.state.keyWord)
     if(status===0){
        this.setState({flag:true,productList:data.list,total:data.total,current:num instanceof Object?1:num})
        //把搜索到的数据存到redux中
        this.props.saveProduct(data.list)
    }else{
        message.error(msg,1)
    }
    }
    componentDidMount(){
        //刚开始请求默认掉第一页因为有table的onchange需要传参数
        this.getProductList({current:1})
    }
    render(){
        const dataSource = this.state.productList
        const columns = [
            {
              title: '商品名称',
              dataIndex: 'name',
              key: 'name',
            },
            {
              title: '商品描述',
              dataIndex: 'desc',
              key: 'desc',
              width:'40%'
            },
            {
              title: '价格',
              dataIndex: 'price',
              key: 'price',
              render:price=>'$'+price
            },
            {
                title: '状态',
                key: 'status',
                render:(item)=>{return <div>
                    <Button type={item.status===1?'primary':''} onClick={()=>{this.updateProductStatus(item)}}>{item.status===1?'下架':'上架'}</Button><br/>
                    <span>{item.status===1?'在售':'停售'}</span>
                </div>},
                align:'center'
              },
              {
                title: '操作',
                // dataIndex: 'opera',
                key: 'opera',
                render:(item)=>{
                    return(<div>
                        <Button type='link' style={{color:'green'}} onClick={()=>{this.props.history.push(`/admin/prod_about/product/detail/${item._id}`)}}>详情</Button><br/>
                        <Button type='link' style={{color:'red'}} onClick={()=>{this.props.history.push(`/admin/prod_about/product/add_update/${item._id}`)}} >修改</Button>
                    </div>)
                },
                align:'center'
              },
          ];
        return(
            <div>
                <Card title={
                <div>
                    <Select defaultValue='productName' onChange={(value)=>{this.setState({seachType:value})}}>
                        <Option value='productName'>按名称搜索</Option>
                        <Option value='productDesc'>按描述搜索</Option>
                    </Select>
                    <Input style={{margin:'0 0 0 10px',width:'20%'}} placeholder="请输入关键字" allowClear={true} onChange={(event)=>{this.setState({keyWord:event.target.value})}}></Input>
                    <Button   icon={<SearchOutlined />} onClick={this.seach} />
                </div>
            } extra={<Button  icon={<PlusOutlined />} type='primary' onClick={()=>{this.props.history.push('/admin/prod_about/product/add_update')}}>添加商品</Button>}>
                <Table scroll={{y:350}} onChange={this.getProductList} dataSource={dataSource} columns={columns} bordered={true} rowKey='_id' pagination={{total:this.state.total,pageSize:PAGE_SIZE,current:this.state.current}} loading={this.state.isLoading} />;
                </Card>
            </div>
        )
    }
}
export default Product