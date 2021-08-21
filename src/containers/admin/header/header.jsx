import React,{Component} from 'react'
import {connect} from 'react-redux'
import {FullscreenOutlined,FullscreenExitOutlined,ExclamationCircleOutlined,ClockCircleOutlined} from '@ant-design/icons';
import {Button,Modal} from 'antd'
import screenfull from 'screenfull'
import dayjs from 'dayjs'
//非路由组件使用路由组件的方法
import {withRouter} from 'react-router-dom'
import store from '../../../redux/store'
import {deleteUserInfo} from '../../../redux/action_creators/login_action'
import menuList from '../../../config/menu_config'
import {menuInfo} from '../../../redux/action_creators/menu_action'
import './css/header.less'
@connect(state=>({menuInfo:state.menuInfo}),
{
    saveTitle:menuInfo
})
@withRouter
class Header extends Component{
    state={
        isFull:true,
        date:dayjs().format('YYYY年 M月D日 HH:mm:ss'),
        title:''
    }
    fullScreen=()=>{
        screenfull.toggle()
    }
    layout=()=>{
        store.dispatch(deleteUserInfo())
        this.props.saveTitle('首页')
     }
     //左边标签类型在header上的展示功能
     getitle=()=>{
        let pathKey= this.props.location.pathname.split('/').reverse()[0];
        if(this.props.location.pathname.indexOf('product')!==-1){
            pathKey='product'
        }else if(this.props.location.pathname.indexOf('user')!==-1){
            pathKey='user'
        }
        let title=""
        menuList.forEach((item)=>{
            if(item.children instanceof Array){
               let tem=item.children.find((item1)=>{
                    return item1.key ===pathKey
                })
            if(tem){title=tem.title}
            }else{
                if(pathKey===item.key){
                    title=item.title
                }
            }
        })
        this.setState({title})
        return title
     }
    componentDidMount(){
        screenfull.on('change',()=>{
            let isFull=!this.state.isFull
            this.setState({isFull})
        })
       this.ID= setInterval(()=>{
            this.setState({date:dayjs().format('YYYY年 M月D日 HH:mm:ss')})
        },1)
     this.getitle()
        
    }
    componentWillUnmount(){
        clearInterval(this.ID)
    }
    
    render(){
        let {isFull}=this.state
        //console.log(this.props)
        let {user}=this.props.header
          const { confirm } = Modal;
          //退出框需要的对象调用
          let that=this
          function showConfirm() {
                confirm({
                  icon: <ExclamationCircleOutlined />,
                  content: '是否确定退出',
                  onOk() {
                    //调用退出方法
                    that.layout()
                  },
                  cancelText:'取消',
                  okText:'确认'
                });
          }
        return(
            <header className='header'>
                <div className="headerTop">
                <Button size='small' className='botton' onClick={this.fullScreen} >
                    {isFull?<FullscreenOutlined />:<FullscreenExitOutlined />}
                </Button>
                    <span>欢迎，{user.username}&nbsp;&nbsp;&nbsp;&nbsp;</span>
                    <Button type='link' size='small' onClick={showConfirm} >退出登录</Button>
                </div>
                <div className="headerBoottom">
                    <div className="headerBoottomLeft" style={{color:'#52c41a'}}>{this.props.menuInfo||this.state.title}</div>
                    <div className="headerBoottomRight">
                        {this.state.date}.
                        <ClockCircleOutlined  spin className='imgTu'/>
                    </div>
                </div>
            </header>
        )
    }
}
export default Header