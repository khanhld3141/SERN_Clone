import React, { Component } from 'react';
import { connect } from 'react-redux';
import { LANGUAGES } from '../../../utils';
import { FormattedMessage } from 'react-intl';
import Select from 'react-select';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';

import _ from 'lodash';
import * as actions from '../../../store/actions';
import { getAllSpecialty, getProfileDoctorBySpecialtyId } from '../../../services/userService';
import DoctorSchedule from '../Doctor/DoctorSchedule';
import DoctorExtra from '../Doctor/DoctorExtra';
import Header from '../../HomePage/Header';
import './DetailSpecialty.scss';
import ProfileDoctor from '../Doctor/ProfileDoctor';
class Specialty extends Component {
   constructor(props) {
      super(props);
      this.state = {
         arrDoctor: [],
         specialty: '',
         listProvince: [],
         selectedProvince: '',
         setHeight: '200px',
      };
   }

   async componentDidMount() {
      this.props.fetchProvinceStart();
      if (this.props.match && this.props.match.params && this.props.match.params.id) {
         let id = this.props.match.params.id;
         let res = await getProfileDoctorBySpecialtyId(id, 'all');
         if (res && res.errCode === 1) {
            this.setState({
               arrDoctor: res.data,
            });
         }
      }
   }
   componentDidUpdate(prevProps, prevState, snapshot) {
      if (prevProps.language !== this.props.language) {
         let result = this.buildDataInputSelect(this.props.listProvince);
         this.setState({
            listProvince: result,
            selectedProvince: result[0],
         });
      }
      if (this.props.listProvince !== prevProps.listProvince) {
         let result = this.buildDataInputSelect(this.props.listProvince);
         this.setState({
            listProvince: result,
            selectedProvince: result[0],
         });
      }
   }
   handleChangeSelectProvince = async (selectedOption, name) => {
      let id = this.props.match.params.id;
      let res = await getProfileDoctorBySpecialtyId(id, selectedOption.value);
      console.log('res', res);
      if (res && res.errCode === 1) {
         let stateName = name.name;
         let stateCopy = { ...this.state };
         stateCopy[stateName] = selectedOption;
         stateCopy.arrDoctor = res.data;
         this.setState({
            ...stateCopy,
         });
      }
      console.log('selected', this.state.arrDoctor);
   };
   buildDataInputSelect = (inputData) => {
      let { language } = this.props;
      let results = [];
      if (inputData && inputData.length > 0) {
         let label = language === LANGUAGES.VI ? 'Toàn quốc' : 'All';
         let value = 'all';
         results[0] = { label: label, value: value };

         inputData.map((item, index) => {
            let obj = {};
            let labelVi = item.valueVi;
            let labelEn = item.valueEn;
            obj.label = language === LANGUAGES.VI ? labelVi : labelEn;
            let value = item.key;
            obj.value = value;
            results.push(obj);
         });
      }
      return results;
   };
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
                  <div className="select-province col-md-2 form-group">
                     <Select
                        value={this.state.selectedProvince}
                        onChange={this.handleChangeSelectProvince}
                        options={this.state.listProvince}
                        placeholder={<FormattedMessage id="admin.manage-doctor.choose-province" />}
                        name="selectedProvince"
                     />
                  </div>
                  {arrDoctor.doctorSpecialty &&
                     arrDoctor.doctorSpecialty.length > 0 &&
                     arrDoctor.doctorSpecialty.map((item, index) => {
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
      listProvince: state.admin.doctorProvinces,
   };
};

const mapDispatchToProps = (dispatch) => {
   return {
      fetchProvinceStart: () => dispatch(actions.fetchProvinceStart()),
   };
};

export default connect(mapStateToProps, mapDispatchToProps)(Specialty);
