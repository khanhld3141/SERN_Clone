import axios from '../axios';
const handleLogin = (email, password) => {
   return axios.post('/api/login', { email, password });
};
export const getAllUsers = (id) => {
   return axios.get(`/api/get-all-users?id=${id}`);
};
export const createNewUserService = (data) => {
   return axios.post('/api/create-new-user', data);
};
export const deleteUserService = (id) => {
   return axios.delete('/api/delete-user', {
      data: {
         id,
      },
   });
};
export const editUserService = (data) => {
   return axios.put('/api/edit-user', data);
};
export const getAllCodeService = (inputData) => {
   return axios.get(`/api/allcode?type=${inputData}`);
};
export const getTopDoctorHomeService = (limit) => {
   return axios.get(`/api/top-doctor-home?limit=${limit}`);
};
export const getAllDoctorsService = () => {
   return axios.get(`/api/get-all-doctors`);
};
export const saveDetailDoctorService = (data) => {
   return axios.post(`/api/save-info-doctors`, data);
};
export const getDetailInfoDoctorService = (id) => {
   return axios.get(`/api/get-detail-doctor-by-id?id=${id}`);
};
export const saveBulkScheduleService = (data) => {
   return axios.post(`/api/bulk-create-schedule`,data);
};
export const getScheduleDoctorByDateService = (doctorId,date) => {
   return axios.get(`/api/get-schedule-by-date?doctorId=${doctorId}&date=${date}`);
};
export const getExtraInfoDoctorById = (doctorId) => {
   return axios.get(`/api/get-extra-info-doctor-by-id?doctorId=${doctorId}`);
};
export const getProfileDoctorById = (doctorId) => {
   return axios.get(`/api/get-profile-doctor-by-id?doctorId=${doctorId}`);
};
export const postAppointment = (data) => {
   return axios.post(`/api/patient-book-appointment`,data);
};
export const postVerifyBooking = (data) => {
   return axios.post(`/api/verify-book-appointment`,data);
};
export const createNewSpecialty = (data) => {
   return axios.post(`/api/create-new-specialty`,data);
};
export const getAllSpecialty = () => {
   return axios.get(`/api/get-all-specialty`);
};
export const getProfileDoctorBySpecialtyId = (specialtyId,location) => {
   return axios.get(`/api/get-profile-doctor-by-specialty-id?id=${specialtyId}&location=${location}`);
};
export const createNewClinic = (data) => {
   return axios.post(`/api/create-new-clinic`,data);
};
export const getAllClinic = () => {
   return axios.get(`/api/get-all-clinic`);
};
export const getProfileDoctorByClinicId = (clinicId) => {
   return axios.get(`/api/get-profile-doctor-by-clinic-id?id=${clinicId}`);
};
export const getScheduleOfPatient = (doctorId,date) => {
   return axios.get(`/api/get-schedule-patient?doctorId=${doctorId}&date=${date}`);
};
export const commitAppointment = (data) => {
   return axios.post(`/api/commit-schedule-patient`,data);
};
export const sendRemedy = (data) => {
   return axios.post(`/api/send-remedy`,data);
};
export default handleLogin;
