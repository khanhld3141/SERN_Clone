import clinicService from '../services/clinicService';

const createNewClinic = async (req, res) => {
   try {
      let clinic = await clinicService.createClinic(req.body);
      return res.status(200).json(clinic);
   } catch (error) {
      console.log(error);
      return res.status(200).json({
         errCode: 0,
         errMessage: 'Error from server',
      });
   }
};
const getAllClinic = async (req, res) => {
   try {
      let clinic = await clinicService.getAllClinic();
      return res.status(200).json(clinic);
   } catch (error) {
      console.log(error);
      return res.status(200).json({
         errCode: 0,
         errMessage: 'Error from server',
      });
   }
};
const getProfileDoctorByClinicId = async (req, res) => {
   try {
      console.log(req.query.id);
      let clinic = await clinicService.getProfileDoctorByClinicId(req.query.id);
      return res.status(200).json(clinic);
   } catch (error) {
      console.log(error);
      return res.status(200).json({
         errCode: 0,
         errMessage: 'Error from server',
      });
   }
};

module.exports = {
   createNewClinic,
   getAllClinic,
   getProfileDoctorByClinicId,
};
