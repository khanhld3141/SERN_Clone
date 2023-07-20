import React, { Component } from 'react';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import './Specialty.scss';
import { FormattedMessage } from 'react-intl';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import * as action from '../../../store/actions';
import { LANGUAGES } from '../../../utils';

class OutStandingDoctor extends Component {
   constructor(props) {
      super(props);
      this.state = {
         arrDoctors: [],
      };
   }

   componentDidMount() {
      this.props.loadTopDoctors();
   }

   componentDidUpdate(prevProps, prevState, snapshot) {
      if (prevProps.topDoctorsRedux !== this.props.topDoctorsRedux) {
         this.setState({
            arrDoctors: this.props.topDoctorsRedux,
         });
      }
   }
   handleAfterChange = () => {
      // console.log('check slide');
   };
   handleViewDetailDoctor = (doctor) => {
      //cách 2 redirect sang trang detail
      let linkDetail = `/detail-doctor/${doctor.id}`;
      return this.props.history.push(linkDetail);
   };
   render() {
      let arrDoctors = this.state.arrDoctors;
      let { language } = this.props;
      let settings = {
         dots: false,
         infinite: false,
         speed: 500,
         slidesToShow: 4,
         slidesToScroll: 4,
         afterChange: this.handleAfterChange(),
      };
      return (
         <div className='section-specialty'>
            <div className='specialty-content content-unique'>
               <div className="header-title">
                  <span className="header-main-title">
                     <FormattedMessage id="home-page.out-standing-doctor" />
                  </span>
                  <span className="more">
                     <FormattedMessage id="home-page.more-info" />
                  </span>
               </div>
               <Slider {...settings}>
                  {arrDoctors &&
                     arrDoctors.length > 0 &&
                     arrDoctors.map((doctor, index) => {
                        let nameVi = `${doctor.positionData.valueVi}, ${doctor.lastName} ${doctor.firstName} `;
                        let nameEn = `${doctor.positionData.valueEn}, ${doctor.firstName} ${doctor.lastName}`;
                        let imageBase64;
                        if (doctor.image) {
                           if (doctor.image) {
                              imageBase64 = new Buffer(doctor.image, 'base64').toString('binary');
                           }
                        }
                        let linkDetail = `/detail-doctor/${doctor.id}`;
                        return (
                           <Link
                              key={index}
                              className='item-carousel unique'
                              to={linkDetail}
                           >
                              <div className="footer-title">
                                 <div className="image" style={{ backgroundImage: `url(${imageBase64})` }}>
                                 </div>
                                 <div className="main-title">{language === LANGUAGES.VI ? nameVi : nameEn}</div>
                                 <div className='sub-title'>Cơ xương khớp2</div>
                              </div>
                           </Link>
                        );
                     })}
               </Slider>
            </div>
         </div>
      );
   }
}

const mapStateToProps = (state) => {
   return {
      //state luu tren redux
      isLoggedIn: state.user.isLoggedIn,
      topDoctorsRedux: state.admin.topDoctors,
      language: state.app.language,
   };
};

const mapDispatchToProps = (dispatch) => {
   return {
      loadTopDoctors: () => dispatch(action.fetchTopDoctor()),
   };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(OutStandingDoctor));
