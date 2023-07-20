import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { connect } from 'react-redux';
import lodash from 'lodash';
class ModalEditUser extends Component {
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
      let arrInput = ['firstName', 'lastName', 'address', 'phoneNumber'];
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
   handleUpdate = () => {
      let isValid = this.validateInput();
      if (isValid) {
         this.props.editUser(this.state);
      }
   };
   componentDidMount() {
      let user = this.props.user;
      if (user && !lodash.isEmpty(user)) {
         this.setState({
            id: user.id,
            email: user.email,
            password: 'hehe',
            firstName: user.firstName,
            lastName: user.lastName,
            address: user.address,
            phoneNumber: user.phoneNumber,
            gender: user.gender,
            roleId: user.roleId,
         });
      }
   }
   render() {
      return (
         <Modal isOpen={this.props.isOpen} toggle={() => this.props.toggle()} {...this.props}>
            <ModalHeader toggle={() => this.props.toggle()}>Edit user</ModalHeader>
            <ModalBody>
               <div className="container">
                  <div className="row">
                     <h1 className="mt-4">FORM EDIT USER</h1>
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
                              readOnly
                              value={this.state.email}
                           />
                        </div>
                        <div className="form-group ">
                           <label htmlFor="password">Password</label>
                           <input
                              onChange={(e) => this.handleOnChangeInput(e, 'password')}
                              type="text"
                              className="form-control"
                              id="password"
                              name="password"
                              placeholder="Password....."
                              readOnly
                              value={this.state.password}
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
                              value={this.state.firstName}
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
                              value={this.state.lastName}
                              placeholder="Smith"
                           />
                        </div>

                        <div className="form-group">
                           <label htmlFor="address">Address</label>
                           <input
                              onChange={(e) => this.handleOnChangeInput(e, 'address')}
                              name="address"
                              type="text"
                              className="form-control"
                              id="address"
                              value={this.state.address}
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
                              value={this.state.phoneNumber}
                              name="phoneNumber"
                           />
                        </div>
                        <div className="form-group">
                           <label htmlFor="gender">Gender</label>
                           <select
                              onChange={(e) => this.handleOnChangeInput(e, 'gender')}
                              name="gender"
                              className="form-control  text-center"
                              value={this.state.gender}
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
                              value={this.state.roleId}
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
               <Button className="px-3" color="primary" onClick={() => this.handleUpdate()}>
                  Update
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

export default connect(mapStateToProps, mapDispatchToProps)(ModalEditUser);
