import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { Modal } from 'reactstrap';
import { toast } from 'react-toastify';
import moment from 'moment';
import localization from 'moment/locale/vi';
import _ from 'lodash';

import DatePicker from '../../../../components/Input/DatePicker';
import * as actions from '../../../../store/actions';
import ProfileDoctor from '../ProfileDoctor';
import Select from 'react-select';
import { postAppointment } from '../../../../services/userService';
import './BookingModal.scss';
import { LANGUAGES } from '../../../../utils';
class BookingModal extends Component {
   constructor(props) {
      super(props);
      this.state = {
         fullName: '',
         phoneNumber: '',
         email: '',
         address: '',
         reason: '',
         date: new Date().setHours(0, 0, 0, 0),
         genders: '',
         doctorId: '',
         selectedGender: '',
         timeType: '',
      };
   }

   async componentDidMount() {
      this.props.fetchGender();
   }
   buildDataGender = (data) => {
      let result = [];
      let { language } = this.props;
      if (data && data.length > 0) {
         data.map((item) => {
            let obj = {};
            obj.label = language === LANGUAGES.VI ? item.valueVi : item.valueEn;
            obj.value = item.key;
            result.push(obj);
         });
      }
      return result;
   };
   componentDidUpdate(prevProps, prevState, snapshot) {
      if (prevProps.language !== this.props.language) {
         this.setState({
            genders: this.buildDataGender(this.props.genders),
         });
      }
      if (prevProps.genders !== this.props.genders) {
         this.setState({
            genders: this.buildDataGender(this.props.genders),
         });
      }
   }
   handleOnChangeInput = (e, id) => {
      let value = e.target.value;
      let copyState = this.state;
      copyState[id] = value;
      copyState.doctorId = this.props.dataScheduleTimeModal.doctorId;
      this.setState({
         ...copyState,
      });
   };
   handleOnChangeDatePicker = (date) => {
      this.setState({
         date: date[0],
      });
   };
   handleChangeSelect = async (selectedOption) => {
      this.setState({
         selectedGender: selectedOption,
      });
   };
   renderTimeBooking = (timeData) => {
      let { language } = this.props;
      if (timeData && !_.isEmpty(timeData)) {
         let date =
            language === LANGUAGES.VI
               ? moment.unix(+timeData.date / 1000).format('dddd - DD/MM/YYYY')
               : moment
                    .unix(+timeData.date / 1000)
                    .locale('en')
                    .format('ddd - MM/DD/YYYY');
         let time = language === LANGUAGES.VI ? timeData.timeTypeData.valueVi : timeData.timeTypeData.valueEn;
         return `${time} - ${date}`;
      }
      return '';
   };
   buildDoctorName = (data) => {
      let { language } = this.props;
      if (data && !_.isEmpty(data)) {
         let name =
            language === LANGUAGES.VI
               ? `${data.doctorData.lastName} - ${data.doctorData.firstName}`
               : `${data.doctorData.firstName} - ${data.doctorData.lastName}`;

         return name;
      }
      return '';
   };
   validateInput = () => {};
   handleConfirm = async () => {
      //validate input
      let dataDate = new Date(this.state.date).getTime();
      let timeString = this.renderTimeBooking(this.props.dataScheduleTimeModal);
      let nameDoctor = this.buildDoctorName(this.props.dataScheduleTimeModal);
      let res = await postAppointment({
         fullName: this.state.fullName,
         phoneNumber: this.state.phoneNumber,
         email: this.state.email,
         address: this.state.address,
         reason: this.state.reason,
         date: dataDate,
         nameDoctor: nameDoctor,
         timeString: timeString,
         language: this.props.language,
         // address:this.props.dataScheduleTimeModal.addressClinic,
         doctorId: this.state.doctorId,
         selectedGender: this.state.selectedGender.value,
         timeType: this.props.dataScheduleTimeModal.timeType,
      });
      if (res && res.errCode === 1) {
         toast.success('Successfully booking ');
         this.props.closeBookingModal();
      } else {
         toast.error(res.errMessage);
      }

      this.setState({
         fullName: '',
         phoneNumber: '',
         email: '',
         address: '',
         reason: '',
         date: new Date().setHours(0, 0, 0, 0),
         selectedGender: '',
      });
   };
   render() {
      let { doctorId } = this.props.dataScheduleTimeModal;
      let { isOpenModal, closeBookingModal, dataScheduleTimeModal } = this.props;
      return (
         <>
            {doctorId && (
               <Modal className="booking-modal-container" isOpen={isOpenModal} size="lg" centered backdrop>
                  <div className="booking-modal-content">
                     <div className="booking-modal-header">
                        <span className="left">
                           <FormattedMessage id="patient.title" />
                        </span>
                        <span className="right" onClick={closeBookingModal}>
                           <i class="fas fa-times"></i>
                        </span>
                     </div>
                     <div className="booking-modal-body">
                        <div className="doctor-info">
                           <ProfileDoctor isPrice={true} doctorId={doctorId} isDescription={false} time={dataScheduleTimeModal} />
                        </div>

                        <div className="row">
                           <div className="col-md-6 form-group">
                              <label>
                                 <FormattedMessage id="patient.fullName" />
                              </label>
                              <input
                                 className="form-control"
                                 value={this.state.fullName}
                                 onChange={(e) => this.handleOnChangeInput(e, 'fullName')}
                              />
                           </div>
                           <div className="col-md-6 form-group">
                              <label>
                                 <FormattedMessage id="patient.phoneNumber" />
                              </label>
                              <input
                                 className="form-control"
                                 value={this.state.phoneNumber}
                                 onChange={(e) => this.handleOnChangeInput(e, 'phoneNumber')}
                              />
                           </div>
                           <div className="col-md-6 form-group">
                              <label>
                                 <FormattedMessage id="patient.email" />
                              </label>
                              <input
                                 className="form-control"
                                 value={this.state.email}
                                 onChange={(e) => this.handleOnChangeInput(e, 'email')}
                              />
                           </div>
                           <div className="col-md-6 form-group">
                              <label>
                                 <FormattedMessage id="patient.address" />
                              </label>
                              <input
                                 className="form-control"
                                 value={this.state.address}
                                 onChange={(e) => this.handleOnChangeInput(e, 'address')}
                              />
                           </div>
                           <div className="col-md-12 form-group">
                              <label>
                                 <FormattedMessage id="patient.reason" />
                              </label>
                              <input
                                 className="form-control"
                                 value={this.state.reason}
                                 onChange={(e) => this.handleOnChangeInput(e, 'reason')}
                              />
                           </div>
                           <div className="col-md-6 form-group">
                              <label>
                                 <FormattedMessage id="patient.dateExamination" />
                              </label>
                              <DatePicker
                                 className="form-control"
                                 onChange={this.handleOnChangeDatePicker}
                                 value={this.state.date}
                                 minDate={new Date(new Date().setDate(new Date().getDate() - 1))}
                              />
                           </div>
                           <div className="col-md-6 form-group">
                              <label>
                                 <FormattedMessage id="patient.gender" />
                              </label>
                              <Select
                                 value={this.state.selectedGender}
                                 onChange={this.handleChangeSelect}
                                 options={this.state.genders}
                                 placeholder={<FormattedMessage id="patient.choose-gender" />}
                              />
                           </div>
                        </div>
                     </div>
                     <div className="booking-modal-footer">
                        <button className="btn-confirm" onClick={() => this.handleConfirm()}>
                           <FormattedMessage id="patient.confirm" />
                        </button>
                        <button className="btn-cancel" onClick={closeBookingModal}>
                           <FormattedMessage id="patient.cancel" />
                        </button>
                     </div>
                  </div>
               </Modal>
            )}
         </>
      );
   }
}

const mapStateToProps = (state) => {
   return {
      language: state.app.language,
      genders: state.admin.genders,
   };
};

const mapDispatchToProps = (dispatch) => {
   return {
      fetchGender: () => dispatch(actions.fetchGenderStart()),
   };
};

export default connect(mapStateToProps, mapDispatchToProps)(BookingModal);
