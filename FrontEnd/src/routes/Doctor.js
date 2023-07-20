import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect, Route, Switch } from 'react-router-dom';
import { Fragment } from 'react';
import ManageSchedule from '../containers/System/Doctor/ManageSchedule';
import ManagePatient from '../containers/System/Doctor/ManagePatient';
import Header from '../containers/Header/Header';
class Doctor extends Component {
   render() {
    let {isLoggedIn} = this.props
      return (
         <Fragment>
            {isLoggedIn && <Header/>}
            <div className="system-container">
               <div className="system-list">
                  <Switch>
                     <Route path="/doctor/manage-schedule" component={ManageSchedule} />
                     <Route path="/doctor/manage-patient" component={ManagePatient} />
                
                  </Switch>
               </div>
            </div>
         </Fragment>
      );
   }
}

const mapStateToProps = (state) => {
   return {
      systemMenuPath: state.app.systemMenuPath,
      isLoggedIn: state.user.isLoggedIn,
   };
};

const mapDispatchToProps = (dispatch) => {
   return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Doctor);
