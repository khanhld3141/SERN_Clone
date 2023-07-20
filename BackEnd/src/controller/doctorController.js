import doctorService from '../services/doctorService';

const getTopDoctorHome = async (req, res) => {
   let limit = req.query.limit;
   if (!limit) limit = 10;
   try {
      let response = await doctorService.getTopDoctorHome(+limit);
      return res.status(200).json(response);
   } catch (error) {
      console.log(error);
      return res.status(200).json({
         errCode: 0,
         message: 'Error from server',
      });
   }
};
const getAllDoctor = async (req, res) => {
   try {
      let doctors = await doctorService.getAllDoctors();
      return res.status(200).json(doctors);
   } catch (error) {
      console.log(error);
      return res.status(200).json({
         errCode: 0,
         errMessage: 'Error from server',
      });
   }
};
const postInfoDoctors = async (req, res) => {
   try {
      let response = await doctorService.saveDetailInfoDoctor(req.body);
      return res.status(200).json(response);
   } catch (error) {
      console.log(error);
      return res.status(200).json({
         errCode: 0,
         errMessage: 'Error from server',
      });
   }
};
const getDetailDoctorById = async (req, res) => {
   try {
      let info = await doctorService.getDetailDoctorById(req.query.id);

      return res.status(200).json(info);
   } catch (error) {
      console.log(error);
      return res.status(200).json({
         errCode: 0,
         errorMessage: 'Error from server',
      });
   }
};
const bulkCreateSchedule = async (req, res) => {
   try {
      let info = await doctorService.bulkCreateSchedule(req.body);
      res.status(200).json(info);
   } catch (error) {
      console.log(error);
      res.status(200).json({
         errCode: 0,
         errorMessage: 'Error from server',
      });
   }
};
const getScheduleByDate = async (req, res) => {
   try {
      let info = await doctorService.getScheduleByDate(req.query.doctorId, req.query.date);
      res.status(200).json(info);
   } catch (error) {
      console.log(error);
      res.status(200).json({
         errCode: 0,
         errorMessage: 'Error from server',
      });
   }
};
const getExtraInfoDoctorById = async (req, res) => {
   try {
      let info = await doctorService.getExtraInfoDoctorById(req.query.doctorId);
      res.status(200).json(info);
   } catch (error) {
      console.log(error);
      res.status(200).json({
         errCode: 0,
         errorMessage: 'Error from server',
      });
   }
};
const getProfileDoctorById = async (req, res) => {
   try {
      let info = await doctorService.getProfileDoctorById(req.query.doctorId);
      res.status(200).json(info);
   } catch (error) {
      console.log(error);
      res.status(200).json({
         errCode: 0,
         errorMessage: 'Error from server',
      });
   }
};
const getSchedulePatient = async (req, res) => {
   try {
      let info = await doctorService.getSchedulePatient(req.query.doctorId, req.query.date);
      res.status(200).json(info);
   } catch (error) {
      console.log(error);
      res.status(200).json({
         errCode: 0,
         errorMessage: 'Error from server',
      });
   }
};
const commitSchedulePatient = async (req, res) => {
   try {
      let info = await doctorService.commitSchedulePatient(req.body);
      res.status(200).json(info);
   } catch (error) {
      console.log(error);
      res.status(200).json({
         errCode: 0,
         errorMessage: 'Error from server',
      });
   }
};
const sendRemedy = async (req, res) => {
   try {
      let info = await doctorService.sendRemedy(req.body);
      res.status(200).json(info);
   } catch (error) {
      console.log(error);
      res.status(200).json({
         errCode: 0,
         errorMessage: 'Error from server',
      });
   }
};
module.exports = {
   getProfileDoctorById,
   getTopDoctorHome,
   getAllDoctor,
   postInfoDoctors,
   getDetailDoctorById,
   bulkCreateSchedule,
   getScheduleByDate,
   getExtraInfoDoctorById,
   getSchedulePatient,
   commitSchedulePatient,
   sendRemedy,
};
