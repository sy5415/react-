import React,{Component} from 'react'
import { Card,Button,Select,Input,Table} from 'antd';
import {PlusOutlined,SearchOutlined} from '@ant-design/icons';
import {reqProductList} from '../../api'
import {PAGE_SIZE} from '../../config' 
const {Option}= Select;
export default class Product extends Component{
    state={
        productList:[],
        total:'',
        current:1
    }
    getProductList=async(num)=>{
        let result=await reqProductList(num.current,PAGE_SIZE)
        console.log(num);
        const {status,data,msg}=result
        if(status===0){
            this.setState({productList:data.list,total:data.total,current:num.current})
        }
    }
    demo=(a)=>{
        this.setState({current:a.current})
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
                dataIndex: 'status',
                key: 'status',
                render:(status)=>{return <div>
                    <Button type='primary'>下架</Button><br/>
                    <span>{status}</span>
                </div>},
                align:'center'
              },
              {
                title: '操作',
                dataIndex: 'opera',
                key: 'opera',
                render:()=>{
                    return(<div>
                        <Button type='link'>详情</Button>
                    </div>)
                },
                align:'center'
              },
          ];
        return(
            <div>
                <Card title={
                <div>
                    <Select defaultValue='name'>
                        <Option value='name'>按名称搜索</Option>
                        <Option value='desc'>按描述搜索</Option>
                    </Select>
                    <Input style={{margin:'0 0 0 10px',width:'20%'}} placeholder="请输入关键字" allowClear={true}></Input>
                    <Button   icon={<SearchOutlined />} />
                </div>
            } extra={<Button  icon={<PlusOutlined />} type='primary'>添加商品</Button>}>
                <Table onChange={this.getProductList} dataSource={dataSource} columns={columns} bordered={true} rowKey='_id' pagination={{total:this.state.total,pageSize:PAGE_SIZE,current:this.state.current}} />;
                </Card>
            </div>
        )
    }
}