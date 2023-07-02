import express from 'express';
import homeController from '../controller/homeController';
import userController from '../controller/userController';
let router = express.Router();

let initWebRoutes = (app) => {
   router.get('/', homeController.getHomePage);
   router.get('/about', homeController.getAboutPage);
   router.get('/crud', homeController.getCRUD);
   router.post('/post-crud', homeController.postCRUD);
   router.get('/get-crud', homeController.getDataCRUD);
   router.get('/edit-crud', homeController.editDataCRUD);
   router.post('/put-crud', homeController.putDataCRUD);
   router.get('/delete-crud', homeController.deleteDataCRUD);

   router.post('/api/login', userController.handleLogin);
   router.get('/api/get-all-users', userController.handleGetAllUsers);
   return app.use('/', router);
};
module.exports = initWebRoutes;
