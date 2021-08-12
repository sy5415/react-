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
    state=>({menuInfo:state.menuInfo}),
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
        console.log(this.props.location)
    }
    menuListHuidiao(target){
       return target.map((item)=>{
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
        })
    }
    render() {
        return (
            <div className='allLeftNav'>
                <header>
                <MacCommandOutlined className='big'/>
                <div className='a'>商品管理系统</div>
                </header>
            <Menu selectedKeys={this.props.location.pathname.split('/').reverse()[0]} mode="inline" theme="dark" defaultOpenKeys={this.props.location.pathname.split('/').splice(2)} >
              {this.menuListHuidiao(menuList)}
            </Menu>
          </div>
        )
    }
}
export default left_nav
