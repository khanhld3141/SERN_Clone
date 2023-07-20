import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from '../../HomePage/Header';
import './DetailDoctor.scss';
import { LANGUAGES } from '../../../utils';
import { getDetailInfoDoctorService } from '../../../services/userService';
import DoctorSchedule from './DoctorSchedule';
import DoctorExtra from './DoctorExtra';
class DetailDoctor extends Component {
   constructor(props) {
      super(props);
      this.state = {
         detailDoctor: '',
      };
   }
   async componentDidMount() {
      if (this.props.match && this.props.match.params && this.props.match.params.id) {
         let id = this.props.match.params.id;
         let res = await getDetailInfoDoctorService(id);
         if (res && res.errCode === 1) {
            this.setState({
               detailDoctor: res.data,
            });
         }
      }
   }
   async componentDidUpdate(prevProps, prevState, snapshot) {
      if (this.props.doctorId !== prevProps.doctorId) {
         let data = await this.getInfoDoctor(this.props.doctorId);
         this.setState({ dataProfile: data });
      }
   }

   render() {
      let { detailDoctor } = this.state;
      let nameVi, nameEn;
      if (detailDoctor) {
         nameVi = `${detailDoctor.positionData.valueVi}, ${detailDoctor.lastName} ${detailDoctor.firstName} `;
         nameEn = `${detailDoctor.positionData.valueEn}, ${detailDoctor.firstName} ${detailDoctor.lastName}`;
      }
      return (
         <>
            {detailDoctor && (
               <>
                  <Header isShowBanner={false} />
                  <div className="doctor-detail-container">
                     <div className="intro-doctor">
                        <div
                           className="content-left"
                           style={{
                              backgroundImage: `url(${detailDoctor && detailDoctor.image ? detailDoctor.image : ''})`,
                           }}
                        ></div>
                        <div className="content-right">
                           <div className="up">
                              {detailDoctor && <span>{this.props.language === LANGUAGES.VI ? nameVi : nameEn}</span>}
                           </div>
                           <div className="down">
                              {detailDoctor && detailDoctor.MarkDown && detailDoctor.MarkDown.description && (
                                 <span>{detailDoctor.MarkDown.description}</span>
                              )}
                           </div>
                        </div>
                     </div>

                     <div className="schedule-doctor">
                        <div className="content-left">
                           <DoctorSchedule
                              doctorIdFromParent={detailDoctor && detailDoctor.id ? detailDoctor.id : -1}
                           />
                        </div>
                        <div className="content-right">
                           <DoctorExtra doctorIdFromParent={detailDoctor && detailDoctor.id ? detailDoctor.id : -1} />
                        </div>
                     </div>

                     <div className="detail-info-doctor">
                        {detailDoctor && detailDoctor.MarkDown && detailDoctor.MarkDown.contentHTML && (
                           <div dangerouslySetInnerHTML={{ __html: detailDoctor.MarkDown.contentHTML }}></div>
                        )}
                     </div>

                     <div className="comment-doctor"></div>
                  </div>
               </>
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

export default connect(mapStateToProps, mapDispatchToProps)(DetailDoctor);
