import React, { Component } from 'react';
import { connect } from 'react-redux';
import { LANGUAGES } from '../../../utils';
import { FormattedMessage } from 'react-intl';
import { CommonUtils } from '../../../utils';
import { createNewClinic } from '../../../services/userService';
import './MedicalFacilities.scss';
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
// import style manually
import 'react-markdown-editor-lite/lib/index.css';
import { toast } from 'react-toastify';

const mdParser = new MarkdownIt();
class MedicalFacilities extends Component {
   constructor(props) {
      super(props);
      this.state = {
         name: '',
         address:'',
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
   handleOnChangeInput = (e,type) => {
      let stateCopy = { ...this.state };
      stateCopy[type] = e.target.value;
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
   handleSaveClinic = async () => {
      let res = await createNewClinic(this.state);
      if (res && res.errCode === 1) {
         toast.success('Create Clinic Successfully');
      } else {
         toast.error(res.errMessage);
      }
   };
   render() {

      return (
         <div className="manage-clinic-container">
            <div className="m-c-title">Quản lí phòng khám</div>
            <div className="m-c-input form-group row">
               <div className="col-md-6">
                  <label>Tên phòng khám</label>
                  <input
                     onChange={(e) => this.handleOnChangeInput(e,'name')}
                     value={this.state.name}
                     className="form-control"
                     type="text"
                  />
               </div>
               <div className="col-md-6">
                  <label>Địa chỉ phòng khám</label>
                  <input
                     onChange={(e) => this.handleOnChangeInput(e,'address')}
                     value={this.state.address}
                     className="form-control"
                     type="text"
                  />
               </div>

               <div className="mt-2 col-md-3">
                  <label>Ảnh phòng khám</label>
                  <input
                     onChange={(e) => this.handleOnChangeImage(e)}
                     className="input-file form-control"
                     type="file"
                  />
               </div>
            </div>
            <div className="manage-clinic-editor">
               <MdEditor
                  style={{ height: '400px' }}
                  renderHTML={(text) => mdParser.render(text)}
                  onChange={this.handleEditorChange}
                  value={this.state.descriptionMarkdown}
               />
            </div>
            <button onClick={() => this.handleSaveClinic()} className="btn-save-c">
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

export default connect(mapStateToProps, mapDispatchToProps)(MedicalFacilities);
