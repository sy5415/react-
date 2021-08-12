import {combineReducers} from 'redux'
import login from './login_recuder'
import menu from './menu_recuder'
export default combineReducers({
    userInfo:login,
    menuInfo:menu,
})