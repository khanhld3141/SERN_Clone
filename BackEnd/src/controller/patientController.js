import patientService from '../services/patientService';

const postAppointment = async (req, res) => {
   try {
      let doctors = await patientService.postAppointment(req.body);
      return res.status(200).json(doctors);
   } catch (error) {
      console.log(error);
      return res.status(200).json({
         errCode: 0,
         errMessage: 'Error from server',
      });
   }
};
const postVerifyAppointment = async (req, res) => {
   try {
      let doctors = await patientService.postVerifyAppointment(req.body);
      return res.status(200).json(doctors);
   } catch (error) {
      console.log(error);
      return res.status(200).json({
         errCode: 0,
         errMessage: 'Error from server',
      });
   }
};
const sendRemedy = async (req, res) => {
   try {
      let doctors = await patientService.sendRemedy(req.body);
      return res.status(200).json(doctors);
   } catch (error) {
      console.log(error);
      return res.status(200).json({
         errCode: 0,
         errMessage: 'Error from server',
      });
   }
};
module.exports = {
   postAppointment,
   postVerifyAppointment,
   sendRemedy,
};
