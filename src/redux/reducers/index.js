import a from './counter_reducer.js'
import b from './person_reducer.js'
import {combineReducers} from 'redux'
export default combineReducers({
    count:a,
    person:b
})