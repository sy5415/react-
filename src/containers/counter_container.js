import Counter from '../components/counter.jsx'
import {connect} from 'react-redux'
import {createIncrementAction,createDecrementAction} from '../redux/actions/counter_action.js'
let mapStateToProps=state=>({count:state.count})
// function demo2(dispath){
//     return {increment:(value)=>{dispath(createIncrementAction(value))},decrement:value=>{dispath(createDecrementAction(value))}}
// }
export default connect(
    mapStateToProps,
    {
        increment:createIncrementAction,
        decrement:createDecrementAction
    })(Counter)