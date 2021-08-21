import React,{Component} from 'react'
import ReactECharts from 'echarts-for-react';
import {reqProductList,reqCategoryList} from '../../api/'
export default class Line extends Component{
    state={
        productData:''
    }

    //请求获取各类商品以及分类在判断各类型数目
    getProductListBar=async()=>{
        let result=await reqProductList(1,100)
        let result1=await reqCategoryList()
        let dataProduct={}
        result1.data.forEach((item)=>{
            dataProduct[item.name]=0
            result.data.list.forEach((item2)=>{
                if(item2.categoryId===item._id){
                    dataProduct[item.name]+=1
                }
            })
        })
        //把对象的key和values变成数组便于图像组件使用
        // console.log(Object.keys(dataProduct),Object.values(dataProduct))
       let option = {
        title: {
            text: '各分类商品数量统计折线图',

        },
           textStyle:{
               color:'#52c41a'
           }
           ,
            xAxis: {
                type: 'category',
                data:Object.keys(dataProduct),
                axisLabel:{
                    interval:0
                }
            },
            yAxis: {
                type: 'value'
            },
            series: [{
                data: Object.values(dataProduct),
                type: 'line',
                symbol: 'triangle',
                symbolSize: 20,
                lineStyle: {
                    color: '#5470C6',
                    width: 4,
                    type: 'dashed'
                },
                itemStyle: {
                    borderWidth: 3,
                    borderColor: '#EE6666',
                    color: 'yellow'
                }
            }]
        };
        this.setState({productData:option})
    }
    componentDidMount(){
        this.getProductListBar()
    }
    render(){
        return(
            <div style={{height:'100%'}}>
                 {this.state.productData===''?'':<ReactECharts option={this.state.productData} style={{marginTop:'5%',height:'80%',width:'100%'}}/>}
            </div>
        )
    }
}