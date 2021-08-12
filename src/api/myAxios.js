import axios from 'axios'
import qs from 'querystring'
import {message} from 'antd'
import store from '../redux/store'
import {deleteUserInfo} from '../redux/action_creators/login_action'
//进度条
const instance=axios.create({
    timeout:4000
})
//请求拦截器
instance.interceptors.request.use(function (config) {
    const {method,data}=config
    const{token} =store.getState().userInfo
    console.log(token)
    if(token)config.headers.Authorization='sy_'+token
    if(method ==='post'){
        //没有用qs.stringify转换前的是对象类型 转换后是字符串类型
        if(data instanceof Object){
            config.data=qs.stringify(data)
        }
    }
    return config;
  }, function (error) {
    return Promise.reject(error);
  });
//响应拦截器
instance.interceptors.response.use(function (response) {
    return response.data;
  }, function (error){
    if(error.response.status===401){
      message.error('身份校检失败，请重新登录')
      store.dispatch(deleteUserInfo())
    }else{
      message.error(error.message,1.5)
    }
    return new Promise(()=>{})
  });
export default instance