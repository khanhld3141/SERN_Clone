import React, { Component } from 'react';
import { connect } from 'react-redux';
import { LANGUAGES } from '../../../utils';
import { FormattedMessage } from 'react-intl';
import { CommonUtils } from '../../../utils';
import { createNewSpecialty } from '../../../services/userService';
import './ManageSpecialty.scss';
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
// import style manually
import 'react-markdown-editor-lite/lib/index.css';
import { toast } from 'react-toastify';

const mdParser = new MarkdownIt();
class ManageSpecialty extends Component {
   constructor(props) {
      super(props);
      this.state = {
         name: '',
         imageBase64: '',
         descriptionHTML: '',
         descriptionMarkdown: '',
      };
   }

   async componentDidMount() {}
   componentDidUpdate(prevProps, prevState, snapshot) {
      if (prevProps.language !== this.props.language) {
      }
   }
   handleOnChangeInputName = (e) => {
      let stateCopy = { ...this.state };
      stateCopy.name = e.target.value;
      this.setState({
         ...stateCopy,
      });
   };
   handleEditorChange = ({ html, text }) => {
      this.setState({
         descriptionMarkdown: text,
         descriptionHTML: html,
      });
   };
   handleOnChangeImage = async (e) => {
      let file = e.target.files[0];
      if (file) {
         let base64 = await CommonUtils.toBase64(file);
         this.setState({
            imageBase64: base64,
         });
      }
   };
   handleSaveSpecialty = async () => {
      let res = await createNewSpecialty(this.state);
      if (res && res.errCode === 1) {
         toast.success('Create Specialty Successfully');
      } else {
         toast.error(res.errMessage);
      }
   };
   render() {
      return (
         <div className="manage-specialty-container">
            <div className="m-s-title">Quản lí chuyên khoa</div>
            <div className="m-s-input form-group row">
               <div className="col-md-6">
                  <label>Tên chuyên khoa</label>
                  <input
                     onChange={(e) => this.handleOnChangeInputName(e)}
                     value={this.state.name}
                     className="form-control"
                     type="text"
                  />
               </div>
               <div className="col-md-3">
                  <label>Ảnh chuyên khoa</label>
                  <input
                     onChange={(e) => this.handleOnChangeImage(e)}
                     className="input-file form-control"
                     type="file"
                  />
               </div>
            </div>
            <div className="manage-specialty-editor">
               <MdEditor
                  style={{ height: '400px' }}
                  renderHTML={(text) => mdParser.render(text)}
                  onChange={this.handleEditorChange}
                  value={this.state.descriptionMarkdown}
               />
            </div>
            <button onClick={() => this.handleSaveSpecialty()} className="btn-save-s">
               {' '}
               Save
            </button>
         </div>
      );
   }
}

const mapStateToProps = (state) => {
   return {
      language: state.app.language,
   };
};

const mapDispatchToProps = (dispatch) => {
   return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageSpecialty);
