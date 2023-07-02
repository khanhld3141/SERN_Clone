import bcrypt from 'bcryptjs';
import db from '../../models/index';

const salt = bcrypt.genSaltSync(10);

const createNewUser = async (data) => {
   return new Promise(async (resolve, reject) => {
      try {
         let hashPasswordFromBcrypt = await hashUserPassword(data.password);
         await db.User.create({
            email: data.email,
            password: hashPasswordFromBcrypt,
            firstName: data.firstName,
            lastName: data.lastName,
            address: data.address,
            gender: data.gender === '1 ' ? true : false,
            roleId: data.roleId,
            phoneNumber: data.phoneNumber,
         });
         resolve('Successfully created');
      } catch (error) {
         reject(error);
      }
   });
};

//xử lí password trước khi lưu vào DB
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

const getAllUser = () => {
   return new Promise(async (resolve, reject) => {
      try {
         //tên bảng: model table
         let users = db.User.findAll();
         resolve(users);
      } catch (error) {
         reject(error);
      }
   });
};
const getUserInfoById = (id) => {
   return new Promise(async (resolve, reject) => {
      try {
         let user = await db.User.findOne({ where: { id: id } });
         if (user) {
            resolve(user);
         } else {
            resolve({});
         }
      } catch (error) {
         reject(error);
      }
   });
};
const updateUser = (data) => {
   return new Promise(async (resolve, reject) => {
      try {
         let user = await db.User.findOne({
            where: { id: data.id },
         });
         if (user) {
            user.firstName = data.firstName;
            user.lastName = data.lastName;
            user.address = data.address;
            user.phoneNumber = data.phoneNumber;

            await user.save();
            let allUser = await db.User.findAll();
            resolve(allUser);
         } else {
            resolve();
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
            await user.destroy();
            let allUser = await db.User.findAll();
            resolve(allUser);
         } else {
            resolve();
         }
      } catch (error) {
         reject(error);
      }
   });
};
module.exports = {
   createNewUser,
   getAllUser,
   getUserInfoById,
   updateUser,
   deleteUser,
};
