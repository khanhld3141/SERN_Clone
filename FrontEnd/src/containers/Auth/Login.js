import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';

// import * as actions from "../store/actions";
import * as actions from '../../store/actions';

import './Login.scss';
import { userService } from '../../services';

class Login extends Component {
   // eslint-disable-next-line no-useless-constructor
   constructor(props) {
      super(props);
      this.state = {
         username: '',
         password: '',
      };
   }
   handleOnChangeInput = (e, type) => {
      type === 'username' ? this.setState({ username: e.target.value }) : this.setState({ password: e.target.value });
   };
   handleKeyDown = (e) => {
      if (e.key === 'Enter') {
         this.handleLogin();
      }
   };
   handleLogin = async () => {
      // alert('username :' + this.state.username);
      // alert('password :' + this.state.password);
      this.setState({
         errMessage: '',
      });

      try {
         let data = await userService(this.state.username, this.state.password);
         this.setState({
            errMessage: data.errMessage,
         });
         if (data.errCode) {
            this.props.userLoginSuccess(data.user);
         }
      } catch (error) {
         console.log(error.response);
      }
   };
   render() {
      return (
         <div className="login-background">
            <div className="login-container">
               <div className="login-content row">
                  <div className="col-md-12 text-login">Login</div>
                  <div className="col-md-12 form-group">
                     <label>Username:</label>
                     <input
                        // value={this.state.username}
                        type="text"
                        className="form-control"
                        placeholder="Enter username"
                        onChange={(e) => this.handleOnChangeInput(e, 'username')}
                     />
                  </div>
                  <div className="col-md-12 form-group">
                     <label>Password:</label>
                     <input
                        // value={this.state.password}
                        type="password"
                        className="form-control"
                        placeholder="Enter password"
                        onChange={(e) => this.handleOnChangeInput(e, 'password')}
                        onKeyDown={(e) => this.handleKeyDown(e)}
                     />
                  </div>
                  <div className="col-md-12 significant">{this.state.errMessage}</div>
                  <div className="col-md-12 ">
                     <button className="btn-login" onClick={() => this.handleLogin()}>
                        Login
                     </button>
                  </div>
                  <div className="col-md-12">
                     <span className="forgot-password">Forgot your password?</span>
                  </div>
                  <div className="col-md-12 text-center">
                     <span className="text-or-login">Or login with ?</span>
                  </div>
                  <div className="social-login">
                     <i className="icon icon-gg fab fa-google"></i>
                     <i className="icon icon-fb fab fa-facebook"></i>
                  </div>
               </div>
            </div>
         </div>
      );
   }
}

const mapStateToProps = (state) => {
   return {
      language: state.app.language,
   };
};

const mapDispatchToProps = (dispatch) => {
   return {
      navigate: (path) => dispatch(push(path)),
      // adminLoginSuccess: (adminInfo) => dispatch(actions.adminLoginSuccess(adminInfo)),
      // adminLoginFail: () => dispatch(actions.adminLoginFail()),
      userLoginSuccess: (userInfo) => dispatch(actions.userLoginSuccess(userInfo)),
   };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
