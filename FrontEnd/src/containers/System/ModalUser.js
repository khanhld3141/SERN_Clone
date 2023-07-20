import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { connect } from 'react-redux';
class ModalUser extends Component {
   constructor(props) {
      super(props);
      this.state = {
         email: '',
         password: '',
         firstName: '',
         lastName: '',
         address: '',
         phoneNumber: '',
         gender: '',
         roleId: '',
      };
   }
   handleOnChangeInput = (e, type) => {
      let copyState = { ...this.state };
      copyState[type] = e.target.value;
      this.setState({
         ...copyState,
      });
   };
   validateInput = () => {
      let isValid = true;
      let arrInput = ['email', 'password', 'firstName', 'lastName', 'address', 'phoneNumber', 'gender', 'roleId'];
      for (let i = 0; i < arrInput.length; i++) {
         if (!this.state[arrInput[i]]) {
            // eslint-disable-next-line no-unused-vars
            isValid = false;
            alert('Missing parameter ' + arrInput[i]);
            break;
         }
      }
      return isValid;
   };
   handleCreateUser = () => {
      let isValid=this.validateInput();
      if(isValid) {
        this.props.createNewUser(this.state);
      }
      console.log(this.state);
   };
   componentDidMount() {}

   render() {
      return (
         <Modal isOpen={this.props.isOpen} toggle={() => this.props.toggle()} {...this.props}>
            <ModalHeader toggle={() => this.props.toggle()}>Create new user</ModalHeader>
            <ModalBody>
               <div className="container">
                  <div className="row">
                     <h1 className="mt-4">FORM REGISTER</h1>
                     <form action="/post-crud" method="post">
                        <div className="form-group ">
                           <label htmlFor="email">Email</label>
                           <input
                              type="email"
                              onChange={(e) => this.handleOnChangeInput(e, 'email')}
                              className="form-control"
                              id="email"
                              name="email"
                              placeholder="Email...."
                           />
                        </div>
                        <div className="form-group ">
                           <label htmlFor="password">Password</label>
                           <input
                              onChange={(e) => this.handleOnChangeInput(e, 'password')}
                              type="password"
                              className="form-control"
                              id="password"
                              name="password"
                              placeholder="Password....."
                           />
                        </div>

                        <div className="form-group">
                           <label htmlFor="firstName">First name</label>
                           <input
                              onChange={(e) => this.handleOnChangeInput(e, 'firstName')}
                              type="text"
                              className="form-control"
                              id="firstName"
                              name="firstName"
                              placeholder="John"
                           />
                        </div>
                        <div className="form-group">
                           <label htmlFor="lastName">Last name</label>
                           <input
                              onChange={(e) => this.handleOnChangeInput(e, 'lastName')}
                              type="text"
                              className="form-control"
                              id="lastName"
                              name="lastName"
                              placeholder="Smith"
                           />
                        </div>

                        <div className="form-group">
                           <label htmlFor="inputAddress">Address</label>
                           <input
                              onChange={(e) => this.handleOnChangeInput(e, 'address')}
                              name="address"
                              type="text"
                              className="form-control"
                              id="address"
                              placeholder="1234 Main St"
                           />
                        </div>

                        <div className="form-group">
                           <label htmlFor="phoneNumber">Phone number</label>
                           <input
                              onChange={(e) => this.handleOnChangeInput(e, 'phoneNumber')}
                              type="number"
                              className="form-control"
                              id="phoneNumber"
                              name="phoneNumber"
                           />
                        </div>

                        <div className="form-group">
                           <label htmlFor="gender">Gender</label>
                           <select
                              onChange={(e) => this.handleOnChangeInput(e, 'gender')}
                              name="gender"
                              className="form-control  text-center"
                           >
                              <option defaultValue={'gender'}>----Chọn giới tính-----</option>
                              <option value="1">Male</option>
                              <option value="0">Female</option>
                           </select>
                        </div>
                        <div className="form-group">
                           <label htmlFor="roleId">Role</label>
                           <select
                              onChange={(e) => this.handleOnChangeInput(e, 'roleId')}
                              name="roleId"
                              className="form-control text-center"
                           >
                              <option defaultValue={'role'}>----Chọn Role-----</option>
                              <option value="admin">Admin</option>
                              <option value="doctor">Doctor</option>
                              <option value="patient">Patient</option>
                           </select>
                        </div>
                     </form>
                  </div>
               </div>
            </ModalBody>
            <ModalFooter>
               <Button className="px-3" color="primary" onClick={() => this.handleCreateUser()}>
                  Create
               </Button>{' '}
               <Button className="px-3" color="secondary" onClick={() => this.props.toggle()}>
                  Cancel
               </Button>
            </ModalFooter>
         </Modal>
      );
   }
}

const mapStateToProps = (state) => {
   return {};
};

const mapDispatchToProps = (dispatch) => {
   return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalUser);
