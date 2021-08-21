import React, { Component } from 'react'
import {connect} from 'react-redux'
import { Menu,} from 'antd';
import {Link,withRouter} from 'react-router-dom/'
import {AppstoreOutlined,HomeOutlined,MacCommandOutlined} from '@ant-design/icons';

import {menuInfo} from '../../../redux/action_creators/menu_action'
import  menuList from '../../../config/menu_config'
import './css/leftNav.less'
const { SubMenu } = Menu;
@connect(
    state=>({
        menuInfo:state.menuInfo,
        //获取登录状态可以访问那些左边标签的权限 ["home", "prod_about", "category", "product", "user"]
        menus:state.userInfo.user.role.menus,
        //获取登录的用户如果是admin直接返回true获取所有标签权限
        username:state.userInfo.user.username
    }),
        
    {
        saveTitle:menuInfo
    }
)
@withRouter
class left_nav extends Component {
    // state = {collapsed: false,};
    // toggleCollapsed = () => {
    //         this.setState({
    //           collapsed: !this.state.collapsed,
    //         });
    // };
    componentDidMount(){
        //路径 {pathname: "/admin/user", search: "", hash: "", state: undefined, key: "ccgtce"}
        // console.log(this.props.location)
        // console.log(this.props.location.pathname.split('/').splice(2))
    }
    //校验菜单权限
    hasAuth=(item)=>{
        //获取当前用户可以看到的
        if(this.props.username==='admin'){return true}
        else if(!item.children){
            return this.props.menus.find((item2)=>{return item2===item.key})
        }else if(item.children){
           return item.children.some((item3)=>{
               return  this.props.menus.indexOf(item3.key)!==-1
            })
        }
        console.log(this.props.menus,item)
    }
    menuListHuidiao(target){
       return target.map((item)=>{
        //判断路径权限
        if(this.hasAuth(item)){
            if(!item.children){
                
                return(
                <Menu.Item key={item.key} icon={<HomeOutlined />} onClick={()=>{this.props.saveTitle(item.title)}}>
                    <Link to={item.path}>{item.title}</Link>
                </Menu.Item>
                )
              }else{
                return(
                <SubMenu key={item.key} icon={<AppstoreOutlined />} title={item.title}>
                    {this.menuListHuidiao(item.children)}
                </SubMenu>
                )
              }
        }else{
            return ""
        }
        })
    }
    render() {
        return (
            <div className='allLeftNav'>
                <header>
                <MacCommandOutlined className='big'/>
                <div className='a'>商品管理系统</div>
                </header>
            <Menu
            // {判断左边标签选中}
            selectedKeys={this.props.location.pathname.indexOf('product')!==-1?'product':(this.props.location.pathname.indexOf('user')!==-1?'user':this.props.location.pathname.split('/').reverse()[0])}
             mode="inline" theme="dark" defaultOpenKeys={this.props.location.pathname.split('/').splice(2)} >
              {this.menuListHuidiao(menuList)}
            </Menu>
          </div>
        )
    }
}
export default left_nav
