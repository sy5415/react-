import React, { Component } from 'react';
import { EditorState, convertToRaw,ContentState,} from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'
import './css/rich_text.less'
export default class RichText extends Component {
  state = {
    editorState: EditorState.createEmpty(),//构建一个初始化状态的编辑器
  }

  onEditorStateChange= (editorState) => {
    this.setState({
      editorState,
    });
  };
  getRichText=()=>{
    const {editorState}=this.state
    return draftToHtml(convertToRaw(editorState.getCurrentContent()))
}
//富文本编辑器的回显
setRichText=(html)=>{
  const contentBlock=htmlToDraft(html)
  if(contentBlock){
    const contentState=ContentState.createFromBlockArray(contentBlock.contentBlocks);
    const editorState=EditorState.createWithContent(contentState);
    this.setState({editorState})
  }
}
  render() {
    const { editorState } = this.state;
    return (
      <div>
        <Editor
          editorState={editorState}
          wrapperClassName="demo-wrapper"
          editorClassName="demo-editor"
          onEditorStateChange={this.onEditorStateChange}
        />
        
      </div>
    );
  }
}