import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { postVerifyBooking } from '../../services/userService';
import Header from '../HomePage/Header';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import './VerifyEmail.scss';
class VerifyEmail extends Component {
   constructor(props) {
      super(props);
      this.state = {
         statusVerify: false,
      };
   }

   async componentDidMount() {
      if (this.props.location && this.props.location.search) {
         const urlParams = new URLSearchParams(this.props.location.search);
         const token = urlParams.get('token');
         const doctorId = urlParams.get('doctorId');
         let res = await postVerifyBooking({
            token: token,
            doctorId: doctorId,
         });
         console.log(res);
         if (res && res.errCode === 1) {
            this.setState({
               statusVerify: true,
            });
         }
      }
   }
   componentDidUpdate(prevProps, prevState, snapshot) {
      if (prevProps.language !== this.props.language) {
      }
   }

   render() {
      return (
         <div className="verify-booking-container">
            <Header />
            <div className="content-verify">
               {this.state.statusVerify === true ? (
                  <>
                     <div className="confirm">Xác nhận lịch khám thành công</div>
                     <div className="thank">Cảm ơn bạn đã tin tưởng chúng tôi.</div>
                  </>
               ) : (
                  <div className="error">Có lỗi xảy ra vui lòng thử lại sau</div>
               )}
               <Link className="back-home" to="/home">Back to home</Link>
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
   return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(VerifyEmail);
