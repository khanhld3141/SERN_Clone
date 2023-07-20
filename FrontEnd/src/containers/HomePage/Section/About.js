import React, { Component } from 'react';
import { connect } from 'react-redux';
import './About.scss';
import images from '../../../assets/images';
class About extends Component {
   render() {
      return (
         <div className="about-container">
            <div className="about-content">
               <div className="header-title">
                  <span className="header-main-title">{this.props.title}</span>
               </div>
               <div className="main-content">
                  <div className="audio-content">
                     <iframe
                        width="560"
                        height="315"
                        src="https://www.youtube.com/embed/yXWCcRYaA8E"
                        title="YouTube video player"
                        frameborder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        allowfullscreen
                     ></iframe>
                  </div>
                  <div className="news-content">
                     <div className="news">
                        <img src={images.vnexpress} alt="" />
                        <img src={images.vtv1} alt="" />
                        <img src={images.boyte} alt="" />
                     </div>
                     <div className="news">
                        <img src={images.ictnews} alt="" />
                        <img src={images.boyte} alt="" />
                        <img src={images.infonet} alt="" />
                     </div>
                     <div className="news">
                        <img src={images.suckhoedoisong} alt="" />
                        <img src={images.ictnews} alt="" />
                        <img src={images.vtv1} alt="" />
                     </div>
                  </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(About);
