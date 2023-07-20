import React, { Component } from 'react';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import './Specialty.scss';
import { FormattedMessage } from 'react-intl';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { getAllSpecialty } from '../../../services/userService';
class PopularSpecialty extends Component {
   constructor(props) {
      super(props);
      this.state = {
         arrSpecialty: [],
      };
   }

   async componentDidMount() {
      let res = await getAllSpecialty();
      if (res && res.errCode === 1) {
         this.setState({
            arrSpecialty: res.data,
         });
      }
   }

   componentDidUpdate(prevProps, prevState, snapshot) {
      if (prevProps.arrSpecialty !== this.props.arrSpecialty) {
      }
   }
   handleAfterChange = () => {
      // console.log('check slide');
   };
   render() {
      let arrSpecialty = this.state.arrSpecialty;
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
                     <FormattedMessage id="home-page.popular-specialty" />
                  </span>
                  <span className="more">
                     <FormattedMessage id="home-page.more-info" />
                  </span>
               </div>
               <Slider {...settings}>
                  {arrSpecialty &&
                     arrSpecialty.length > 0 &&
                     arrSpecialty.map((specialty, index) => {
                        let linkDetail = `/detail-specialty/${specialty.id}`;
                        return (
                           <Link key={index} className="item-carousel" to={linkDetail}>
                              <div className="footer-title">
                                 <div className="image" style={{ backgroundImage: `url(${specialty.image})` }}></div>
                                 <div className="main-title">{specialty.name}</div>
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PopularSpecialty));
