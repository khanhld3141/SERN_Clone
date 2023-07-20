import specialtyService from '../services/specialtyService';

const createSpecialty = async (req, res) => {
   try {
      let specialty = await specialtyService.createSpecialty(req.body);
      return res.status(200).json(specialty);
   } catch (error) {
      console.log(error);
      return res.status(200).json({
         errCode: 0,
         errMessage: 'Error from server',
      });
   }
};
const getAllSpecialty = async (req, res) => {
   try {
      let specialty = await specialtyService.getAllSpecialty();
      return res.status(200).json(specialty);
   } catch (error) {
      console.log(error);
      return res.status(200).json({
         errCode: 0,
         errMessage: 'Error from server',
      });
   }
};
const getProfileDoctorBySpecialtyId = async (req, res) => {
   try {
      let specialty = await specialtyService.getProfileDoctorBySpecialtyId(req.query.id,req.query.location);
      return res.status(200).json(specialty);
   } catch (error) {
      console.log(error);
      return res.status(200).json({
         errCode: 0,
         errMessage: 'Error from server',
      });
   }
};
module.exports = {
   createSpecialty,
   getAllSpecialty,
   getProfileDoctorBySpecialtyId,
};
