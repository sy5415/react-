import {SAVE_PROD_LIST} from '../../redux/action_types'
export  const createSaveProductAction=(value)=>{
    return {type:SAVE_PROD_LIST,data:value}
}