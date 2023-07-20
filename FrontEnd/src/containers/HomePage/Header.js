import React, { Component } from 'react';

import { connect } from 'react-redux';
import './Header.scss';
import images from '../../assets/images/index.js';
import { FormattedMessage } from 'react-intl';
import { LANGUAGES } from '../../utils/constant.js';
import { changeLanguageApp } from '../../store/actions';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';

class Header extends Component {
   changeLanguage = (language) => {
      this.props.changeLanguageAppRedux(language);
   };

   render() {
      let language = this.props.language;
      return (
         <React.Fragment>
            <div className="home-header-container">
               <div className="home-header-content">
                  <div className="left-content">
                     <div className="bars-button">
                        <i class="fas fa-bars"></i>
                     </div>
                     <Link className="logo" to="/home">
                        <img src={images.logo} alt="logo" />
                     </Link>
                  </div>
                  <div className="centre-content">
                     <ul className="list-content">
                        <li className="content-item">
                           <a href=" ">
                              <FormattedMessage id="home-header.speciality" />
                              <span className="note-content">
                                 <FormattedMessage id="home-header.searchDoctor" />
                              </span>
                           </a>
                        </li>
                        <li className="content-item">
                           <a href=" ">
                              <FormattedMessage id="home-header.healthy-facility" />
                              <span className="note-content">
                                 <FormattedMessage id="home-header.select-room" />
                              </span>
                           </a>
                        </li>
                        <li className="content-item">
                           <a href=" ">
                              <FormattedMessage id="home-header.doctor" />
                              <span className="note-content">
                                 <FormattedMessage id="home-header.select-doctor" />
                              </span>
                           </a>
                        </li>
                        <li className="content-item">
                           <a href=" ">
                              <FormattedMessage id="home-header.package" />
                              <span className="note-content">
                                 <FormattedMessage id="home-header.package-all" />
                              </span>
                           </a>
                        </li>
                     </ul>
                  </div>
                  <div className="right-content">
                     <div className="content-support">
                        <span className="icon">
                           {' '}
                           <i class="fas fa-question-circle"></i>
                        </span>
                        <span className="support">
                           <FormattedMessage id="home-header.support" />
                        </span>
                     </div>
                     <a className="tel" href=" ">
                        090 352 6144
                     </a>
                  </div>
                  <div className="language">
                     <span
                        onClick={() => this.changeLanguage(LANGUAGES.VI)}
                        className={language === LANGUAGES.VI ? 'lang active' : 'lang'}
                     >
                        VI
                     </span>
                     <span
                        onClick={() => this.changeLanguage(LANGUAGES.EN)}
                        className={language === LANGUAGES.EN ? 'lang active' : 'lang'}
                     >
                        EN
                     </span>
                  </div>
               </div>
            </div>
            {this.props.isShowBanner == true && (
               <div className="home-header-banner">
                  <div className="background-black">
                     <h1 className="title-banner">
                        <FormattedMessage id="home-banner.title-1" />
                        <br />
                        <p>
                           <FormattedMessage id="home-banner.title-2" />
                        </p>
                     </h1>
                     <div className="search-container">
                        <span className="icon-search">
                           <i class="fas fa-search"></i>
                        </span>
                        <input className="input-search" type="text" placeholder="Tìm bệnh viện " />
                     </div>
                     <div className="download">
                        <a href=" " className="download-by-google">
                           <img src={images.GGdownload} alt="GG-download" />
                        </a>
                        <a href=" " className="download-by-app">
                           <img src={images.Appdownload} alt="APP-download" />
                        </a>
                     </div>
                     <div className="selection-content">
                        <ul className="list-select">
                           <li className="item-select">
                              <div
                                 className="item-select-logo"
                                 style={{ backgroundImage: `url(${images.chuyenkhoa})` }}
                              ></div>
                              <span className="title-select">
                                 <FormattedMessage id="home-banner.chuyen-khoa-1" />
                                 <br />
                                 <FormattedMessage id="home-banner.chuyen-khoa-2" />
                              </span>
                           </li>
                           <li className="item-select">
                              <div
                                 className="item-select-logo"
                                 style={{ backgroundImage: `url(${images.khamtuxa})` }}
                              ></div>
                              <span className="title-select">
                                 <FormattedMessage id="home-banner.tu-xa-1" />
                                 <br />
                                 <FormattedMessage id="home-banner.tu-xa-2" />
                              </span>
                           </li>
                           <li className="item-select">
                              <div
                                 className="item-select-logo"
                                 style={{ backgroundImage: `url(${images.khamtongquat})` }}
                              ></div>
                              <span className="title-select">
                                 <FormattedMessage id="home-banner.tong-quat-1" />
                                 <br />
                                 <FormattedMessage id="home-banner.tong-quat-2" />
                              </span>
                           </li>
                           <li className="item-select">
                              <div
                                 className="item-select-logo"
                                 style={{ backgroundImage: `url(${images.xetnghiemyhoc})` }}
                              ></div>
                              <span className="title-select">
                                 <FormattedMessage id="home-banner.xet-nghiem-1" />
                                 <br />
                                 <FormattedMessage id="home-banner.xet-nghiem-2" />
                              </span>
                           </li>
                           <li className="item-select">
                              <div
                                 className="item-select-logo"
                                 style={{ backgroundImage: `url(${images.suckhoetinhthan})` }}
                              ></div>
                              <span className="title-select">
                                 <FormattedMessage id="home-banner.suc-khoe-1" />
                                 <br />
                                 <FormattedMessage id="home-banner.suc-khoe-2" />
                              </span>
                           </li>
                           <li className="item-select">
                              <div
                                 className="item-select-logo"
                                 style={{ backgroundImage: `url(${images.khamnhakhoa})` }}
                              ></div>
                              <span className="title-select">
                                 <FormattedMessage id="home-banner.nha-khoa-1" />
                                 <br />
                                 <FormattedMessage id="home-banner.nha-khoa-2" />
                              </span>
                           </li>
                           <li className="item-select">
                              <div
                                 className="item-select-logo"
                                 style={{ backgroundImage: `url(${images.goigiaiphau})` }}
                              ></div>
                              <span className="title-select">
                                 <FormattedMessage id="home-banner.phau-thuat-1" />
                                 <br />
                                 <FormattedMessage id="home-banner.phau-thuat-2" />
                              </span>
                           </li>
                           <li className="item-select">
                              <div
                                 className="item-select-logo"
                                 style={{ backgroundImage: `url(${images.sanphamyte})` }}
                              ></div>
                              <span className="title-select">
                                 <FormattedMessage id="home-banner.y-te-1" />
                                 <br />
                                 <FormattedMessage id="home-banner.y-te-2" />
                              </span>
                           </li>
                           <li className="item-select">
                              <div
                                 className="item-select-logo"
                                 style={{ backgroundImage: `url(${images.baitestsuckhoe})` }}
                              ></div>
                              <span className="title-select">
                                 <FormattedMessage id="home-banner.test-sk-1" />
                                 <br />
                                 <FormattedMessage id="home-banner.test-sk-2" />
                              </span>
                           </li>
                        </ul>
                     </div>
                  </div>
               </div>
            )}
         </React.Fragment>
      );
   }
}

const mapStateToProps = (state) => {
   return {
      //state luu tren redux
      isLoggedIn: state.user.isLoggedIn,
      userInfo: state.user.userInfo,
      language: state.app.language,
   };
};

const mapDispatchToProps = (dispatch) => {
   return {
      changeLanguageAppRedux: (language) => dispatch(changeLanguageApp(language)),
   };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
