import React,{Component} from 'react'
import * as echarts from 'echarts';
import ReactECharts from 'echarts-for-react';
import {reqProductList,reqCategoryList} from '../../api/'
export default class Bar extends Component{
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
        let option = {
            title: {
                text: '各分类商品数量统计',
                subtext: '上架数量',
                fontSize:20,
            },
            xAxis: {
                data:Object.keys(dataProduct),
                axisLabel: {
                    inside:false,
                    textStyle: {
                        color: '#52c41a'
                    },
                    interval:0,
                },
                axisTick: {
                    show: false
                },
                axisLine: {
                    show: false
                },
                z:10
            },
            yAxis: {
                axisLine: {
                    show: false
                },
                axisTick: {
                    show: false
                },
                axisLabel: {
                    textStyle: {
                        color: '#52c41a'
                    },
                    
                }
            },
            dataZoom: [
                {
                    type: 'inside'
                }
            ],
            series: [
                {
                    type: 'bar',
                    showBackground: true,
                    itemStyle: {
                        color: new echarts.graphic.LinearGradient(
                            0, 0, 0, 1,
                            [
                                {offset: 0, color: '#83bff6'},
                                {offset: 0.5, color: '#52c41a'},
                                {offset: 1, color: '#52c41a'}
                            ]
                        )
                    },
                    emphasis: {
                        itemStyle: {
                            color: new echarts.graphic.LinearGradient(
                                0, 0, 0, 1,
                                [
                                    {offset: 0, color: '#2378f7'},
                                    {offset: 0.7, color: '#52c41a'},
                                    {offset: 1, color: '#83bff6'}
                                ]
                            )
                        }
                    },
                    data:Object.values(dataProduct)
                }
            ]
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