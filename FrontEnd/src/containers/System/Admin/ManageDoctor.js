import React, { Component } from 'react';
import { connect } from 'react-redux';
import './ManageDoctor.scss';
import * as actions from '../../../store/actions';

import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
// import style manually
import 'react-markdown-editor-lite/lib/index.css';
import Select from 'react-select';
import { CRUD_ACTIONS, LANGUAGES } from '../../../utils';
import { getDetailInfoDoctorService } from '../../../services/userService';
import { FormattedMessage } from 'react-intl';
const mdParser = new MarkdownIt();

class ManageDoctor extends Component {
   constructor(props) {
      super(props);
      this.state = {
         //markdown table
         contentMarkDown: '',
         contentHTML: '',
         description: '',
         hasOldData: false,

         //info-table
         listSpecialty: '',
         selectedSpecialty: '',
         listClinic: '',
         selectedClinic: '',
         selectedOption: '',
         listDoctors: '',
         listPayment: '',
         listPrices: '',
         listProvince: '',
         selectedPrice: '',
         selectedPayment: '',
         selectedProvince: '',
         nameClinic: '',
         addressClinic: '',
         note: '',
      };
   }
   handleChangeSelect = async (selectedOption) => {
      this.setState({ selectedOption }, () => console.log(`Option selected:`, this.state.selectedOption));

      let res = await getDetailInfoDoctorService(selectedOption.value);
      let { listPayment, listProvince, listPrices } = this.state;

      if (res && res.errCode === 1 && res.data && res.data.MarkDown) {
         let markdown = res.data.MarkDown;
         if (res.data.DoctorInfo) {
            var { addressClinic, nameClinic, note, paymentId, provinceId, priceId } = res.data.DoctorInfo;
            addressClinic = res.data.DoctorInfo.addressClinic;
            note = res.data.DoctorInfo.note;
            nameClinic = res.data.DoctorInfo.nameClinic;

            paymentId = listPayment.find((item) => {
               return item.value === paymentId;
            });
            provinceId = listProvince.find((item) => {
               return item.value === provinceId;
            });
            priceId = listPrices.find((item) => {
               return item.value === priceId;
            });
         }
         this.setState({
            contentHTML: markdown.contentHTML,
            contentMarkDown: markdown.contentMarkDown,
            description: markdown.description,
            nameClinic: nameClinic,
            addressClinic: addressClinic,
            note: note,
            selectedPayment: paymentId,
            selectedPrice: priceId,
            selectedProvince: provinceId,
            hasOldData: true,
         });
      } else {
         this.setState({
            contentHTML: '',
            contentMarkDown: '',
            description: '',
            selectedPrice: '',
            selectedPayment: '',
            selectedProvince: '',
            nameClinic: '',
            addressClinic: '',
            note: '',
            hasOldData: false,
         });
      }
   };
   handleChangeSelectDoctorInfo = async (selectedOption, name) => {
      let stateName = name.name;
      let stateCopy = { ...this.state };
      stateCopy[stateName] = selectedOption;
      this.setState({
         ...stateCopy,
      });
   };
   handleEditorChange = ({ html, text }) => {
      this.setState({
         contentMarkDown: text,
         contentHTML: html,
      });
   };

   handleSaveContentMarkDown = () => {
      this.props.saveDetailDoctor({
         contentHTML: this.state.contentHTML,
         contentMarkDown: this.state.contentMarkDown,
         description: this.state.description,
         doctorId: this.state.selectedOption.value,
         action: this.state.hasOldData === true ? CRUD_ACTIONS.EDIT : CRUD_ACTIONS.CREATE,

         selectedSpecialty: this.state.selectedSpecialty.value,
         selectedClinic: this.state.selectedClinic.value,
         selectedPrice: this.state.selectedPrice.value,
         selectedPayment: this.state.selectedPayment.value,
         selectedProvince: this.state.selectedProvince.value,
         nameClinic: this.state.nameClinic,
         addressClinic: this.state.addressClinic,
         note: this.state.note,
      });

      this.setState({
         selectedOption: '',
         contentMarkDown: '',
         contentHTML: '',
         description: '',
         hasOldData: '',
      });
   };

   handleOnChangeText = (e, name) => {
      let stateCopy = { ...this.state };
      stateCopy[name] = e.target.value;
      this.setState({
         ...stateCopy,
      });
   };

   buildDataInputSelect = (inputData, type) => {
      let results = [];
      let { language } = this.props;
      if (inputData && inputData.length > 0 && type !== 'specialty') {
         inputData.map((item, index) => {
            let obj = {};
            let labelVi = type === 'user' ? `${item.lastName} ${item.firstName} ` : item.valueVi;
            let labelEn = type === 'user' ? `${item.firstName} ${item.lastName} ` : item.valueEn;
            if (language === LANGUAGES.EN && type === 'price') {
               labelEn += ' USD';
            }
            obj.label = language === LANGUAGES.VI ? labelVi : labelEn;
            let value = type === 'user' ? item.id : item.key;
            obj.value = value;

            results.push(obj);
         });
      }
      if (inputData && inputData.length > 0 && type === 'specialty') {
         inputData.map((item) => {
            let obj = {};
            obj.label = item.name;
            obj.value = item.id;
            results.push(obj);
         });
      }
      return results;
   };

   componentDidMount() {
      this.props.fetchAllDoctorRedux();
      this.props.fetchDoctorPriceStart();
      this.props.fetchPaymentStart();
      this.props.fetchProvinceStart();
      this.props.fetchSpecialtyStart();
      this.props.fetchClinicStart();
   }
   componentDidUpdate(prevProps, prevState, snapshot) {
      if (prevProps.listDoctors !== this.props.listDoctors) {
         let dataSelect = this.buildDataInputSelect(this.props.listDoctors, 'user');
         this.setState({
            listDoctors: dataSelect,
         });
      }
      if (prevProps.listPrices !== this.props.listPrices) {
         let dataSelect = this.buildDataInputSelect(this.props.listPrices, 'price');
         this.setState({
            listPrices: dataSelect,
         });
      }
      if (prevProps.listPayment !== this.props.listPayment) {
         let dataSelect = this.buildDataInputSelect(this.props.listPayment);
         this.setState({
            listPayment: dataSelect,
         });
      }
      if (prevProps.listProvince !== this.props.listProvince) {
         let dataSelect = this.buildDataInputSelect(this.props.listProvince);
         this.setState({
            listProvince: dataSelect,
         });
      }
      if (prevProps.listSpecialty !== this.props.listSpecialty) {
         let dataSelect = this.buildDataInputSelect(this.props.listSpecialty, 'specialty');
         this.setState({
            listSpecialty: dataSelect,
         });
      }
      if (prevProps.listClinic !== this.props.listClinic) {
         let dataSelect = this.buildDataInputSelect(this.props.listClinic, 'specialty');
         this.setState({
            listClinic: dataSelect,
         });
      }
      if (prevProps.language !== this.props.language) {
         //chuyển language
         let doctor = this.buildDataInputSelect(this.props.listDoctors, 'user');
         let price = this.buildDataInputSelect(this.props.listPrices, 'price');
         let payment = this.buildDataInputSelect(this.props.listPayment);
         let province = this.buildDataInputSelect(this.props.listProvince);
         let specialty = this.buildDataInputSelect(this.props.listSpecialty, 'specialty');
         let clinic = this.buildDataInputSelect(this.props.listClinic, 'specialty');

         this.setState({
            listDoctors: doctor,
            listPrices: price,
            listPayment: payment,
            listProvince: province,
            listSpecialty: specialty,
            listClinic: clinic,
         });
      }
   }

   render() {
      console.log(this.state);
      return (
         <div className="container manage-doctor-container">
            <div className="manage-edit-title">
               <FormattedMessage id="admin.manage-doctor.title" />
            </div>
            <div className="more-info">
               <div className="content-left">
                  <label>
                     <FormattedMessage id="admin.manage-doctor.choose-doctor" />
                  </label>
                  <Select
                     value={this.state.selectedOption}
                     onChange={this.handleChangeSelect}
                     options={this.state.listDoctors}
                     placeholder={<FormattedMessage id="admin.manage-doctor.choose-doctor" />}
                  />
               </div>
               <div className="content-right form-group">
                  <label>
                     <FormattedMessage id="admin.manage-doctor.introduction" />
                  </label>
                  <textarea
                     onChange={(e) => this.handleOnChangeText(e, 'description')}
                     value={this.state.description}
                     className="form-control"
                  />
               </div>
            </div>
            <div className="m-d-intro row">
               <div className="col-md-4 form-group">
                  <label>
                     <FormattedMessage id="admin.manage-doctor.choose-price" />
                  </label>
                  <Select
                     value={this.state.selectedPrice}
                     onChange={this.handleChangeSelectDoctorInfo}
                     options={this.state.listPrices}
                     placeholder={<FormattedMessage id="admin.manage-doctor.choose-price" />}
                     name="selectedPrice"
                  />
               </div>
               <div className="col-md-4 form-group">
                  <label>
                     <FormattedMessage id="admin.manage-doctor.choose-province" />
                  </label>
                  <Select
                     value={this.state.selectedProvince}
                     onChange={this.handleChangeSelectDoctorInfo}
                     options={this.state.listProvince}
                     placeholder={<FormattedMessage id="admin.manage-doctor.choose-province" />}
                     name="selectedProvince"
                  />
               </div>
               <div className="col-md-4 form-group">
                  <label>
                     <FormattedMessage id="admin.manage-doctor.choose-payment" />
                  </label>
                  <Select
                     value={this.state.selectedPayment}
                     onChange={this.handleChangeSelectDoctorInfo}
                     name="selectedPayment"
                     options={this.state.listPayment}
                     placeholder={<FormattedMessage id="admin.manage-doctor.choose-payment" />}
                  />
               </div>
               <div className="col-md-4 form-group">
                  <label>
                     <FormattedMessage id="admin.manage-doctor.name-clinic" />
                  </label>
                  <input
                     onChange={(e) => this.handleOnChangeText(e, 'nameClinic')}
                     value={this.state.nameClinic}
                     className="form-control"
                  />
               </div>
               <div className="col-md-4 form-group">
                  <label>
                     <FormattedMessage id="admin.manage-doctor.choose-address-clinic" />
                  </label>
                  <input
                     onChange={(e) => this.handleOnChangeText(e, 'addressClinic')}
                     value={this.state.addressClinic}
                     className="form-control"
                  />
               </div>
               <div className="col-md-4 form-group">
                  <label>
                     <FormattedMessage id="admin.manage-doctor.note" />
                  </label>
                  <input
                     onChange={(e) => this.handleOnChangeText(e, 'note')}
                     value={this.state.note}
                     className="form-control"
                  />
               </div>

               <div className="col-md-4 form-group">
                  <label>
                     <FormattedMessage id="admin.manage-doctor.choose-specialty" />
                  </label>
                  <Select
                     value={this.state.selectedSpecialty}
                     onChange={this.handleChangeSelectDoctorInfo}
                     name="selectedSpecialty"
                     options={this.state.listSpecialty}
                     placeholder={<FormattedMessage id="admin.manage-doctor.choose-specialty" />}
                  />
               </div>
               <div className="col-md-4 form-group">
                  <label>
                     <FormattedMessage id="admin.manage-doctor.choose-clinic" />
                  </label>
                  <Select
                     value={this.state.selectedClinic}
                     onChange={this.handleChangeSelectDoctorInfo}
                     name="selectedClinic"
                     options={this.state.listClinic}
                     placeholder={<FormattedMessage id="admin.manage-doctor.choose-clinic" />}
                  />
               </div>
            </div>
            <div className="manage-doctor-editor">
               <MdEditor
                  style={{ height: '500px' }}
                  renderHTML={(text) => mdParser.render(text)}
                  onChange={this.handleEditorChange}
                  value={this.state.contentMarkDown}
               />
            </div>
            <button onClick={() => this.handleSaveContentMarkDown()} className="save-info-doctor">
               {this.state.hasOldData === true ? (
                  <FormattedMessage id="admin.manage-doctor.save-info" />
               ) : (
                  <FormattedMessage id="admin.manage-doctor.add-info" />
               )}
            </button>
         </div>
      );
   }
}

const mapStateToProps = (state) => {
   return {
      isLoggedIn: state.user.isLoggedIn,
      language: state.app.language,
      listDoctors: state.admin.allDoctors,
      listPrices: state.admin.doctorPrices,
      listPayment: state.admin.doctorPayments,
      listProvince: state.admin.doctorProvinces,
      listSpecialty: state.admin.specialty,
      listClinic:state.admin.clinic,
   };
};

const mapDispatchToProps = (dispatch) => {
   return {
      fetchAllDoctorRedux: () => dispatch(actions.fetchAllDoctor()),
      fetchDoctorPriceStart: () => dispatch(actions.fetchDoctorPriceStart()),
      fetchPaymentStart: () => dispatch(actions.fetchPaymentStart()),
      fetchProvinceStart: () => dispatch(actions.fetchProvinceStart()),
      fetchSpecialtyStart: () => dispatch(actions.fetchSpecialty()),
      fetchClinicStart: () => dispatch(actions.fetchClinic()),
      saveDetailDoctor: (data) => dispatch(actions.saveDetailDoctor(data)),
   };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageDoctor);
