import React, { Component } from 'react';
import { connect } from 'react-redux';
import './DoctorExtra.scss';
import { LANGUAGES } from '../../../utils';
import { getExtraInfoDoctorById } from '../../../services/userService';
import { FormattedMessage } from 'react-intl';
import NumberFormat from 'react-number-format';

class DoctorExtra extends Component {
   constructor(props) {
      super(props);
      this.state = {
         isHide: true,
         extraInfo: {},
      };
   }

   async componentDidMount() {
      let { doctorIdFromParent } = this.props;
      let res = await getExtraInfoDoctorById(doctorIdFromParent);
      if (res && res.errCode === 1) {
         this.setState({
            extraInfo: res.data,
         });
      }
   }
   async componentDidUpdate(prevProps, prevState, snapshot) {
      if (prevProps.language !== this.props.language) {
      }
      if (this.props.doctorIdFromParent !== prevProps.doctorIdFromParent) {
         let res = await getExtraInfoDoctorById(this.props.doctorIdFromParent);
         if (res && res.errCode === 1) {
            this.setState({
               extraInfo: res.data,
            });
         }
      }
   }
   handleHide = () => {
      this.setState({
         isHide: !this.state.isHide,
      });
   };
   render() {
      let { extraInfo } = this.state;
      let { language } = this.props;
      // console.log(extraInfo);

      return (
         <>
            {extraInfo && (
               <div className="doctor-extra-info-container">
                  <div className="d-e-i-up">
                     <div className="e-address ">
                        <FormattedMessage id="admin.manage-doctor.examination-address" />
                     </div>
                     <div className="e-clinic">{extraInfo.nameClinic}</div>
                     <div className="e-detail-add">{extraInfo.addressClinic}</div>
                  </div>
                  <div className="d-e-i-down">
                     {this.state.isHide === true ? (
                        <>
                           <div className="price-info">
                              <FormattedMessage id="admin.manage-doctor.price" />
                              {extraInfo.priceTypeData && language === LANGUAGES.VI && (
                                 <NumberFormat
                                    value={extraInfo.priceTypeData.valueVi}
                                    displayType={'text'}
                                    thousandSeparator={true}
                                    suffix={'VNĐ'}
                                 />
                              )}
                              {extraInfo.priceTypeData && language === LANGUAGES.EN && (
                                 <NumberFormat
                                    value={extraInfo.priceTypeData.valueEn}
                                    displayType={'text'}
                                    thousandSeparator={true}
                                    suffix={'$'}
                                 />
                              )}

                              <span className="more-price-info" onClick={() => this.handleHide()}>
                                 <FormattedMessage id="admin.manage-doctor.see-detail" />
                              </span>
                           </div>
                        </>
                     ) : (
                        <>
                           <div className="price-info">
                              <FormattedMessage id="admin.manage-doctor.price" />
                           </div>
                           <div className="price-more">
                              <div className="title-price">
                                 <span className="e-price">
                                    <FormattedMessage id="admin.manage-doctor.price" />
                                 </span>
                                 <span className="detail-price">
                                    {extraInfo.priceTypeData && language === LANGUAGES.VI && (
                                       <NumberFormat
                                          value={extraInfo.priceTypeData.valueVi}
                                          displayType={'text'}
                                          thousandSeparator={true}
                                          suffix={'VNĐ'}
                                       />
                                    )}
                                    {extraInfo.priceTypeData && language === LANGUAGES.EN && (
                                       <NumberFormat
                                          value={extraInfo.priceTypeData.valueEn}
                                          displayType={'text'}
                                          thousandSeparator={true}
                                          suffix={'$'}
                                       />
                                    )}
                                 </span>
                              </div>

                              <div className="content-price">{extraInfo.note}</div>
                              <div className="payment-price">
                                 <FormattedMessage id="admin.manage-doctor.payment" />
                                 {extraInfo.paymentTypeData &&
                                 extraInfo.paymentTypeData.valueVi !== 'Tất cả' &&
                                 language === LANGUAGES.VI ? (
                                    <NumberFormat
                                       value={extraInfo.priceTypeData.valueVi}
                                       displayType={'text'}
                                       thousandSeparator={true}
                                       suffix={'VNĐ'}
                                    />
                                 ) : (
                                    ''
                                 )}
                                 {extraInfo.paymentTypeData &&
                                 extraInfo.paymentTypeData.valueVi !== 'Tất cả' &&
                                 language === LANGUAGES.EN ? (
                                    <NumberFormat
                                       value={extraInfo.priceTypeData.valueEn}
                                       displayType={'text'}
                                       thousandSeparator={true}
                                       suffix={'$'}
                                    />
                                 ) : (
                                    ''
                                 )}
                                 {extraInfo.paymentTypeData && extraInfo.paymentTypeData.valueVi === 'Tất cả' ? (
                                    <FormattedMessage id="admin.manage-doctor.payment-method" />
                                 ) : (
                                    ''
                                 )}
                              </div>
                           </div>
                           <div className="less-price-info" onClick={() => this.handleHide()}>
                              <FormattedMessage id="admin.manage-doctor.hidden" />
                           </div>
                        </>
                     )}
                  </div>
               </div>
            )}
         </>
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

export default connect(mapStateToProps, mapDispatchToProps)(DoctorExtra);
