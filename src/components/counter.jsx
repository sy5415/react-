import React,{Component} from 'react'
export default class Counter extends Component{
    
    componentDidMount(){
    console.log(this.props)
    }
    //加法
    increment=()=>{
        let {value}=this.refs.selectNumber
        // this.props.store.dispatch(createIncrementAction(value*1))
        this.props.increment(value*1)
    }
    //减法
    decrement=()=>{
        let {value}=this.refs.selectNumber
        // this.props.store.dispatch(createDecrementAction(value*1))
        this.props.decrement(value*1)
    }
    incrementIfOdd=()=>{
        let {value}=this.refs.selectNumber
        let {count}=this.props
        if(count%2 === 0){
            this.props.increment(value*1)
        }
    }
    incrementAsync=()=>{
        let {value}=this.refs.selectNumber;
        setTimeout(()=>{
            // this.props.store.dispatch(createDecrementAction(value*1))
            this.props.increment(value*1)
        },2000)
       
    }
    render(){
    //    let count=this.props.store.getState()
        return(
            <div>
                <h3>当前计数为{this.props.count}</h3>
                <select ref='selectNumber'>
                    <option value='1'>1</option>
                    <option value='2'>2</option>
                    <option value='3'>3</option>
                </select>
                <button onClick={this.increment}>+</button>
                <button onClick={this.decrement}>-</button>
                <button onClick={this.incrementIfOdd}>increment if odd</button>&nbsp;
                <button onClick={this.incrementAsync}>increment asyc</button>&nbsp;
            </div>
        )
    }
}