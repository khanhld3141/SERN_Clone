import userService from '../services/userService';

const handleLogin = async (req, res) => {
   let email = req.body.email;
   let password = req.body.password;
   if (!email || !password) {
      return res.status(500).json({
         message: 'Invalid email or password',
      });
   }

   let userData = await userService.handleUserLogin(email, password);

   return res.status(200).json({
      errCode: userData.errCode,
      errMessage: userData.errMessage,
      user: userData.user,
   });
};
const handleGetAllUsers = async (req, res) => {
   let id = req.query.id; //all or id 1 user
   if (!id) {
      return res.status(200).json({
         errCode: 0,
         errMessage: 'Missing required parameter',
      });
   }
   let users = await userService.getAllUsers(id);

   return res.status(200).json({
      errCode: 1,
      errMessage: 'Successfully',
      users,
   });
};
const handleCreateNewUser = async (req, res) => {
   let message = await userService.createNewUser(req.body);

   return res.json(message);
};
const handleDeleteUser = async (req, res) => {
   if (!req.body.id) {
      return res.json({
         errCode: 0,
         message: 'Missing query parameter',
      });
   }
   let message = await userService.deleteUser(req.body.id);

   return res.json(message);
};
const handleEditUser = async (req, res) => {
   let message = await userService.editUser(req.body);

   return res.json(message);
};
const getAllCode = async (req, res) => {
   try {
      // console.log(req.body.type);
      let data = await userService.getAllCodeService(req.query.type);
      return res.json(data);
   } catch (error) {
      return res.status(200).json({
         errCode: 0,
         errMsg: 'Error from server',
      });
   }
};
module.exports = {
   handleLogin,
   handleGetAllUsers,
   handleCreateNewUser,
   handleEditUser,
   handleDeleteUser,
   getAllCode,
};
