import React from 'react';
import ReactDOM from 'react-dom';
//路由需要的
import {BrowserRouter} from 'react-router-dom'
import App from './App.js'
//redux需要的最外层标签
import {Provider} from 'react-redux'
import store from './redux/store'
ReactDOM.render(
<Provider store={store}>
  <BrowserRouter>
    <App/>
  </BrowserRouter>
</Provider>
,document.getElementById('root'));
