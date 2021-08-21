import {SAVE_CATEGORY_LIST} from '../../redux/action_types'
export  const createSaveCategoryAction=(value)=>{
    return {type:SAVE_CATEGORY_LIST,data:value}
}