import React, { Component } from 'react';
import { connect } from 'react-redux';
import './TableManageUser.scss';
import * as actions from '../../../store/actions';

import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
// import style manually
import 'react-markdown-editor-lite/lib/index.css';

// Register plugins if required
// MdEditor.use(YOUR_PLUGINS_HERE);

// Initialize a markdown parser
const mdParser = new MarkdownIt(/* Markdown-it options */);

// Finish!
function handleEditorChange({ html, text }) {
   console.log('handleEditorChange', html, text);
}

class TableManageUser extends Component {
   constructor(props) {
      super(props);
      this.state = {
         usersRedux: [],
      };
   }
   componentDidMount() {
      this.props.fetchUserRedux();
   }
   componentDidUpdate(prevProps, prevState, snapshot) {
      //biến của react, không cần truyền
      if (prevProps.listUsers !== this.props.listUsers) {
         this.setState({
            usersRedux: this.props.listUsers,
         });
      }
   }
   handleDeleteUser = (user) => {
      this.props.deleteUserRedux(user.id);
   };
   handleEditUser = (user) => {
      this.props.handleEditUserFromParent(user);
   };
   render() {
      let arrUsers = this.state.usersRedux;
      return (
         <div className="container">
            <div className="table-manage-user mt-4 mb-5">
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
                        arrUsers.length > 0 &&
                        arrUsers.map((user, index) => (
                           <tr key={index}>
                              <td>{index + 1}</td>
                              <td>{user.email}</td>
                              <td>{user.firstName}</td>
                              <td>{user.lastName}</td>
                              <td>{user.address}</td>
                              <td>{user.phoneNumber}</td>
                              <td>
                                 <button onClick={() => this.handleEditUser(user)} className="btn-edit">
                                    <i className="fas fa-edit"></i>
                                 </button>
                                 <button onClick={() => this.handleDeleteUser(user)} className="btn-delete">
                                    <i className="far fa-trash-alt"></i>
                                 </button>
                              </td>
                           </tr>
                        ))}
                  </tbody>
               </table>
            </div>
            {!this.props.isRedux && (
               <MdEditor
                  style={{ height: '500px' }}
                  renderHTML={(text) => mdParser.render(text)}
                  onChange={handleEditorChange}
               />
            )}
         </div>
      );
   }
}

const mapStateToProps = (state) => {
   return {
      listUsers: state.admin.users,
   };
};

const mapDispatchToProps = (dispatch) => {
   return {
      fetchUserRedux: () => dispatch(actions.fetchAllUserStart()),
      deleteUserRedux: (id) => dispatch(actions.deleteUser(id)),
   };
};

export default connect(mapStateToProps, mapDispatchToProps)(TableManageUser);
