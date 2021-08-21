import React, { Component } from 'react'
import { Upload, Modal ,message} from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { BASE_URL}  from '../../config/index'
import {reqDeletePicture} from '../../api/index'
//将文件转换成base64编码形式
function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}

export default class PicturesWall extends Component {
  state = {
    previewVisible: false,//是否展示预览窗
    previewImage: '',//要预览的url地址
    previewTitle: '',
    fileList: [
     
    ],
  };
  //关闭预览窗
  handleCancel = () => this.setState({ previewVisible: false });
  //展示预览窗
  handlePreview = async file => {
    //如果没有url地址也没有base64,那么调用如下方法把图片转换成base64
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }

    this.setState({
      previewImage: file.url || file.preview,
      previewVisible: true,
      previewTitle: file.name || file.url.substring(file.url.lastIndexOf('/') + 1),
    });
  };
  //当图片状态发生改变时的回调
  handleChange = async({ fileList,file}) =>{
    
    if(file.status==="done"){
      fileList[fileList.length-1].url=file.response.data.url
      fileList[fileList.length-1].name=file.response.data.name
    }
    this.setState({ fileList });
    if(file.status==="removed"){
      let result=await reqDeletePicture(file.name)
      const {status,msg}=result
      if(status===0){message.success('删除图片成功')}
      else{message.error(msg)}
    }
  }
  //自己写的方法从fileList中提取出所有商品对应的图片名字，构建一个数组。供新增商品使用
  getImgArr=()=>{
    let result=[]
    this.state.fileList.forEach((item)=>{
      result.push(item.name)
    })
    return result
  }
  //点击修改是获取图片展示缩略图的方法要获取图片地址
  setImgArr=(imgArr)=>{
    let fileList=[]
    imgArr.forEach((item,index)=>{
      fileList.push({uid:-index,name:item,url:`${BASE_URL}/upload/${item}`})
    })
    this.setState({fileList})
  }
  
  render() {
    const { previewVisible, previewImage, fileList, previewTitle } = this.state;
    const uploadButton = (
      <div>
        <PlusOutlined />
        <div style={{ marginTop: 8 }}>点击此处上传</div>
      </div>
    );
    return (
      <>
        <Upload
          action={`${BASE_URL}/manage/img/upload`}
          listType="picture-card"
          fileList={fileList}
          onPreview={this.handlePreview}
          onChange={this.handleChange}
          method='post'
          name='image'
        >
          {/* 上传图片大于一张过后隐藏upload组件 */}
          {fileList.length >= 2 ? null : uploadButton}
        </Upload>
        <Modal
          visible={previewVisible}
          title={previewTitle}
          footer={null}
          onCancel={this.handleCancel}
        >
          <img alt="example" style={{ width: '100%' }} src={previewImage} />
        </Modal>
      </>
    );
  }
}
