import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import { toast } from 'react-toastify';

import './ManageSchedule.scss';
import { FormattedMessage } from 'react-intl';
import Select from 'react-select';
import * as actions from '../../../store/actions';
import { LANGUAGES, dateFormat } from '../../../utils';
import DatePicker from '../../../components/Input/DatePicker';
import _ from 'lodash';
import { saveBulkScheduleService } from '../../../services/userService';
class ManageSchedule extends Component {
   constructor(props) {
      super(props);

      this.state = {
         allDoctors: [],
         selectedDoctor: {},
         currentDate: (new Date().setHours(0,0,0,0)),
         rangeTime: [],
      };
   }
   componentDidMount() {
      this.props.fetchAllDoctorRedux();
      this.props.fetchAllScheduleTimeRedux();
   }
   componentDidUpdate(prevProps, prevState, snapshot) {
      if (prevProps.allDoctors !== this.props.allDoctors) {
         let dataSelect = this.buildDataInputSelect(this.props.allDoctors);
         this.setState({
            allDoctors: dataSelect,
         });
      }
      if (prevProps.allScheduleTime !== this.props.allScheduleTime) {
         let data = this.props.allScheduleTime;
         if (data && data.length > 0) {
            data = data.map((item) => {
               item.isSelected = false;
               return item;
            });
         }
         this.setState({
            rangeTime: data,
         });
      }
      // if (prevProps.language !== this.props.language) {
      //    //chuyển language
      //    let dataSelect = this.buildDataInputSelect(this.props.allDoctors);
      //    this.setState({
      //       allDoctors: dataSelect,
      //    });
      // }
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
   handleClickButtonTime = (item) => {
      item.isSelected = !item.isSelected;
      this.setState({
         rangeTime: this.state.rangeTime,
      });
   };
   handleSaveSchedule = async () => {
      let { rangeTime, selectedDoctor, currentDate } = this.state;
      console.log('current date',currentDate);
      let results = [];
      if (!currentDate) {
         toast.error('Invalid date');
         return;
      }
      if (!selectedDoctor || _.isEmpty(selectedDoctor)) {
         toast.error('Invalid doctor');
         return;
      }
      let formattedDate = new Date(currentDate).getTime();
      console.log('date',formattedDate);
      if (rangeTime && rangeTime.length > 0) {
         let selectedTime = rangeTime.filter((item) => item.isSelected === true);
         if (selectedTime && selectedTime.length > 0) {
            selectedTime.map((schedule) => {
               let obj = {};
               obj.doctorId = selectedDoctor.value;
               obj.date = formattedDate;
               obj.timeType = schedule.key;
               results.push(obj);
            });
         } else {
            toast.error('Invalid selected time');
         }
         console.log('check results', results);
      }

      let res = await saveBulkScheduleService({
         arrSchedule: results,
         doctorId: selectedDoctor.value,
         date: formattedDate,
      });
      if(res && res.errCode===1){
         toast.success('Schedule updated successfully')
      }
      //reset sau khi thêm thông tin thành công
      let data = this.props.allScheduleTime;
      if (data && data.length > 0) {
         data = data.map((item) => {
            item.isSelected = false;
            return item;
         });
      }
      this.setState({
         rangeTime: data,
         selectedDoctor: {},
         currentDate: (new Date().setHours(0,0,0,0)),
      });

      console.log('check results', res);
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
   render() {
      let { rangeTime } = this.state;
      let { language } = this.props;
      return (
         <div className="manage-schedule-container">
            <div className="m-s-title">
               <FormattedMessage id="manage-schedule.title" />
            </div>
            <div className="container">
               <div className="row">
                  <div className="col-md-6 form-group">
                     <label>
                        <FormattedMessage id="manage-schedule.choose-doctor" />
                     </label>
                     <Select
                        value={this.state.selectedDoctor}
                        onChange={this.handleChangeSelect}
                        options={this.state.allDoctors}
                     />
                  </div>
                  <div className="col-md-6 form-group">
                     <label>
                        <FormattedMessage id="manage-schedule.choose-date" />
                     </label>
                     <DatePicker
                        className="form-control"
                        onChange={this.handleOnChangeDatePicker}
                        value={this.state.currentDate}
                        minDate={ new Date(new Date().setDate(new Date().getDate()-1))}
                     />
                  </div>
                  <div className="col-md-12 pick-hour-container">
                     {rangeTime &&
                        rangeTime.length > 0 &&
                        rangeTime.map((item, index) => {
                           let bg = item.isSelected === true ? 'orange' : '';
                           return (
                              <button
                                 onClick={() => this.handleClickButtonTime(item)}
                                 className="btn btn-schedule"
                                 key={index}
                                 style={{ backgroundColor: bg }}
                              >
                                 {language === LANGUAGES.VI ? item.valueVi : item.valueEn}
                              </button>
                           );
                        })}
                  </div>
                  <button className="btn btn-primary btn-save-schedule" onClick={() => this.handleSaveSchedule()}>
                     <FormattedMessage id="manage-schedule.save-info" />
                  </button>
               </div>
            </div>
         </div>
      );
   }
}

const mapStateToProps = (state) => {
   return {
      isLoggedIn: state.user.isLoggedIn,
      language: state.app.language,
      allDoctors: state.admin.allDoctors,
      allScheduleTime: state.admin.allScheduleTime,
   };
};

const mapDispatchToProps = (dispatch) => {
   return {
      fetchAllDoctorRedux: () => dispatch(actions.fetchAllDoctor()),
      fetchAllScheduleTimeRedux: () => dispatch(actions.fetchAllScheduleTime()),
   };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageSchedule);
