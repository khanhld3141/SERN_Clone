import db from '../../models/index';
require('dotenv').config();
import _ from 'lodash';
const MAX_NUMBER_SCHEDULE = process.env.MAX_NUMBER_SCHEDULE;
const getTopDoctorHome = (limit) => {
   return new Promise(async (resolve, reject) => {
      try {
         let users = await db.User.findAll({
            limit: limit,
            order: [['createdAt', 'DESC']],
            attributes: {
               exclude: ['password'],
            },
            where: { roleId: 'R2' },
            include: [
               { model: db.Allcode, as: 'positionData', attributes: ['valueEn', 'valueVi'] },
               { model: db.Allcode, as: 'genderData', attributes: ['valueEn', 'valueVi'] },
            ],
            raw: true,
            nest: true,
         });
         resolve({
            errCode: 1,
            data: users,
         });
      } catch (error) {
         reject(error);
      }
   });
};
const getAllDoctors = () => {
   return new Promise(async (resolve, reject) => {
      try {
         let doctors = await db.User.findAll({
            where: {
               roleId: 'R2',
            },
            attributes: {
               exclude: ['password', 'image'],
            },
         });
         // console.log(doctors);
         resolve({
            errCode: 1,
            data: doctors,
         });
      } catch (error) {
         reject(error);
      }
   });
};
const saveDetailInfoDoctor = (inputData) => {
   return new Promise(async (resolve, reject) => {
      try {
         if (
            !inputData.nameClinic ||
            !inputData.addressClinic ||
            !inputData.note ||
            !inputData.selectedProvince ||
            !inputData.selectedPayment ||
            !inputData.selectedPrice ||
            !inputData.doctorId ||
            !inputData.contentHTML ||
            !inputData.contentMarkDown ||
            !inputData.action ||
            // !inputData.clinicId||
            !inputData.selectedSpecialty
         ) {
            resolve({
               errCode: 0,
               errMessage: 'Missing parameter',
            });
         } else {
            //markdown table
            if (inputData.action === 'CREATE') {
               await db.MarkDown.create({
                  contentHTML: inputData.contentHTML,
                  contentMarkDown: inputData.contentMarkDown,
                  description: inputData.description,
                  doctorId: inputData.doctorId,
               });
            } else if (inputData.action === 'EDIT') {
               let doctorMarkDown = await db.MarkDown.findOne({
                  where: { doctorId: inputData.doctorId },
                  raw: false,
               });
               if (!doctorMarkDown) {
                  resolve({
                     errCode: 0,
                     errMessage: 'Doctor not found',
                  });
               }
               doctorMarkDown.contentHTML = inputData.contentHTML;
               doctorMarkDown.contentMarkDown = inputData.contentMarkDown;
               doctorMarkDown.description = inputData.description;
               // await db.MarkDown.update(doctorMarkDown, {
               //    where: { doctorId: inputData.doctorId },
               // });
               await doctorMarkDown.save();
               //nếu muốn sử dụng doctorMarkDown.save() thì bỏ thuộc tính raw:true thành false
            }
            let doctorInfo = await db.DoctorInfo.findOne({
               where: { doctorId: inputData.doctorId },
               raw: false,
            });
            if (doctorInfo) {
               //update
               doctorInfo.priceId = inputData.selectedPrice;
               doctorInfo.provinceId = inputData.selectedProvince;
               doctorInfo.paymentId = inputData.selectedPayment;

               doctorInfo.note = inputData.note;
               doctorInfo.addressClinic = inputData.addressClinic;
               doctorInfo.nameClinic = inputData.nameClinic;
               doctorInfo.clinicId = inputData.selectedClinic;
               doctorInfo.specialtyId = inputData.selectedSpecialty;
               await doctorInfo.save();
            } else {
               //create
               await db.DoctorInfo.create({
                  doctorId: inputData.doctorId,
                  priceId: inputData.selectedPrice,
                  provinceId: inputData.selectedProvince,
                  paymentId: inputData.selectedPayment,

                  note: inputData.note,
                  addressClinic: inputData.addressClinic,
                  nameClinic: inputData.nameClinic,
                  clinicId: inputData.selectedClinic || '',
                  specialtyId: inputData.selectedSpecialty || '',
               });
            }
            resolve({
               errCode: 1,
               errMessage: 'Save information doctor successfully',
            });
         }
      } catch (error) {
         reject(error);
      }
   });
};
const getDetailDoctorById = (id) => {
   return new Promise(async (resolve, reject) => {
      try {
         if (!id) {
            resolve({
               errCode: 0,
               errMessage: 'Missing parameter',
            });
         } else {
            let data = await db.User.findOne({
               where: { id: id },
               attributes: {
                  exclude: ['password'],
               },
               include: [
                  {
                     model: db.DoctorInfo,
                     attributes: { exclude: ['id', 'doctorId'] },
                     include: [
                        { model: db.Allcode, as: 'priceTypeData', attributes: ['valueEn', 'valueVi'] },
                        { model: db.Allcode, as: 'provinceTypeData', attributes: ['valueEn', 'valueVi'] },
                        { model: db.Allcode, as: 'paymentTypeData', attributes: ['valueEn', 'valueVi'] },
                     ],
                  },
                  { model: db.MarkDown, attributes: ['description', 'contentHTML', 'contentMarkDown'] },
                  { model: db.Allcode, as: 'positionData', attributes: ['valueEn', 'valueVi'] },
               ],
               raw: false,
               nest: true,
            });
            //nest:true tức là nếu trong data trả về có 1 obj nó sẽ k tách obj đó ra dang obj.key
            if (!data) {
               resolve({
                  errCode: 0,
                  errMessage: 'User not found',
               });
            }
            if (data && data.image) {
               data.image = new Buffer(data.image, 'base64').toString('binary');
            }
            resolve({
               errCode: 1,
               data: data,
            });
         }
      } catch (error) {
         reject(error);
      }
   });
};
const bulkCreateSchedule = (data) => {
   return new Promise(async (resolve, reject) => {
      try {
         if (!data || !data.arrSchedule || !data.doctorId || !data.date) {
            resolve({
               errCode: 0,
               errMessage: 'Missing parameter',
            });
         } else {
            let schedule = data.arrSchedule;

            schedule = schedule.map((item) => {
               item.maxNumber = MAX_NUMBER_SCHEDULE;
               return item;
            });
            console.log('schedule', schedule);
            let existing = await db.Schedule.findAll({
               where: { doctorId: data.doctorId, date: data.date },
               attributes: ['timeType', 'date', 'doctorId', 'maxNumber'],

               raw: true,
            });

            console.log('existing', existing);
            let toCreate = _.differenceWith(schedule, existing, (a, b) => {
               return a.timeType === b.timeType && +a.date === +b.date;
            });
            console.log('toCreate', toCreate);
            if (toCreate && toCreate.length > 0) {
               await db.Schedule.bulkCreate(toCreate);
            }
            resolve({
               errCode: 1,
               errMessage: 'Successfully',
            });
         }
      } catch (error) {
         console.log(error);
         reject(error);
      }
   });
};
const getScheduleByDate = (doctorId, date) => {
   return new Promise(async (resolve, reject) => {
      try {
         if (!doctorId || !date) {
            resolve({
               errCode: 0,
               errMessage: 'Missing parameter',
            });
         } else {
            let dataSchedule = await db.Schedule.findAll({
               where: { doctorId: doctorId, date: date },
               include: [
                  { model: db.Allcode, as: 'timeTypeData', attributes: ['valueEn', 'valueVi'] },
                  { model: db.User, as: 'doctorData', attributes: ['firstName', 'lastName'] },
               ],

               raw: false,
               nest: true,
            });
            if (!dataSchedule) {
               dataSchedule = [];
            }
            resolve({
               errCode: 1,
               data: dataSchedule,
            });
         }
      } catch (error) {
         console.log(error);
         reject(error);
      }
   });
};
const getExtraInfoDoctorById = (doctorId) => {
   return new Promise(async (resolve, reject) => {
      try {
         if (!doctorId) {
            resolve({
               errCode: 0,
               errMessage: 'Missing parameter',
            });
         } else {
            let data = await db.DoctorInfo.findOne({
               where: { doctorId: doctorId },
               attributes: { exclude: ['id', 'doctorId'] },
               include: [
                  { model: db.Allcode, as: 'priceTypeData', attributes: ['valueEn', 'valueVi'] },
                  { model: db.Allcode, as: 'provinceTypeData', attributes: ['valueEn', 'valueVi'] },
                  { model: db.Allcode, as: 'paymentTypeData', attributes: ['valueEn', 'valueVi'] },
               ],
               raw: false,
               nest: true,
            });
            if (!data) data = [];
            resolve({
               errCode: 1,
               data: data,
            });
         }
      } catch (error) {
         reject(error);
      }
   });
};
const getProfileDoctorById = (doctorId) => {
   return new Promise(async (resolve, reject) => {
      try {
         if (!doctorId) {
            resolve({
               errCode: 0,
               errMessage: 'Missing parameter',
            });
         } else {
            let data = await db.User.findOne({
               where: { id: doctorId },
               attributes: {
                  exclude: ['password'],
               },
               include: [
                  {
                     model: db.DoctorInfo,
                     attributes: { exclude: ['id', 'doctorId'] },
                     include: [
                        { model: db.Allcode, as: 'priceTypeData', attributes: ['valueEn', 'valueVi'] },
                        { model: db.Allcode, as: 'provinceTypeData', attributes: ['valueEn', 'valueVi'] },
                        { model: db.Allcode, as: 'paymentTypeData', attributes: ['valueEn', 'valueVi'] },
                     ],
                  },
                  { model: db.MarkDown, attributes: ['description', 'contentHTML', 'contentMarkDown'] },
                  { model: db.Allcode, as: 'positionData', attributes: ['valueEn', 'valueVi'] },
               ],
               raw: false,
               nest: true,
            });
            //nest:true tức là nếu trong data trả về có 1 obj nó sẽ k tách obj đó ra dang obj.key
            if (!data) {
               resolve({
                  errCode: 0,
                  errMessage: 'User not found',
               });
            }
            if (data && data.image) {
               data.image = new Buffer(data.image, 'base64').toString('binary');
            }
            resolve({
               errCode: 1,
               data: data,
            });
         }
      } catch (error) {
         reject(error);
      }
   });
};
const getSchedulePatient = (doctorId, date) => {
   return new Promise(async (resolve, reject) => {
      try {
         if (!doctorId || !date) {
            resolve({
               errCode: 0,
               errMessage: 'Missing required parameter',
            });
         } else {
            let data = await db.Booking.findAll({
               where: {
                  doctorId: doctorId,
                  date: date,
                  statusId: 'S2',
               },
               include: [
                  { model: db.User, attributes: ['email', 'phoneNumber', 'address'] },
                  { model: db.Allcode, as: 'timeTypeDataBooking', attributes: ['valueEn', 'valueVi'] },
               ],
               raw: false,
               nest: true,
            });
            if (data) {
               resolve({
                  errCode: 1,
                  data,
               });
            } else {
               resolve({
                  errCode: 0,
                  errMessage: 'Not found schedule patient on this day',
               });
            }
         }
      } catch (error) {
         reject(error);
      }
   });
};
const commitSchedulePatient = (data) => {
   return new Promise(async (resolve, reject) => {
      try {
         if (!data.type || !data.doctorId || !data.date || !data.patientId || !data.timeType) {
            resolve({
               errCode: 0,
               errMessage: 'Missing required parameters',
            });
         } else {
            let patient = await db.Booking.findOne({
               where: {
                  doctorId: data.doctorId,
                  patientId: data.patientId,
                  date: data.date,
                  timeType: data.timeType,
               },
               raw: false,
            });
            if (patient) {
               patient.statusId = data.type === 'confirm' ? 'S3' : 'S4';
               await patient.save();
               resolve({
                  errCode: 1,
                  errMessage: data.type === 'confirm' ? 'Confirmed' : 'Cancelled',
               });
            } else
               resolve({
                  errCode: 0,
                  errMessage: 'Patient not found',
               });
         }
      } catch (error) {
         reject(error);
      }
   });
};
const sendRemedy = (data) => {
   return new Promise(async (resolve, reject) => {
      try {
           if(!data||!data.email||!data.doctorId||!data.patientId){
                
           }
      } catch (error) {
         reject(error);
      }
   });
};
module.exports = {
   getTopDoctorHome,
   getAllDoctors,
   saveDetailInfoDoctor,
   getDetailDoctorById,
   bulkCreateSchedule,
   getScheduleByDate,
   getExtraInfoDoctorById,
   getProfileDoctorById,
   getSchedulePatient,
   commitSchedulePatient,
   sendRemedy,
};
