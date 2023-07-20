import db from '../../models';

const createSpecialty = (data) => {
   return new Promise(async (resolve, reject) => {
      try {
         if (!data || !data.name || !data.imageBase64 || !data.descriptionHTML || !data.descriptionMarkdown) {
            resolve({
               errCode: 0,
               errMessage: 'Missing required parameters',
            });
         } else {
            await db.Specialty.create({
               name: data.name,
               image: data.imageBase64,
               descriptionHTML: data.descriptionHTML,
               descriptionMarkDown: data.descriptionMarkdown,
            });
            resolve({
               errCode: 1,
               errMessage: 'Successfully ',
            });
         }
      } catch (error) {
         reject(error);
      }
   });
};
const getAllSpecialty = () => {
   return new Promise(async (resolve, reject) => {
      try {
         let data = await db.Specialty.findAll({});


         if (data && data.length > 0) {
            data.map((item) => {
               item.image = new Buffer(item.image, 'base64').toString('binary');
               return item;
            });
            resolve({
               errCode: 1,
               data,
            });
         } else {
            resolve({
               errCode: 0,
               errMessage: 'Specialty not found',
            });
         }
      } catch (error) {
         reject(error);
      }
   });
};
const getProfileDoctorBySpecialtyId = (id, location) => {
   return new Promise(async (resolve, reject) => {
      try {
         if (!id || !location) {
            resolve({
               errCode: 0,
               errMessage: 'Missing required parameter',
            });
         } else {
            let data = await db.Specialty.findOne({
               where: { id: id },
               attributes: ['descriptionHTML', 'descriptionMarkDown', 'image'],
            });
            if (location === 'all') {
               if (data) {
                  data.image = new Buffer(data.image, 'base64').toString('binary');
                  let doctorSpecialty = await db.DoctorInfo.findAll({
                     where: { specialtyId: id },
                  });
                  data.doctorSpecialty = doctorSpecialty;
                  resolve({
                     errCode: 1,
                     data,
                  });
               } else {
                  resolve({
                     errCode: 0,
                     errMessage: 'Not found',
                  });
               }
            } else {
               if (data) {
                  let doctorSpecialty = await db.DoctorInfo.findAll({
                     where: { specialtyId: id, provinceId: location },
                  });
                  data.doctorSpecialty = doctorSpecialty;
                  resolve({
                     errCode: 1,
                     data,
                  });
               } else {
                  resolve({
                     errCode: 0,
                     errMessage: 'Not found',
                  });
               }
            }
         }
      } catch (error) {
         reject(error);
      }
   });
};
module.exports = {
   createSpecialty,
   getAllSpecialty,
   getProfileDoctorBySpecialtyId,
};
