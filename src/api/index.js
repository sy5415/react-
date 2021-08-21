import myAxios from './myAxios'
import {BASE_URL} from '../config'
//获取登录请求
export const reqLogin=(values)=>{
   return myAxios.post(`${BASE_URL}/login`,values)
}
//获取商品列表请求
export const reqCategoryList=(values)=>{
   return myAxios.get(`${BASE_URL}/manage/category/list`)
}
//新增商品的分类
export const reqAddCategory=(values)=>{
   return myAxios.post(`${BASE_URL}/manage/category/add`,{categoryName:values})
}
//更新一个商品分类请求
export const reqUpdateCategory=(categoryId,categoryName)=>{
   return myAxios.post(`${BASE_URL}/manage/category/update`,{categoryId,categoryName})
}
//请求商品分页列表
export const reqProductList=(pageNum,pageSize)=>myAxios.get(`${BASE_URL}/manage/product/list`,{params:{pageNum,pageSize}})
//请求更新商品状态
export const reqUpdateProdStatus=(productId,status)=>myAxios.post(`${BASE_URL}/manage/product/updateStatus`,{productId,status})
//搜索商品
export const reqSeachProduct=(pageNum,pageSize,searchType,keyWord)=>{
//这里的searchType加[]可以改变状态不用if判断searchType的类型在发送请求
return myAxios.get(`${BASE_URL}/manage/product/search`,{params:{pageNum,pageSize,[searchType]:keyWord}})
}
//根据商品id获取商品信息
export const reqProdById=(productId)=>myAxios.get(`${BASE_URL}/manage/product/info`,{params:{productId}})
//获取商品分类信息
export const reqCategory=()=>myAxios.get(`${BASE_URL}/manage/category/list`)
//请求删除图片（根据图片唯一名）
export const reqDeletePicture=(name)=>myAxios.post(`${BASE_URL}/manage/img/delete`,{name})
//请求添加商品
export const reqAddProduct=(productObj)=>myAxios.post(`${BASE_URL}/manage/product/add`,{...productObj})
//请求修改商品
export const reqUpdateProduct=(productObj)=>myAxios.post(`${BASE_URL}/manage/product/update`,{...productObj})
//请求所有角色列表
export const reqRoleList=()=>myAxios.get(`${BASE_URL}/manage/role/list`)
//请求添加校色
export const reqAddRole=({roleName})=>{return myAxios.post(`${BASE_URL}/manage/role/add`,{roleName})}
//请求角色授权
export const reqAuthRole=(roleObj)=>myAxios.post(`${BASE_URL}/manage/role/update`,{...roleObj})
//// 获取所有用户的列表(同时携带角色列表)
export const reqUserList = () =>myAxios.get(`${BASE_URL}/manage/user/list`)
//请求添加用户
export const reqAddUser=(userObj)=>myAxios.post(`${BASE_URL}/manage/user/add`,{...userObj})
//请求删除用户
export const reqDeleteUser=(userId)=>myAxios.post(`${BASE_URL}/manage/user/delete`,{userId})
//修改用户信息
export const reqModifyUser=(_id)=>myAxios.post(`${BASE_URL}/manage/user/update`,{..._id})