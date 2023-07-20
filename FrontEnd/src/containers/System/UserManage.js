import React, { Component } from 'react';
import { connect } from 'react-redux';
import './UserManage.scss';
import { getAllUsers, createNewUserService, deleteUserService, editUserService } from '../../services/userService';
import ModalUser from './ModalUser';
import ModalEditUser from './ModalEditUser';

class UserManage extends Component {
   constructor(props) {
      super(props);
      this.state = {
         arrUsers: [],
         isOpenModal: false,
         isOpenEditModal: false,
         userEdit: {},
      };
   }

   async componentDidMount() {
      await this.getAllUsersFromReact();
   }
   toggleModal = () => {
      this.setState({
         isOpenModal: !this.state.isOpenModal,
      });
   };

   getAllUsersFromReact = async () => {
      let response = await getAllUsers('all');
      if (response && response.errCode === 1) {
         this.setState({
            arrUsers: response.users,
         });
      }
   };
   createNewUser = async (data) => {
      try {
         let response = await createNewUserService(data);
         if (response && response.errCode === 1) {
            await this.getAllUsersFromReact();
            this.toggleModal();
         } else {
            alert('Error: ' + response.message);
         }
      } catch (error) {
         console.log(error);
      }
   };
   handleDeleteUser = async (user) => {
      try {
         let response = await deleteUserService(user.id);
         if (response && response.errCode === 1) {
            await this.getAllUsersFromReact();
            alert(response.message);
         } else {
            alert(response.message);
         }
      } catch (error) {
         console.log(error);
      }
   };
   toggleEditModal = (user) => {
      this.setState({
         isOpenEditModal: !this.state.isOpenEditModal,
         userEdit: user,
      });
   };
   handleEditUser = async (user) => {
      this.toggleEditModal(user);
      try {
         let response = await editUserService(user);
         if (response && response.errCode === 1) {
            await this.getAllUsersFromReact();
         } else {
            alert(response.message);
         }
      } catch (error) {
         console.log(error);
      }
   };
   render() {
      let arrUsers = this.state.arrUsers;
      return (
         <div className="users-container">
            <ModalUser
               isOpen={this.state.isOpenModal}
               centered
               size="lg"
               createNewUser={this.createNewUser}
               toggle={this.toggleModal}
            />
            {this.state.isOpenEditModal && (
               <ModalEditUser
                  isOpen={this.state.isOpenEditModal}
                  centered
                  size="lg"
                  user={this.state.userEdit}
                  editUser={this.handleEditUser}
                  toggle={this.toggleEditModal}
               />
            )}
            <div className="title">User manage</div>
            <div className="mx-3">
               <button onClick={() => this.toggleModal()} className="btn btn-primary px-2">
                  <i className="px-2 fas fa-plus"></i>
                  Create new user
               </button>
            </div>
            <div className="users-table mt-4 mx-2">
               <table>
                  <thead>
                     <tr>
                        <th>STT</th>
                        <th>Email</th>
                        <th>FirstName</th>
                        <th>LastName</th>
                        <th>Address</th>
                        <th>PhoneNumber</th>
                        <th>Action</th>
                     </tr>
                  </thead>
                  <tbody>
                     {arrUsers &&
                        arrUsers.map((user, index) => (
                           <tr key={index}>
                              <td>{index + 1}</td>
                              <td>{user.email}</td>
                              <td>{user.firstName}</td>
                              <td>{user.lastName}</td>
                              <td>{user.address}</td>
                              <td>{user.phoneNumber}</td>
                              <td>
                                 <button className="btn-edit" onClick={() => this.handleEditUser(user)}>
                                    <i className="fas fa-edit"></i>
                                 </button>
                                 <button className="btn-delete" onClick={() => this.handleDeleteUser(user)}>
                                    <i className="far fa-trash-alt"></i>
                                 </button>
                              </td>
                           </tr>
                        ))}
                  </tbody>
               </table>
            </div>
         </div>
      );
   }
}

const mapStateToProps = (state) => {
   return {};
};

const mapDispatchToProps = (dispatch) => {
   return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(UserManage);
