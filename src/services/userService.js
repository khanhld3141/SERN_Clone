import db from '../../models/index';
import bcrypt from 'bcryptjs';
const salt = bcrypt.genSaltSync(10);
let handleUserLogin = (email, password) => {
   return new Promise(async (resolve, reject) => {
      try {
         let userData = {};
         let isExistUser = await checkUserEmail(email);
         if (isExistUser) {
            let user = await db.User.findOne({
               where: { email: email },
               attributes: ['email', 'password'],
               raw: true,
            });
            if (user) {
               let isExistPassword = await bcrypt.compareSync(password, user.password);
               if (isExistPassword) {
                  userData.errMessage = 'Đăng nhập thành công';
                  delete user.password;
                  userData.user = user;
                  userData.errCode = 1;
               } else {
                  userData.errMessage = 'Password is incorrect';
                  userData.errCode = 0;
               }
            }
         } else {
            userData.errCode = 0;
            userData.errMessage = `Email or password is incorrect`;
         }
         resolve(userData);
      } catch (error) {
         reject(error);
      }
   });
};

let checkUserEmail = (email) => {
   return new Promise(async (resolve, reject) => {
      try {
         let user = await db.User.findOne({
            where: { email: email },
         });
         if (user) resolve(true);
         else resolve(false);
      } catch (error) {
         reject(error);
      }
   });
};

const getAllUsers = (userId) => {
   return new Promise(async (resolve, reject) => {
      try {
         let users = '';
         if (userId === 'all') {
            users = await db.User.findAll({
               attributes: {
                  exclude: ['password'],
               },
            });
         }
         if (userId && userId !== 'all') {
            users = await db.User.findOne({
               where: { id: userId },
               attributes: {
                  exclude: ['password'],
               },
            });
         }
         console.log(users);
         resolve(users);
      } catch (error) {
         reject(error);
      }
   });
};
module.exports = {
   handleUserLogin,
   getAllUsers,
};
