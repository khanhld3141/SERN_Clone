import React, { Component } from 'react';

import { connect } from 'react-redux';
import Header from './Header';
import Specialty from './Section/OutStandingDoctor';
import About from './Section/About';
import DownApp from './Section/DownApp';
import Handbook from './Section/Handbook';
import VideoExamination from './Section/VideoExamination';
import MedicalFacilities from './Section/MedicalFacilities';
import PopularSpecialty from './Section/PopularSpecialty';
class HomePage extends Component {
   render() {
      return (
         <div>
            <Header isShowBanner={true} />
            <PopularSpecialty />
            <VideoExamination />
            <MedicalFacilities />
            <Specialty/>
            <Handbook />
            <About />
            <DownApp />
            <div style={{ height: '100px' }}></div>
         </div>
      );
   }
}

const mapStateToProps = (state) => {
   return {
      isLoggedIn: state.user.isLoggedIn,
   };
};

const mapDispatchToProps = (dispatch) => {
   return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
