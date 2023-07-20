import React, { Component } from 'react';
import { connect } from 'react-redux';
import './DoctorSchedule.scss';
import moment from 'moment/moment';
import localization from 'moment/locale/vi';
import { LANGUAGES } from '../../../utils';
import { getScheduleDoctorByDateService } from '../../../services/userService';
import { FormattedMessage } from 'react-intl';
import BookingModal from './Modal/BookingModal';
class DoctorSchedule extends Component {
   constructor(props) {
      super(props);
      this.state = {
         allDays: [],
         allTimes: [],
         isOpenModalBooking: false,
         dataScheduleTimeModal: '',
      };
   }
   getArrDays = () => {
      let { language } = this.props;
      //   console.log('moment vi', moment(new Date()).format('dddd - DD/MM'));
      //   console.log('moment en', moment(new Date()).locale('en').format('ddd - DD/MM'));
      let arrDate = [];
      for (let i = 0; i < 7; i++) {
         let obj = {};
         if (language === LANGUAGES.VI) {
            if (i === 0) {
               let day = moment(new Date()).format('DD/MM');
               let today = `Hôm nay - ${day}`;
               obj.label = today;
            } else {
               obj.label = moment(new Date()).add(i, 'days').format('dddd - DD/MM');
            }
         } else {
            if (i === 0) {
               let day = moment(new Date()).locale('en').format('DD/MM');
               let today = `Today - ${day}`;
               obj.label = today;
            } else {
               obj.label = moment(new Date()).add(i, 'days').locale('en').format('ddd - DD/MM');
            }
         }
         obj.value = moment(new Date()).add(i, 'days').startOf('day').valueOf();
         arrDate.push(obj);
      }
      return arrDate;
   };
   handleOnChangeSelect = async (e) => {
      if (this.props.doctorIdFromParent && this.props.doctorIdFromParent !== -1) {
         let doctorId = this.props.doctorIdFromParent;
         let date = e.target.value;
         let res = await getScheduleDoctorByDateService(doctorId, date);
         if (res && res.errCode === 1) {
            this.setState({
               allTimes: res.data,
            });
         }
      }
   };
   async componentDidMount() {
      let { language } = this.props;
      let allDays = this.getArrDays();
      if (allDays && allDays.length > 0) {
         // console.log('allDays', allDays[0].value);
         let res = await getScheduleDoctorByDateService(this.props.doctorIdFromParent, allDays[0].value);
         this.setState({
            allDays: allDays,
            allTimes: res.data ? res.data : [],
         });
      }
      this.setState({
         allDays: allDays,
      });
   }
   async componentDidUpdate(prevProps, prevState, snapshot) {
      if (prevProps.language !== this.props.language) {
         let allDays = this.getArrDays();
         this.setState({
            allDays: allDays,
         });
      }
      if (prevProps.doctorIdFromParent !== this.props.doctorIdFromParent) {
         let allDays = this.getArrDays();
         if (allDays && allDays.length > 0) {
            // console.log('allDays', allDays[0].value);
            let res = await getScheduleDoctorByDateService(this.props.doctorIdFromParent, allDays[0].value);
            this.setState({
               allDays: allDays,
               allTimes: res.data ? res.data : [],
            });
         }
         this.setState({
            allDays: allDays,
         });
      }
   }
   handleScheduleTime = (time) => {
      this.setState({
         isOpenModalBooking: true,
         dataScheduleTimeModal: time,
      });
   };
   closeBookingModal = () => {
      this.setState({
         isOpenModalBooking: false,
      });
   };
   render() {
      let { allDays, allTimes, isOpenModalBooking, dataScheduleTimeModal } = this.state;
      let { language } = this.props;
      return (
         <>
            <div className="doctor-schedule-container">
               <div className="all-schedule">
                  <select onChange={(e) => this.handleOnChangeSelect(e)}>
                     {allDays &&
                        allDays.length > 0 &&
                        allDays.map((day, index) => (
                           <option value={day.value} key={index}>
                              {day.label}
                           </option>
                        ))}
                  </select>
                  <div className="schedule-examination">
                     <span className="icon-schedule">
                        <i class="fas fa-calendar-alt"></i>
                     </span>
                     <span className="examination-content">
                        <FormattedMessage id="manage-schedule.schedule-examination" />
                     </span>
                  </div>
                  <div className="schedule-list">
                     {allTimes && allTimes.length > 0 && (
                        <>
                           <div className="schedule-include">
                              {allTimes.map((time, index) => {
                                 let schedule =
                                    language === LANGUAGES.VI ? time.timeTypeData.valueVi : time.timeTypeData.valueEn;
                                 return (
                                    <button
                                       onClick={() => this.handleScheduleTime(time)}
                                       key={index}
                                       className="schedule-item"
                                    >
                                       {schedule}
                                    </button>
                                 );
                              })}
                           </div>
                           <span className="book-free">
                              <FormattedMessage id="manage-schedule.choose" /> <i class="fas fa-hand-point-up"></i>{' '}
                              <FormattedMessage id="manage-schedule.book" />
                           </span>
                        </>
                     )}
                     {allTimes && allTimes.length === 0 && (
                        <span className="no-schedule">
                           <FormattedMessage id="manage-schedule.no-schedule" />
                        </span>
                     )}
                  </div>
               </div>
               <div className="all-available-time"></div>
            </div>

            {dataScheduleTimeModal && (
               <BookingModal
                  dataScheduleTimeModal={dataScheduleTimeModal}
                  closeBookingModal={this.closeBookingModal}
                  isOpenModal={isOpenModalBooking}
               />
            )}
         </>
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

export default connect(mapStateToProps, mapDispatchToProps)(DoctorSchedule);
