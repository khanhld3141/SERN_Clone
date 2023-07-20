import React, { Component } from 'react';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import './Specialty.scss';
import { FormattedMessage } from 'react-intl';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { getAllClinic } from '../../../services/userService';
class MedicalFacilities extends Component {
   constructor(props) {
      super(props);
      this.state = {
         arrClinic: [],
      };
   }

   async componentDidMount() {
      let res = await getAllClinic();
      if (res && res.errCode === 1) {
         this.setState({
            arrClinic: res.data,
         });
      }
   }

   componentDidUpdate(prevProps, prevState, snapshot) {
      if (prevProps.arrClinic !== this.props.arrClinic) {
      }
   }
   handleAfterChange = () => {
      // console.log('check slide');
   };
   render() {
      let arrClinic = this.state.arrClinic;
      let settings = {
         dots: false,
         infinite: false,
         speed: 500,
         slidesToShow: 4,
         slidesToScroll: 4,
         afterChange: this.handleAfterChange(),
      };
      return (
         <div className="section-specialty bg">
            <div className="specialty-content">
               <div className="header-title">
                  <span className="header-main-title">
                     <FormattedMessage id="home-page.medical-facilities" />
                  </span>
                  <span className="more">
                     <FormattedMessage id="home-page.more-info" />
                  </span>
               </div>
               <Slider {...settings}>
                  {arrClinic &&
                     arrClinic.length > 0 &&
                     arrClinic.map((clinic, index) => {
                        let linkDetail = `/detail-clinic/${clinic.id}`;
                        return (
                           <Link key={index} className="item-carousel" to={linkDetail}>
                              <div className="footer-title">
                                 <div className="image" style={{ backgroundImage: `url(${clinic.image})` }}></div>
                                 <div className="main-title">{clinic.name}</div>
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
      language: state.app.language,
   };
};

const mapDispatchToProps = (dispatch) => {
   return {};
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MedicalFacilities));


