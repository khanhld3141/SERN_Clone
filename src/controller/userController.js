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
   let id = req.body.id; //all or id 1 user
   if(!id){
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
module.exports = {
   handleLogin,
   handleGetAllUsers,
};
