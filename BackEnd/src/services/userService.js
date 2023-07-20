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
               attributes: ['email','id', 'password', 'roleId', 'firstName', 'lastName'],
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
         resolve(users);
      } catch (error) {
         reject(error);
      }
   });
};
const hashUserPassword = (password) => {
   return new Promise(async (resolve, reject) => {
      try {
         let hashPassword = await bcrypt.hashSync(password, salt);
         resolve(hashPassword);
      } catch (error) {
         reject(error);
      }
   });
};
const createNewUser = (data) => {
   return new Promise(async (resolve, reject) => {
      try {
         let checkExistEmail = await checkUserEmail(data.email);
         if (!checkExistEmail) {
            let hashPasswordFromBcrypt = await hashUserPassword(data.password);
            await db.User.create({
               email: data.email,
               password: hashPasswordFromBcrypt,
               firstName: data.firstName,
               lastName: data.lastName,
               address: data.address,
               gender: data.gender,
               roleId: data.roleId,
               phoneNumber: data.phoneNumber,
               positionId: data.positionId,
               image: data.image,
            });
            resolve({
               errCode: 1,
               message: 'Successfully',
            });
         } else {
            resolve({
               errCode: 0,
               message: 'Email existed',
            });
         }
      } catch (error) {
         reject(error);
      }
   });
};
const deleteUser = (id) => {
   return new Promise(async (resolve, reject) => {
      try {
         let user = await db.User.findOne({
            where: { id: id },
         });
         if (user) {
            await db.User.destroy({
               where: { id: id },
            });
            resolve({
               errCode: 1,
               message: 'Delete user successfully',
            });
         } else {
            resolve({
               errCode: 404,
               message: 'User not found',
            });
         }
      } catch (error) {
         reject(error);
      }
   });
};
const editUser = (data) => {
   return new Promise(async (resolve, reject) => {
      try {
         let user;
         if (data.id) {
            user = await db.User.findOne({
               where: { id: data.id },
            });
         }
         if (user) {
            user.email = data.email;
            user.firstName = data.firstName;
            user.lastName = data.lastName;
            user.address = data.address;
            user.phoneNumber = data.phoneNumber;
            user.roleId = data.roleId;
            user.positionId = data.positionId;
            user.gender = data.gender;
            user.image = data.image;
            await db.User.update(user, {
               where: { id: user.id },
            });
            resolve({
               errCode: 1,
               message: 'User updated successfully',
            });
         } else {
            resolve({
               errCode: 404,
               message: 'User not found',
            });
         }
      } catch (error) {
         reject(error);
      }
   });
};
const getAllCodeService = (type) => {
   return new Promise(async (resolve, reject) => {
      try {
         let response = {};

         if (type) {
            let allcode = await db.Allcode.findAll({
               where: {
                  type: type,
               },
            });
            response.errCode = 1;
            response.data = allcode;
         } else {
            response.errCode = 0;
            response.data = 'Missing required parameter';
         }

         resolve(response);
      } catch (error) {
         reject(error);
      }
   });
};
module.exports = {
   handleUserLogin,
   getAllUsers,
   createNewUser,
   deleteUser,
   editUser,
   getAllCodeService,
};
