import React, { Component } from 'react';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';
import { getScheduleOfPatient, commitAppointment,sendRemedy } from '../../../services/userService';
import './ManagePatient.scss';
import { FormattedMessage } from 'react-intl';
import Select from 'react-select';
import * as actions from '../../../store/actions';
import { LANGUAGES, CommonUtils } from '../../../utils';
import DatePicker from '../../../components/Input/DatePicker';
import RemedyModal from './RemedyModal';
import _ from 'lodash';
import LoadingOverlay from 'react-loading-overlay';

class ManageSchedule extends Component {
   constructor(props) {
      super(props);

      this.state = {
         allDoctors: [],
         selectedDoctor: {},
         selectedPatient: '',
         currentDate: new Date().setHours(0, 0, 0, 0),
         allPatients: [],
         fullName: '',
         isOpenModalRemedy: false,
         isShowLoading: false,
      };
   }
   componentDidMount() {
      this.props.fetchAllDoctorRedux();
      if (this.props.userInfo) {
         let { language, userInfo } = this.props;
         let fullName =
            language === LANGUAGES.VI
               ? `${userInfo.lastName} ${userInfo.firstName}`
               : `${userInfo.firstName} ${userInfo.lastName}`;
         this.setState({
            fullName: fullName,
         });
      }
      this.handleSearchPatient();
   }
   componentDidUpdate(prevProps, prevState, snapshot) {
      if (prevProps.allDoctors !== this.props.allDoctors) {
         let dataSelect = this.buildDataInputSelect(this.props.allDoctors);
         this.setState({
            allDoctors: dataSelect,
         });
      }
      if (prevProps.language !== this.props.language) {
         this.props.fetchAllDoctorRedux();

         if (this.props.userInfo) {
            let { language, userInfo } = this.props;
            let fullName =
               language === LANGUAGES.VI
                  ? `${userInfo.lastName} ${userInfo.firstName}`
                  : `${userInfo.firstName} ${userInfo.lastName}`;
            this.setState({
               fullName: fullName,
            });
         }
      }
   }
   handleChangeSelect = async (selectedOption) => {
      this.setState({
         selectedDoctor: selectedOption,
      });
   };
   handleOnChangeDatePicker = (date) => {
      this.setState({
         currentDate: date[0],
      });
   };

   handleSearchPatient = async () => {
      let { selectedDoctor, currentDate } = this.state;
      if (!currentDate) {
         toast.error('Invalid date');
         return;
      }
      // if (!selectedDoctor || _.isEmpty(selectedDoctor)) {
      //    toast.error('Invalid doctor');
      //    return;
      // }
      let formattedDate = new Date(currentDate).getTime();
      // let res = await getScheduleOfPatient(this.state.selectedDoctor.value, formattedDate);
      let res = await getScheduleOfPatient(this.props.userInfo.id, formattedDate);
      console.log(res);
      if (res && res.errCode === 1 && !_.isEmpty(res.data)) {
         toast.success('Search completed');
         this.setState({
            allPatients: res.data,
            selectedDoctor: {},
            currentDate: new Date().setHours(0, 0, 0, 0),
         });
      } else if (res && res.errCode === 1 && _.isEmpty(res.data)) {
         toast.error('Doctor have not patient');
         this.setState({
            allPatients: '',
         });
      } else {
         toast.error(res.errMessage);
      }
   };

   buildDataInputSelect = (inputData) => {
      let results = [];
      let { language } = this.props;
      if (inputData && inputData.length > 0) {
         inputData.map((item, index) => {
            let obj = {};
            let labelVi = `${item.lastName} ${item.firstName} `;
            let labelEn = `${item.firstName} ${item.lastName} `;
            obj.label = language === LANGUAGES.VI ? labelVi : labelEn;
            obj.value = item.id;
            results.push(obj);
         });
      }
      return results;
   };
   handleCommitPatient = async (user, type) => {
      let res = await commitAppointment({
         type: type,
         doctorId: user.doctorId,
         patientId: user.patientId,
         timeType: user.timeType,
         date: user.date,
      });
      if (res && res.errCode === 1) {
         toast.success(res.errMessage);
         await this.handleSearchPatient();
      } else {
         toast.error(res.errMessage);
      }
   };

   handleCloseRemedy = (user) => {
      this.setState({
         isOpenModalRemedy: !this.state.isOpenModalRemedy,
         selectedPatient:user
      });
   };
   handleSendRemedy = async (dataChildren) => {
      this.setState({
         isShowLoading:true
      })
      let res = await sendRemedy(dataChildren);
      if(res && res.errCode===1){
         this.setState({
            isShowLoading:false,
            isOpenModalRemedy:false
         })
         toast.success('Remedy sent successfully')
      }else{
         toast.error('Remedy failed')
      }
   };
   render() {
      let { allPatients } = this.state;
      let { language } = this.props;
      return (
         <div className="manage-patient-container">
            <div className="m-s-title">
               <FormattedMessage id="menu.patient.title" />
            </div>
            <div className="container">
               <div className="row">
                  <div className="col-md-6 form-group">
                     <label>
                        <FormattedMessage id="menu.patient.choose-doctor" />
                     </label>
                     {/* <Select
                        value={this.state.selectedDoctor}
                        onChange={this.handleChangeSelect}
                        options={this.state.allDoctors}
                     /> */}

                     <input className="form-control" type="text" readOnly value={this.state.fullName} />
                  </div>
                  <div className="col-md-6 form-group">
                     <label>
                        <FormattedMessage id="menu.patient.choose-date" />
                     </label>
                     <DatePicker
                        className="form-control"
                        onChange={this.handleOnChangeDatePicker}
                        value={this.state.currentDate}
                        minDate={new Date(new Date().setDate(new Date().getDate() - 1))}
                     />
                  </div>
                  <button className="btn btn-primary btn-save-patient" onClick={() => this.handleSearchPatient()}>
                     <FormattedMessage id="menu.patient.search-info" />
                  </button>
               </div>
               {allPatients && !_.isEmpty(allPatients) && (
                  <div className="patient-table mt-4 mx-2">
                     <table>
                        <thead>
                           <tr>
                              <th>STT</th>
                              <th>Email</th>
                              <th>PhoneNumber</th>
                              <th>Thời gian</th>
                              <th>Address</th>
                              <th>Reason</th>
                              <th>Action</th>
                           </tr>
                        </thead>
                        <tbody>
                           {allPatients &&
                              allPatients.map((user, index) => (
                                 <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{user.User.email}</td>
                                    <td>{user.User.phoneNumber}</td>
                                    <td>
                                       {language === LANGUAGES.VI
                                          ? user.timeTypeDataBooking.valueVi
                                          : user.timeTypeDataBooking.valueEn}
                                    </td>
                                    <td>{user.User.address}</td>
                                    <td>{user.reason}</td>
                                    <td>
                                       <button
                                          className="btn-check"
                                          onClick={() => this.handleCommitPatient(user, 'confirm')}
                                       >
                                          <i className="fas fa-check"></i>
                                       </button>
                                       <button
                                          className="btn-delete"
                                          onClick={() => this.handleCommitPatient(user, 'cancel')}
                                       >
                                          <i className="fas fa-times"></i>
                                       </button>
                                       <button onClick={() => this.handleCloseRemedy(user.User)}>
                                          Gửi hóa đơn
                                       </button>
                                    </td>
                                 </tr>
                              ))}
                        </tbody>
                     </table>
                  </div>
               )}
               <RemedyModal
                  sendRemedy={this.handleSendRemedy}
                  closeRemedy={this.handleCloseRemedy}
                  selectedPatient={this.state.selectedPatient}
                  isOpen={this.state.isOpenModalRemedy}
               />
            </div>
            <LoadingOverlay active={this.state.isShowLoading} spinner text="Sending remedy for patient...">
               
            </LoadingOverlay>
         </div>
      );
   }
}

const mapStateToProps = (state) => {
   return {
      isLoggedIn: state.user.isLoggedIn,
      language: state.app.language,
      allDoctors: state.admin.allDoctors,
      userInfo: state.user.userInfo,
   };
};

const mapDispatchToProps = (dispatch) => {
   return {
      fetchAllDoctorRedux: () => dispatch(actions.fetchAllDoctor()),
   };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageSchedule);
