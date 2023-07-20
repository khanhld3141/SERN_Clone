import db from '../../models';

const createClinic = (data) => {
   return new Promise(async (resolve, reject) => {
      try {
         if (!data.name || !data.address || !data.descriptionHTML || !data.descriptionMarkdown || !data.imageBase64) {
            resolve({
               errCode: 0,
               errMessage: 'Missing required parameter',
            });
         } else {
            await db.Clinic.create({
               name: data.name,
               address: data.address,
               descriptionHTML: data.descriptionHTML,
               descriptionMarkDown: data.descriptionMarkdown,
               image: data.imageBase64,
            });
            resolve({
               errCode: 1,
               errMessage: 'Create clinic successfully',
            });
         }
      } catch (error) {
         reject(error);
      }
   });
};
const getAllClinic = () => {
   return new Promise(async (resolve, reject) => {
      try {
         let data = await db.Clinic.findAll({});
         if (data && data.length > 0) {
            data.map((item) => {
               item.image = new Buffer(item.image, 'base64').toString('binary');
            });
            resolve({
               errCode: 1,
               data,
            });
         } else {
            resolve({
               errCode: 0,
               errMessage: 'Clinic not found',
            });
         }
      } catch (error) {
         reject(error);
      }
   });
};
const getProfileDoctorByClinicId = (id) => {
   return new Promise(async (resolve, reject) => {
      try {
         if (!id) {
            resolve({
               errCode: 0,
               errMessage: 'Missing required parameter',
            });
         } else {
            let data = await db.Clinic.findOne({
               where: { id: id },
            });
            if (data) {
               data.image=new Buffer(data.image, 'base64').toString('binary');
               let doctorClinic = await db.DoctorInfo.findAll({
                  where: { clinicId: id },
               });
               if (doctorClinic) {
                  data.doctorClinic = doctorClinic;
               }
               resolve({
                  errCode: 1,
                  data,
               });
            }
         }
      } catch (error) {
         reject(error);
      }
   });
};
module.exports = {
   createClinic,
   getAllClinic,
   getProfileDoctorByClinicId,
};
