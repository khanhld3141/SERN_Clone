import React, { Component } from 'react';
import { connect } from 'react-redux';
import { LANGUAGES } from '../../../utils';
import { FormattedMessage } from 'react-intl';
import Select from 'react-select';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';

import _ from 'lodash';
import * as actions from '../../../store/actions';
import { getProfileDoctorByClinicId } from '../../../services/userService';
import DoctorSchedule from '../Doctor/DoctorSchedule';
import DoctorExtra from '../Doctor/DoctorExtra';
import Header from '../../HomePage/Header';
import './DetailClinic.scss';
import ProfileDoctor from '../Doctor/ProfileDoctor';
class Clinic extends Component {
   constructor(props) {
      super(props);
      this.state = {
         arrDoctor: [],
         specialty: '',
         setHeight: '200px',
      };
   }

   async componentDidMount() {
      if (this.props.match && this.props.match.params && this.props.match.params.id) {
         let id = this.props.match.params.id;
         console.log(id);
         let res = await getProfileDoctorByClinicId(id);
         console.log(res);
         if (res && res.errCode === 1) {
            this.setState({
               arrDoctor: res.data,
            });
         }
      }
   }
   componentDidUpdate(prevProps, prevState, snapshot) {
      if (prevProps.language !== this.props.language) {
      }
   }

   handleSetHeight = () => {
      let height = this.state.setHeight === 'auto' ? '200px' : 'auto';
      this.setState({
         setHeight: height,
      });
   };
   render() {
      let { arrDoctor } = this.state;
      console.log(arrDoctor);
      return (
         <div className="detail-specialty-container">
            <Header />

            <div className="detail-specialty-content">
               {arrDoctor && !_.isEmpty(arrDoctor) && (
                  <div
                     className="bg-specialty"
                     style={{ backgroundImage: `url(${arrDoctor.image})`, height: this.state.setHeight }}
                  >
                     <div className="bg-black">
                        <div
                           dangerouslySetInnerHTML={{ __html: arrDoctor.descriptionHTML }}
                           className="d-s-description"
                        ></div>
                        <div className="more-info-spec" onClick={() => this.handleSetHeight()}>
                           {this.state.setHeight === 'auto' ? <FormattedMessage id="patient.less"/> : <FormattedMessage id="patient.more"/>}
                        </div>
                     </div>
                  </div>
               )}
               <div className="list-doctor">
                  {arrDoctor.doctorClinic &&
                     arrDoctor.doctorClinic.length > 0 &&
                     arrDoctor.doctorClinic.map((item, index) => {
                        let linkProfile = `/detail-doctor/${item.doctorId}`;
                        return (
                           <div key={index} className="box-doctor">
                              <div className="dt-content-left">
                                 <ProfileDoctor isPrice={false} doctorId={item.doctorId} isDescription={true} />

                                 <Link to={linkProfile}>
                                    <div className="spec-more-info"><FormattedMessage id="patient.more"/></div>
                                 </Link>
                              </div>
                              <div className="dt-content-right">
                                 <div className="schedule-doctor">
                                    <DoctorSchedule doctorIdFromParent={item.doctorId} />
                                 </div>
                                 <div className="extra-doctor">
                                    <DoctorExtra doctorIdFromParent={item.doctorId} />
                                 </div>
                              </div>
                           </div>
                        );
                     })}
               </div>
            </div>
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
   return {
      fetchProvinceStart: () => dispatch(actions.fetchProvinceStart()),
   };
};

export default connect(mapStateToProps, mapDispatchToProps)(Clinic);
