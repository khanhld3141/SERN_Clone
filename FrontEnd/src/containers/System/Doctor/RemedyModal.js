import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { Modal, ModalBody, ModalFooter, ModalHeader, Button } from 'reactstrap';
import { toast } from 'react-toastify';
import { CommonUtils } from '../../../utils';
import moment from 'moment';
import './RemedyModal.scss';
class RemedyModal extends Component {
   constructor(props) {
      super(props);
      this.state = {
         email: '',
         imageBase64: '',
         language:''
      };
   }

   async componentDidMount() {
      if (this.props.selectedPatient) {
         this.setState({
            email: this.props.selectedPatient.email,
         });
      }
      if(this.props.language){
        this.setState({language: this.props.language})
      }
   }

   componentDidUpdate(prevProps, prevState, snapshot) {
      if (prevProps.language !== this.props.language) {
        this.setState({ language:this.props.language });
      }
      if (prevProps.selectedPatient !== this.props.selectedPatient) {
         this.setState({
            email: this.props.selectedPatient.email,
         });
      }
   }
   handleOnChangeEmail = (e) => {
      this.setState({
         email: e.target.value,
      });
   };
   handleOnChangeImage = async (e) => {
      let file = e.target.files[0];
      console.log('image', file);
      if (file) {
         let base64 = await CommonUtils.toBase64(file);
         this.setState({
            imageBase64: base64,
         });
      }
   };
   sendRemedy = () => {
      this.props.sendRemedy(this.state);
   };
   render() {
      let { isOpen, closeRemedy, } = this.props;

      return (
         <Modal className="booking-modal-container" isOpen={isOpen} size="md" centered backdrop>
            <ModalHeader toggle={closeRemedy}>Hóa đơn khám bệnh của bệnh nhân</ModalHeader>
            <ModalBody>
               <div className="row">
                  <div className="col-md-6 form-group">
                     <label>Email bệnh nhân</label>
                     <input
                        type="email"
                        className="form-control"
                        value={this.state.email}
                        onChange={(e) => this.handleOnChangeEmail(e)}
                        readOnly
                     />
                  </div>
                  <div className="col-md-6 form-group">
                     <label>Chọn hóa đơn</label>
                     <input onChange={(e) => this.handleOnChangeImage(e)} type="file" className="form-control-file" />
                  </div>
               </div>
            </ModalBody>
            <ModalFooter>
               <Button color="primary" onClick={() => this.sendRemedy()}>
                  Send
               </Button>
               <Button color="secondary" onClick={closeRemedy}>
                  Cancel
               </Button>
            </ModalFooter>
         </Modal>
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

export default connect(mapStateToProps, mapDispatchToProps)(RemedyModal);
