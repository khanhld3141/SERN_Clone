import React, { Component } from 'react';
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { LANGUAGES, CRUD_ACTIONS, CommonUtils } from '../../../utils';
import './UserRedux.scss';
import * as actions from '../../../store/actions';
import TableManageUser from './TableManageUser';

class UserRedux extends Component {
   constructor(props) {
      super(props);
      this.state = {
         genderArr: [],
         positionArr: [],
         roleArr: [],
         previewImgURL: '',
         isOpen: false,

         email: '',
         password: '',
         firstName: '',
         lastName: '',
         phoneNumber: '',
         address: '',
         gender: '',
         position: '',
         role: '',
         image: '',

         userEditId: '',
         action: CRUD_ACTIONS.CREATE,
      };
   }

   componentDidMount() {
      this.props.getGenderStart();
      this.props.getPositionStart();
      this.props.getRoleStart();
   }
   componentDidUpdate(prevProps, prevState, snapshot) {
      if (prevProps.genderRedux !== this.props.genderRedux) {
         this.setState({
            genderArr: this.props.genderRedux,
         });
      }
      if (prevProps.positionRedux !== this.props.positionRedux) {
         this.setState({
            positionArr: this.props.positionRedux,
         });
      }
      if (prevProps.roleRedux !== this.props.roleRedux) {
         this.setState({
            roleArr: this.props.roleRedux,
         });
      }
      if (prevProps.listUsers !== this.props.listUsers) {
         this.setState({
            email: '',
            password: '',
            firstName: '',
            lastName: '',
            phoneNumber: '',
            address: '',
            gender: '',
            position: '',
            role: '',
            image: '',
            previewImgURL: '',

            action: CRUD_ACTIONS.CREATE,
         });
      }
   }

   handleOnChangeImage = async (e) => {
      let file = e.target.files[0];
      console.log('image', file);
      if (file) {
         let base64 = await CommonUtils.toBase64(file);
         const objectURL = URL.createObjectURL(file);
         this.setState({
            previewImgURL: objectURL,
            image: base64,
         });
      }
   };
   openImage = () => {
      if (this.state.previewImgURL) {
         this.setState({ isOpen: true });
      }
   };
   checkValidateInput = () => {
      let arrCheck = [
         'email',
         'password',
         'firstName',
         'lastName',
         'phoneNumber',
         'address',
         'gender',
         'position',
         'role',
         'image'
      ];
      let isValid = true;
      for (let i = 0; i < arrCheck.length; i++) {
         if (!this.state[arrCheck[i]]) {
            alert(`Mising parameter ${arrCheck[i]}`);
            isValid = false;
            break;
         }
      }
      return isValid;
   };
   handleSaveUser = () => {
      let isValid = this.checkValidateInput();

      let { action } = this.state;
      if (action === CRUD_ACTIONS.CREATE) {
         if (isValid) {
            this.props.createNewUser({
               email: this.state.email,
               password: this.state.password,
               firstName: this.state.firstName,
               lastName: this.state.lastName,
               address: this.state.address,
               gender: this.state.gender,
               roleId: this.state.role,
               phoneNumber: this.state.phoneNumber,
               positionId: this.state.position,
               image: this.state.image,
            });
         }
      } else if (action === CRUD_ACTIONS.EDIT) {
         if (isValid) {
            this.props.editUserRedux({
               id: this.state.userEditId,
               email: this.state.email,
               // password: this.state.password,
               firstName: this.state.firstName,
               lastName: this.state.lastName,
               address: this.state.address,
               gender: this.state.gender,
               roleId: this.state.role,
               phoneNumber: this.state.phoneNumber,
               positionId: this.state.position,
               image: this.state.image,
            });
         }
      }
   };
   handleOnChangeInput = (e, type) => {
      let copyState = { ...this.state };
      copyState[type] = e.target.value;
      this.setState({
         ...copyState,
      });
   };

   handleEditUserFromParent = (data) => {
      let imageBase64;
      if (data.image) {
         imageBase64 = new Buffer(data.image, 'base64').toString('binary');
      }

      this.setState({
         userEditId: data.id,
         email: data.email,
         password: 'data.password',
         firstName: data.firstName,
         lastName: data.lastName,
         address: data.address,
         gender: data.gender,
         role: data.roleId,
         phoneNumber: data.phoneNumber,
         position: data.positionId,
         previewImgURL: imageBase64,
         image: imageBase64,
         action: CRUD_ACTIONS.EDIT,
      });
   };

   render() {
      let language = this.props.language;
      // let isLoadingGenders = this.props.isLoadingGenders;
      // let isLoadingPositions = this.props.isLoadingPositions;
      let { email, password, firstName, lastName, phoneNumber, address, gender, position, role, image } = this.state;
      return (
         <div className="user-redux-container">
            <div className="title">USER REDUX</div>
            <div className="user-redux-body">
               <div className="container">
                  <div className="row">
                     <div className="col-md-12 my-3 mt-3">
                        <FormattedMessage id="manage-user.add" />
                     </div>
                     {/* <div className="col-md-12 my-3 mt-3">{isLoadingGenders === true ? 'loading-user' : ''}</div> */}

                     <div className="col-md-6">
                        <label>
                           <FormattedMessage id="manage-user.email" />
                        </label>
                        <input
                           id="email"
                           value={email}
                           onChange={(e) => this.handleOnChangeInput(e, 'email')}
                           className="form-control"
                           type="email"
                           disabled={this.state.action === CRUD_ACTIONS.EDIT}
                        />
                     </div>
                     <div className="col-md-6">
                        <label>
                           <FormattedMessage id="manage-user.password" />
                        </label>
                        <input
                           id="password"
                           value={password}
                           onChange={(e) => this.handleOnChangeInput(e, 'password')}
                           className="form-control"
                           type="password"
                           disabled={this.state.action === CRUD_ACTIONS.EDIT}
                        />
                     </div>
                  </div>
                  <div className="row mt-3">
                     <div className="col-md-6">
                        <label>
                           <FormattedMessage id="manage-user.firstName" />
                        </label>
                        <input
                           id="firstName"
                           value={firstName}
                           onChange={(e) => this.handleOnChangeInput(e, 'firstName')}
                           className="form-control"
                           type="text"
                        />
                     </div>
                     <div className="col-md-6">
                        <label>
                           <FormattedMessage id="manage-user.lastName" />
                        </label>
                        <input
                           id="lastName"
                           value={lastName}
                           onChange={(e) => this.handleOnChangeInput(e, 'lastName')}
                           className="form-control"
                           type="text"
                        />
                     </div>
                  </div>
                  <div className="row mt-3">
                     <div className="col-md-4">
                        <label>
                           <FormattedMessage id="manage-user.phoneNumber" />
                        </label>
                        <input
                           id="phoneNumber"
                           value={phoneNumber}
                           onChange={(e) => this.handleOnChangeInput(e, 'phoneNumber')}
                           className="form-control"
                           type="text"
                        />
                     </div>
                     <div className="col-md-8">
                        <label>
                           <FormattedMessage id="manage-user.address" />
                        </label>
                        <input
                           id="address"
                           value={address}
                           onChange={(e) => this.handleOnChangeInput(e, 'address')}
                           className="form-control"
                           type="text"
                        />
                     </div>
                  </div>
                  <div className="row mt-3">
                     <div className="col-md-3">
                        <label>
                           <FormattedMessage id="manage-user.gender" />
                        </label>
                        <select
                           id="gender"
                           value={gender}
                           onChange={(e) => this.handleOnChangeInput(e, 'gender')}
                           className="form-control"
                        >
                           <option defaultValue="">Choose gender....</option>
                           {this.state.genderArr.length > 0 &&
                              this.state.genderArr.map((gender, index) => {
                                 let gd = language === LANGUAGES.VI ? gender.valueVi : gender.valueEn;
                                 return (
                                    <option key={index} value={gender.key}>
                                       {gd}
                                    </option>
                                 );
                              })}
                        </select>
                     </div>
                     <div className="col-md-3">
                        <label>
                           <FormattedMessage id="manage-user.roleid" />
                        </label>
                        <select
                           id="role"
                           value={role}
                           onChange={(e) => this.handleOnChangeInput(e, 'role')}
                           className="form-control"
                        >
                           <option defaultValue="">Choose role....</option>
                           {this.state.roleArr.length > 0 &&
                              this.state.roleArr.map((role, index) => {
                                 let gd = language === LANGUAGES.VI ? role.valueVi : role.valueEn;
                                 return (
                                    <option key={index} value={role.key}>
                                       {gd}
                                    </option>
                                 );
                              })}
                        </select>
                     </div>
                     <div className="col-md-3">
                        <label>
                           <FormattedMessage id="manage-user.position" />
                        </label>
                        <select
                           id="position"
                           value={position}
                           onChange={(e) => this.handleOnChangeInput(e, 'position')}
                           className="form-control"
                        >
                           <option defaultValue="">Choose position....</option>
                           {this.state.positionArr.length > 0 &&
                              this.state.positionArr.map((position, index) => {
                                 let gd = language === LANGUAGES.VI ? position.valueVi : position.valueEn;
                                 return (
                                    <option key={index} value={position.key}>
                                       {gd}
                                    </option>
                                 );
                              })}
                        </select>
                     </div>
                     <div className="col-md-3">
                        <label>
                           <FormattedMessage id="manage-user.image" />
                        </label>
                        <div className="preview-image-container">
                           <label className="label-upload" htmlFor="previewImg">
                              <FormattedMessage id="manage-user.upload" />
                              <span className="icon">
                                 <i className="fas fa-upload"></i>
                              </span>
                           </label>
                           <input
                              // value={image}
                              onChange={(e) => this.handleOnChangeImage(e)}
                              hidden
                              id="previewImg"
                              type="file"
                              className="form-control"
                           />

                           <div
                              onClick={() => this.openImage()}
                              className="preview-image"
                              style={{ backgroundImage: `url(${this.state.previewImgURL})` }}
                           ></div>
                        </div>
                     </div>
                  </div>
                  <button
                     type="submit"
                     className={
                        this.state.action === CRUD_ACTIONS.EDIT ? 'mt-3 btn btn-warning' : 'mt-3 btn btn-primary'
                     }
                     onClick={() => this.handleSaveUser()}
                  >
                     {this.state.action === CRUD_ACTIONS.EDIT ? (
                        <FormattedMessage id="manage-user.edit" />
                     ) : (
                        <FormattedMessage id="manage-user.save" />
                     )}
                  </button>
               </div>
            </div>

            <TableManageUser isRedux={true} handleEditUserFromParent={this.handleEditUserFromParent} action={this.state.action} />
            {this.state.isOpen && (
               <Lightbox mainSrc={this.state.previewImgURL} onCloseRequest={() => this.setState({ isOpen: false })} />
            )}
         </div>
      );
   }
}

const mapStateToProps = (state) => {
   return {
      language: state.app.language,
      genderRedux: state.admin.genders,
      isLoadingGenders: state.admin.isLoadingGenders,
      positionRedux: state.admin.positions,
      isLoadingPositions: state.admin.isLoadingPositions,
      roleRedux: state.admin.roles,
      isLoadingRole: state.admin.isLoadingRole,
      listUsers: state.admin.users,
   };
};

const mapDispatchToProps = (dispatch) => {
   return {
      getGenderStart: () => dispatch(actions.fetchGenderStart()),
      getPositionStart: () => dispatch(actions.fetchPositionStart()),
      getRoleStart: () => dispatch(actions.fetchRoleStart()),
      createNewUser: (data) => dispatch(actions.createNewUser(data)),
      fetchUserRedux: () => dispatch(actions.fetchAllUserStart()),
      editUserRedux: (data) => dispatch(actions.editUser(data)),
      // processLogout: () => dispatch(actions.processLogout()),
      // changeLanguageAppRedux: (language) => dispatch(actions.changeLanguageApp(language)),
   };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserRedux);
