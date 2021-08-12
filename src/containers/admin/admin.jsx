import React,{Component} from 'react'
import {connect} from 'react-redux'
// import {createSaveUserInfoAction} from  '../../redux/action_creators/login_action'
import {Redirect,Route,Switch} from 'react-router-dom'
//引入antd layout模块
import { Layout } from 'antd'
import {deleteUserInfo} from  '../../redux/action_creators/login_action'
// import {reqCategoryList} from '../../api'
import './css/admin.less'
import LeftNav from './left_nav/left_nav'
import Header from './header/header'
import Home from '../../components/home/home'
import Category from '../category/category'
import Product from '../product/product'
import User from '../user/user'
import Role from '../role/role'
import Bar from '../bar/bar'
import Line from '../line/line'
import Pie from '../pie/pie'
const {Footer, Sider, Content } = Layout;

@connect(
    state=>({userInfo:state.userInfo}),
    {
     deleteUserInfo:deleteUserInfo,
    }
)
class Admin extends Component{
    componentDidMount(){
        // console.log(this.props.deleteUserInfo);
    }
    // demo=async()=>{
    //      let result=await reqCategoryList()
    //      console.log(result)   
    // }
    render(){
        let {isLogin}=this.props.userInfo
        if(!isLogin){
            console.log('没有登录');
            return <Redirect to='/login' />
        }
        else{
            return(
                // <div>
                //    欢迎{user.username}<br/>
                //    <button onClick={this.props.deleteUserInfo}>退出登录</button>
                //    <button onClick={this.demo}>测试</button>
                // </div>
            <Layout className='adminContainer'>
                <Sider className='sider'>
                    <LeftNav/>
                </Sider>
                <Layout>
                    <Header header={this.props.userInfo}>Header</Header>
                    <Content className='content'>
                        <Switch>
                            <Route path='/admin/home' component={Home}/>
                            <Route path='/admin/prod_about/category' component={Category}/>
                            <Route path='/admin/prod_about/product' component={Product}/>
                            <Route path='/admin/user' component={User}/>
                            <Route path='/admin/role' component={Role}/>
                            <Route path='/admin/charts/bar' component={Bar}/>
                            <Route path='/admin/charts/line' component={Line}/>
                            <Route path='/admin/charts/pie' component={Pie}/>
                            <Redirect to='/admin/home' />
                        </Switch>
                    </Content>
                    <Footer className='footer'>@推荐使用谷歌浏览器,获取最佳体验</Footer>
                </Layout>
            </Layout>
        
            )
        }
        
    }
}
export default Admin
