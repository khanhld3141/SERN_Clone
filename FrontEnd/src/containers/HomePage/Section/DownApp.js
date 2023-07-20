import React, { Component } from 'react';

import { connect } from 'react-redux';
import './DownApp.scss';
import { FormattedMessage } from 'react-intl';
import images from '../../../assets/images';
class DownApp extends Component {
   render() {
      return (
         <div className="app-container">
            <div className="app-content">
               <div className="app-mobile">
                  <img src={images.bookingapp} alt=" " />
               </div>
               <div className="information-app">
                  <div className="title-header">Tải ứng dụng BookingCare</div>
                  <div className="information-select">
                     <span className="icon">
                        <i class="fas fa-check"></i>
                     </span>
                     <span className="description">Đặt khám nhanh hơn</span>
                  </div>
                  <div className="information-select">
                     <span className="icon">
                        <i class="fas fa-check"></i>
                     </span>
                     <span className="description">Nhận thông báo từ hệ thống</span>
                  </div>
                  <div className="information-select">
                     <span className="icon">
                        <i class="fas fa-check"></i>
                     </span>
                     <span className="description">Nhận hướng dẫn đi khám chi tiết</span>
                  </div>
                  <div className="information-download">
                     <div className="gg-download">
                        <img src={images.GGdownload} alt="" />
                     </div>
                     <div className="app-download">
                        <img src={images.Appdownload} alt="" />
                     </div>
                  </div>
                  <a className="website" href=" ">
                     Hoặc mở liên kết:<span className='link'> https://bookingcare.vn/app</span>
                  </a>
               </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(DownApp);
