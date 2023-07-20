import db from '../../models/index';
import CRUDService from '../services/CRUDService';

const getHomePage = async (req, res) => {
   try {
      let data = await db.User.findAll();

      return res.render('homepage.ejs', {
         data: JSON.stringify(data),
      });
   } catch (error) {
      console.error(error);
   }
};
const getAboutPage = (req, res) => {
   return res.render('aboutpage.ejs');
};
const getCRUD = (req, res) => {
   return res.render('crudpage.ejs');
};
const postCRUD = async (req, res) => {
   let message = await CRUDService.createNewUser(req.body);
   if(message==='Email existed!!'){
      return res.json({
         message
      })
   }
   let allUser = await CRUDService.getAllUser();
   return res.render('get-crud.ejs', {
      data: allUser
   });
};
const getDataCRUD = async (req, res) => {
   let data = await CRUDService.getAllUser();
   return res.render('get-crud.ejs', {
      data,
   });
};
const editDataCRUD = async (req, res) => {
   let userId = req.query.id;
   if (userId) {
      let userData = await CRUDService.getUserInfoById(userId);
      // return res.json(userData)
      res.render('edit-crud.ejs', { userData });
   } else {
      return res.json('Id user is not valid');
   }
   return res.json(userId);
};
const putDataCRUD = async (req, res) => {
   let data = req.body;
   // return res.json(data);
   let allUser = await CRUDService.updateUser(data);
   return res.render('get-crud.ejs', {
      data: allUser,
   });
};
const deleteDataCRUD = async (req, res) => {
   let id = req.query.id;
   if (id) {
      let allUser = await CRUDService.deleteUser(id);
      return res.render('get-crud.ejs', {
         data: allUser,
      });
   } else {
      return res.json('Id user is not valid');
   }
};
module.exports = {
   getHomePage,
   getAboutPage,
   getCRUD,
   postCRUD,
   getDataCRUD,
   editDataCRUD,
   putDataCRUD,
   deleteDataCRUD,
};
