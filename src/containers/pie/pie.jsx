import React,{Component} from 'react'
import ReactECharts from 'echarts-for-react';
import {reqCategoryList} from '../../api/'
export default class Pie extends Component{
    state={
        data:''
    }
    getOption=async()=>{
        let result=await reqCategoryList()
        const {data}=result;
        let dataPie=[]
        data.forEach(element => {
            dataPie.push({name:element.name,value:1})
        });
        let option = {
            title: {
                text: '商品分类',
                subtext: '分类图例',
                left: 'center',
    
            },
            tooltip: {
                trigger: 'item'
            },
            legend: {
                orient: 'vertical',
                left: 'left',
               
            },
            series: [
                {
                    name: '访问来源',
                    type: 'pie',
                    radius: '60%',
                    data:dataPie,
                    emphasis: {
                        itemStyle: {
                            shadowBlur:20,
                            shadowOffsetX: 0,
                            shadowColor: 'rgba(0, 0, 0, 0.5)'
                        }
                    }
                }
            ],
            grid:{
            width: "1020px",
            height: "800px",
           
            }
        };
        this.setState({data:option})
    }
    UNSAFE_componentWillMount(){
       this.getOption()
    }
    render(){
        return(
            <div style={{height:'100%'}}>
                {this.state.data===''?'':<ReactECharts option={this.state.data} style={{marginTop:'5%',height:'80%'}}/>}
            </div>
        )
    }
}