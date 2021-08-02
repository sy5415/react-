import {DECREMENT,INCREMENT} from '../action_types.js'
let initState=1
export default function operaCount(preState=initState,action){
    const {type,data}=action
    let newState=0
    switch(type){
        case INCREMENT:
            newState=preState+data
            return newState
        case DECREMENT:
            newState=preState-data
            return newState
        default:
            return preState
    }
}
 