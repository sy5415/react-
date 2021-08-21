import {combineReducers} from 'redux'
import login from './login_recuder'
import menu from './menu_recuder'
import prduct from './product_recuder'
import categoryRecuder from './category_reducer'
export default combineReducers({
    userInfo:login,
    menuInfo:menu,
    productInfo:prduct,
    categoryList:categoryRecuder
})