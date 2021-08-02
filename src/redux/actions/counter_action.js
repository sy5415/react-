import {DECREMENT,INCREMENT} from '../action_types.js'
export const createIncrementAction=value=>({type:INCREMENT,data:value})
export const createDecrementAction=value=>({type:DECREMENT,data:value})
export const createIncrementAsynACtion=(value,delay)=>{
  return(dispath)=>{
    setTimeout(()=>{
        dispath(createIncrementAction(value))
    },delay)
  }
}