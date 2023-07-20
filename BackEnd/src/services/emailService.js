import nodemailer from 'nodemailer';
require('dotenv').config;

let sendSimpleEmail = async (dataSend) => {
   const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,
      auth: {
         // TODO: replace `user` and `pass` values from <https://forwardemail.net>
         user: process.env.EMAIL_APP,
         pass: process.env.EMAIL_APP_PASSWORD,
      },
   });
   const info = await transporter.sendMail({
      from: '"Khánh 👻" <ledinhkhanh0903@gmail.com>', // sender address
      to: dataSend.receiverEmail, // list of receivers
      subject: 'Xác nhận lịch khám bệnh ✔', // Subject line
      html: getBodyHTMLEmail(dataSend),
   });
};

const getBodyHTMLEmail = (dataSend) => {
   let result = '';
   if (dataSend.language === 'vi') {
      result = `
        <h3>Xin chào ${dataSend.patientName}</h3>
        <p>Chúng tôi đã nhận được thông tin đặt lịch khám bệnh của bạn tại Khánh's Home</p>
        <p>Thông tin đặt lịch khám bệnh:</p>
        <div><b>Thời gian: ${dataSend.time}</b></div>
        <div><b>Bác sĩ: ${dataSend.doctor}</b></div>
        <div><b>Tại địa chỉ:</b></div>

        <div>Nếu thông tin trên là đúng xin vui lòng xác nhận bằng cách nhấn vào link bên dưới để hoàn tất việc đăng kí</div>
        <a href=${dataSend.redirectLink} target="_blank">Click here</a>

        <div>Cảm ơn bạn đã tin tưởng chúng tôi. Hẹn gặp lại bạn.</div>
      `;
   } else if (dataSend.language === 'en') {
      result = `
        <h3>Goodday ${dataSend.patientName}</h3>
        <p>We have received your appointment booking information at Khanh's Home</p>
        <p>Information to schedule an appointment:</p>
        <div><b>Time: ${dataSend.time}</b></div>
        <div><b>Doctor: ${dataSend.doctor}</b></div>
        <div><b>Address:</b></div>

        <div>If the above information is correct, please confirm by clicking the link below to complete the registration</div>
        <a href=${dataSend.redirectLink} target="_blank">Click here</a>

        <div>Thank you for trusting us. See you.</div>
    `;
   }
   return result;
};
let sendRemedyEmail = async (dataSend) => {
   const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,
      auth: {
         // TODO: replace `user` and `pass` values from <https://forwardemail.net>
         user: process.env.EMAIL_APP,
         pass: process.env.EMAIL_APP_PASSWORD,
      },
   });
   console.log('dataSend', dataSend.email, dataSend.language);
   const info = await transporter.sendMail({
      from: '"Khánh 👻" <ledinhkhanh0903@gmail.com>', // sender address
      to: dataSend.email, // list of receivers
      subject: 'Đơn thuốc khám bệnh ✔', // Subject line
      html: getRemedyEmail(dataSend),
      attachments: [
         {
            filename: 'Don_thuoc.png',
            content: dataSend.imageBase64.split('base64,')[1],
            encoding: 'base64',
         },
      ],
   });
};

const getRemedyEmail = (dataSend) => {
   let result = '';
   if (dataSend.language === 'vi') {
      result = `
        <h3>Xin chào</h3>
        <p>Chúng tôi đã nhận được thông tin hoàn tất khám bệnh của bạn tại Khánh's Home</p>
        <p>Chúng tôi gửi bạn thông tin đơn thuốc của bác sĩ:</p>
        <div>Cảm ơn bạn đã tin tưởng và ủng hộ chúng tôi. Chúc bạn sức khỏe</div>
      `;
   } else if (dataSend.language === 'en') {
      result = `
      <h3>Hello</h3>
      <p>We have received your complete medical examination information at Khanh's Home</p>
      <p>We send you doctor's prescription information:</p>
      <div>Thank you for trusting and supporting us. Wish you health</div>
    `;
   }
   return result;
};
module.exports = {
   sendSimpleEmail,
   sendRemedyEmail,
};
