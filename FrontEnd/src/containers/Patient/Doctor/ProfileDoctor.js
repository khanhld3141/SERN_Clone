import React, { Component } from 'react';
import { connect } from 'react-redux';
import { LANGUAGES } from '../../../utils';
import { FormattedMessage } from 'react-intl';
import localization from 'moment/locale/vi';
import NumberFormat from 'react-number-format';
import _ from 'lodash';
import moment, { lang } from 'moment';
import './ProfileDoctor.scss';
import { getProfileDoctorById } from '../../../services/userService';
class ProfileDoctor extends Component {
   constructor(props) {
      super(props);
      this.state = {
         dataProfile: '',
      };
   }

   async componentDidMount() {
      let data = await this.getInfoDoctor(this.props.doctorId);
      this.setState({ dataProfile: data });
   }
   getInfoDoctor = async (id) => {
      let result = {};
      if (id) {
         let res = await getProfileDoctorById(id);
         if (res && res.errCode === 1) {
            result = res.data;
         }
      }
      return result;
   };
   async componentDidUpdate(prevProps, prevState, snapshot) {
      if (prevProps.language !== this.props.language) {
      }
      if (this.props.doctorId !== prevProps.doctorId) {
         let data = await this.getInfoDoctor(this.props.doctorId);
         this.setState({ dataProfile: data });
      }
   }
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
         return (
            <>
               <div>
                  {time} - {date}
               </div>
               <div>Miễn phí đặt lịch</div>
            </>
         );
      }
   };
   render() {
      let { language, time } = this.props;
      let { dataProfile } = this.state;
      let nameVi, nameEn;
      if (dataProfile) {
         nameVi = `${dataProfile.positionData.valueVi}, ${dataProfile.lastName} ${dataProfile.firstName} `;
         nameEn = `${dataProfile.positionData.valueEn}, ${dataProfile.firstName} ${dataProfile.lastName}`;
      }
      return (
         <div className="profile-doctor-container">
            <div className="intro-doctor">
               <div
                  className="content-left"
                  style={{
                     backgroundImage: `url(${dataProfile && dataProfile.image ? dataProfile.image : ''})`,
                  }}
               ></div>
               <div className="content-right">
                  <div className="up">
                     {dataProfile && <span>{this.props.language === LANGUAGES.VI ? nameVi : nameEn}</span>}
                  </div>
                  <div className="down">
                     {this.props.isDescription &&
                        dataProfile &&
                        dataProfile.MarkDown &&
                        dataProfile.MarkDown.description && <span>{dataProfile.MarkDown.description}</span>}
                     {dataProfile && dataProfile.DoctorInfo && this.renderTimeBooking(time)}
                  </div>
               </div>
            </div>
            {this.props.isPrice && (
               <div className="price">
                  Gía khám:{' '}
                  {dataProfile && dataProfile.DoctorInfo && language === LANGUAGES.VI && (
                     <NumberFormat
                        value={dataProfile.DoctorInfo.priceTypeData.valueVi}
                        displayType={'text'}
                        thousandSeparator={true}
                        suffix={'VNĐ'}
                     />
                  )}
                  {dataProfile && dataProfile.DoctorInfo && language === LANGUAGES.EN && (
                     <NumberFormat
                        value={dataProfile.DoctorInfo.priceTypeData.valueEn}
                        displayType={'text'}
                        thousandSeparator={true}
                        suffix={'$'}
                     />
                  )}
               </div>
            )}
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

export default connect(mapStateToProps, mapDispatchToProps)(ProfileDoctor);
