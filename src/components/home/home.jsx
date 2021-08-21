import React,{Component} from 'react'
import { Carousel } from 'antd';
import './home.less'
export default class Home extends Component{
    render(){
        const contentStyle = {
            height: '500px',
            color: '#fff',
            lineHeight: '160px',
            textAlign: 'center',
            background: 'black',
          };
        return(
            <div className='home'>
                <Carousel autoplay>
                <div>
                <h3 style={contentStyle}>1</h3>
                </div>
                <div>
                <h3 style={contentStyle}>2</h3>
                </div>
                <div>
                <h3 style={contentStyle}>3</h3>
                </div>
                <div>
                <h3 style={contentStyle}>4</h3>
                </div>
                </Carousel>
            </div>
        )
    }
}
