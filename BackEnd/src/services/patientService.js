import db from '../../models/index';
require('dotenv').config();
import _ from 'lodash';
import { v4 as uuidv4 } from 'uuid';
import emailService from './emailService';

const buildUrlEmail = (doctorId, token) => {
   let result = `${process.env.URL_REACT}/verify-booking?token=${token}&doctorId=${doctorId}`;
   return result;
};

const postAppointment = (data) => {
   return new Promise(async (resolve, reject) => {
      console.log(data);
      try {
         if (!data || !data.email || !data.doctorId || !data.date || !data.timeType || !data.fullName) {
            resolve({
               errCode: 0,
               errMessage: 'Missing required parameters',
            });
         } else {
            let token = uuidv4();
            await emailService.sendSimpleEmail({
               receiverEmail: data.email,
               patientName: data.fullName,
               time: data.timeString,
               doctor: data.nameDoctor,
               language: data.language,
               redirectLink: buildUrlEmail(data.doctorId, token),
            });

            //upsert user
            let user = await db.User.findOrCreate({
               where: { email: data.email },
               defaults: { email: data.email, phoneNumber: data.phoneNumber, address: data.address, roleId: 'R3' },
            });
            if (user && user[0]) {
               await db.Booking.findOrCreate({
                  where: { patientId: user[0].id },
                  defaults: {
                     statusId: 'S1',
                     doctorId: data.doctorId,
                     patientId: user[0].id,
                     date: data.date,
                     timeType: data.timeType,
                     token: token,
                     reason: data.reason,
                  },
               });
            }

            resolve({
               errCode: 1,
               errMessage: 'Successfully created',
            });
         }
      } catch (error) {
         reject(error);
      }
   });
};

const postVerifyAppointment = (data) => {
   return new Promise(async (resolve, reject) => {
      try {
         if (!data.doctorId || !data.token) {
            resolve({
               errCode: 0,
               errMessage: 'Missing required parameters',
            });
         } else {
            let appointment = await db.Booking.findOne({
               where: {
                  doctorId: data.doctorId,
                  token: data.token,
                  statusId: 'S1',
               },
               raw: false,
            });
            if (appointment) {
               appointment.statusId = 'S2';
               await appointment.save();
               resolve({
                  errCode: 1,
                  errMessage: 'Confirmed',
               });
            } else {
               resolve({
                  errCode: 0,
                  errMessage: 'Not found or confirmed',
               });
            }
         }
      } catch (error) {
         reject(error);
      }
   });
};
const sendRemedy = (data) => {
   return new Promise(async (resolve, reject) => {
      try {
         if (!data.imageBase64) {
            resolve({
               errCode: 0,
               errMessage: 'Missing required parameters',
            });
         } else {
            await emailService.sendRemedyEmail(data);
            resolve({
               errCode:1,
               errMessage:'Successfully sent remedy'
            })
         }
      } catch (error) {
         reject(error);
      }
   });
};
module.exports = {
   postAppointment,
   postVerifyAppointment,
   sendRemedy,
};
