import express from 'express';
import homeController from '../controller/homeController';
import userController from '../controller/userController';
import doctorController from '../controller/doctorController';
import patientController from '../controller/patientController';
import specialtyController from '../controller/specialtyController';
import clinicController from '../controller/clinicController'
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
   router.post('/api/create-new-user', userController.handleCreateNewUser);
   router.put('/api/edit-user', userController.handleEditUser);
   router.delete('/api/delete-user', userController.handleDeleteUser);
   router.get('/api/allcode', userController.getAllCode);

   router.get('/api/top-doctor-home', doctorController.getTopDoctorHome);
   router.get('/api/get-all-doctors', doctorController.getAllDoctor);
   router.post('/api/save-info-doctors', doctorController.postInfoDoctors);
   router.get('/api/get-detail-doctor-by-id', doctorController.getDetailDoctorById);
   router.post('/api/bulk-create-schedule', doctorController.bulkCreateSchedule);
   router.get('/api/get-schedule-by-date', doctorController.getScheduleByDate);
   router.get('/api/get-extra-info-doctor-by-id', doctorController.getExtraInfoDoctorById);
   router.get('/api/get-profile-doctor-by-id', doctorController.getProfileDoctorById);
   router.get('/api/get-schedule-patient', doctorController.getSchedulePatient);
   router.post('/api/commit-schedule-patient', doctorController.commitSchedulePatient)
   router.post('/api/send-remedy', patientController.sendRemedy)

   
   router.post('/api/patient-book-appointment', patientController.postAppointment);
   router.post('/api/verify-book-appointment', patientController.postVerifyAppointment);

   router.post('/api/create-new-specialty', specialtyController.createSpecialty);
   router.get('/api/get-all-specialty', specialtyController.getAllSpecialty);
   router.get('/api/get-profile-doctor-by-specialty-id', specialtyController.getProfileDoctorBySpecialtyId);

   router.post('/api/create-new-clinic', clinicController.createNewClinic);
   router.get('/api/get-all-clinic', clinicController.getAllClinic);
   router.get('/api/get-profile-doctor-by-clinic-id', clinicController.getProfileDoctorByClinicId);
   


   return app.use('/', router);
};
module.exports = initWebRoutes;
