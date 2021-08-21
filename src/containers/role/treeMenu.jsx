import React, { Component} from 'react'
import { Tree } from 'antd';
import  menuList from '../../config/menu_config.js'
export default class treeMenu extends Component {
    state={
        // expandedKeys:['0-0-0'],//配置展开也就是打开哪项
        // autoExpandParent:true,
        //默认选中的菜单
        checkedKeys:''
    }
   
    //循环出树形列表
    xunhuan=(data)=>{
        
        let  treeData=[]
        data.forEach((item)=>{
            if(item.children){
                let a= this.xunhuan(item.children)
                treeData.push({title:item.title,key:item.key,children:[...a]})
                
            }else{
                treeData.push({title:item.title,key:item.key})
            }
        })
       return treeData
    }
    componentDidMount(){
        this.setState({checkedKeys:this.props.content})
    }
    UNSAFE_componentWillReceiveProps(){
        this.setState({checkedKeys:this.props.content})
    }
    render() {
        // console.log(this.props.content)
        // 0: {title: "首页", key: "首页"}
        // 1: {title: "商品", key: "商品", children: Array(2)}
        // 2: {title: "用户管理", key: "用户管理"}
        // 3: {title: "角色管理", key: "角色管理"}
        // 4: {title: "图形图表", key: "图形图表", children: Array(3)}
        const treeData = this.xunhuan(menuList)
          const onCheck = (checkedKeysValue) => {
            console.log('onCheck', checkedKeysValue);
            this.setState({
                checkedKeys:checkedKeysValue,
            })
          };
        return (
            <div>
                <Tree checkable onCheck={onCheck} checkedKeys={this.state.checkedKeys}  treeData={treeData} defaultExpandAll />
            </div>
        )
    }
}
