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
   console.log(values)
   return myAxios.post(`${BASE_URL}/manage/category/add`,{categoryName:values})
}
//更新一个商品分类请求
export const reqUpdateCategory=(categoryId,categoryName)=>{
   console.log(categoryId,categoryName)
   return myAxios.post(`${BASE_URL}/manage/category/update`,{categoryId,categoryName})
}
//请求商品分页列表
export const reqProductList=(pageNum,pageSize)=>myAxios.get(`${BASE_URL}/manage/product/list`,{params:{pageNum,pageSize}})