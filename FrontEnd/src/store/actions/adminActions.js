import {
   getAllCodeService,
   createNewUserService,
   getAllUsers,
   deleteUserService,
   editUserService,
   getTopDoctorHomeService,
   getAllDoctorsService,
   saveDetailDoctorService,
   getAllSpecialty,
   getAllClinic,
} from '../../services/userService';
import actionTypes from './actionTypes';
import { toast } from 'react-toastify';
export const fetchGenderStart = () => {
   // 2 tham số trên của redux, không cần truyền vào
   return async (dispatch, getState) => {
      try {
         dispatch({
            type: actionTypes.FETCH_GENDER_START,
         });
         let res = await getAllCodeService('gender');
         if (res && res.errCode === 1) {
            dispatch(fetchGenderSuccess(res.data));
            //success chuyển trạng thái
         } else {
            dispatch(fetchGenderFail());
         }
      } catch (error) {
         dispatch(fetchGenderFail());
         //fail thì chuyển trạng thái sang fail
      }
   };
};
export const fetchGenderSuccess = (genderData) => ({
   type: actionTypes.FETCH_GENDER_SUCCESS,
   data: genderData,
});
export const fetchGenderFail = () => ({
   type: actionTypes.FETCH_GENDER_FAILED,
});

export const fetchPositionStart = () => {
   // 2 tham số trên của redux, không cần truyền vào
   return async (dispatch, getState) => {
      try {
         dispatch({
            type: actionTypes.FETCH_POSITION_START,
         });
         let res = await getAllCodeService('position');
         if (res && res.errCode === 1) {
            dispatch(fetchPositionSuccess(res.data));
            //success chuyển trạng thái
         } else {
            dispatch(fetchPositionFail());
         }
      } catch (error) {
         dispatch(fetchPositionFail());
         //fail thì chuyển trạng thái sang fail
      }
   };
};
export const fetchPositionSuccess = (positionData) => ({
   type: actionTypes.FETCH_POSITION_SUCCESS,
   data: positionData,
});
export const fetchPositionFail = () => ({
   type: actionTypes.FETCH_POSITION_FAILED,
});

export const fetchRoleStart = () => {
   // 2 tham số trên của redux, không cần truyền vào
   return async (dispatch, getState) => {
      try {
         dispatch({
            type: actionTypes.FETCH_ROLE_START,
         });
         let res = await getAllCodeService('role');

         if (res && res.errCode === 1) {
            dispatch(fetchRoleSuccess(res.data));
            //success chuyển trạng thái
         } else {
            dispatch(fetchRoleFail());
         }
      } catch (error) {
         dispatch(fetchRoleFail());
         //fail thì chuyển trạng thái sang fail
      }
   };
};
export const fetchRoleSuccess = (roleData) => ({
   type: actionTypes.FETCH_ROLE_SUCCESS,
   data: roleData,
});
export const fetchRoleFail = () => ({
   type: actionTypes.FETCH_POSITION_FAILED,
});

export const createNewUser = (data) => {
   return async (dispatch, getState) => {
      try {
         let res = await createNewUserService(data);
         console.log(res);
         if (res && res.errCode === 1) {
            toast.success('Created user successfully');
            dispatch(saveUserSuccess());
            dispatch(fetchAllUserStart());

            //config ở file App.js
            //success chuyển trạng thái
         } else {
            toast.error(res.message);
            dispatch(saveUserFailed());
         }
      } catch (error) {
         toast.error('Failed to create user');
         dispatch(saveUserFailed());
         //fail thì chuyển trạng thái sang fail
      }
   };
};
export const saveUserSuccess = () => ({
   type: actionTypes.CREATE_USER_SUCCESS,
});
export const saveUserFailed = () => ({
   type: actionTypes.CREATE_USER_FAILED,
});

export const fetchAllUserStart = () => {
   // 2 tham số trên của redux, không cần truyền vào
   return async (dispatch, getState) => {
      try {
         let res = await getAllUsers('all');
         if (res && res.errCode === 1) {
            let users = res.users.reverse();
            dispatch(fetchAllUserSuccess(users));
            //success chuyển trạng thái
         } else {
            toast.error('Fetch all users failed');
            dispatch(fetchAllUserFail());
         }
      } catch (error) {
         toast.error('Fetch all users failed');
         dispatch(fetchAllUserFail());
         //fail thì chuyển trạng thái sang fail
      }
   };
};
export const fetchAllUserSuccess = (data) => ({
   users: data,
   type: actionTypes.FETCH_ALL_USERS_SUCCESS,
});
export const fetchAllUserFail = () => ({
   type: actionTypes.FETCH_ALL_USERS_FAILED,
});

export const deleteUser = (userId) => {
   return async (dispatch, getState) => {
      try {
         let res = await deleteUserService(userId);
         if (res && res.errCode === 1) {
            toast.success('Deleted user successfully');
            dispatch(deleteUserSuccess());
            dispatch(fetchAllUserStart());

            //config ở file App.js
            //success chuyển trạng thái
         } else {
            toast.error('Deleted user error');
            dispatch(deleteUserFail());
         }
      } catch (error) {
         toast.error('Deleted user error');
         dispatch(deleteUserFail());
         //fail thì chuyển trạng thái sang fail
      }
   };
};
export const deleteUserSuccess = () => ({
   type: actionTypes.DELETE_USERS_SUCCESS,
});
export const deleteUserFail = () => ({
   type: actionTypes.DELETE_USERS_FAILED,
});

export const editUser = (data) => {
   return async (dispatch, getState) => {
      try {
         let res = await editUserService(data);
         if (res && res.errCode === 1) {
            toast.success('Edited user successfully');
            dispatch(editUserSuccess());
            dispatch(fetchAllUserStart());

            //config ở file App.js
            //success chuyển trạng thái
         } else {
            dispatch(editUserFailed());
         }
      } catch (error) {
         dispatch(editUserFailed());
         toast.error('Edited user error');
         //fail thì chuyển trạng thái sang fail
      }
   };
};
export const editUserSuccess = (data) => ({
   type: actionTypes.EDIT_USERS_SUCCESS,
});
export const editUserFailed = () => ({
   type: actionTypes.EDIT_USERS_FAILED,
});

// let res1 = await getTopDoctorHome(3);

export const fetchTopDoctor = () => {
   return async (dispatch, getState) => {
      try {
         let res = await getTopDoctorHomeService('');
         if (res && res.errCode === 1) {
            dispatch({
               type: actionTypes.FETCH_TOP_DOCTOR_SUCCESS,
               dataDoctors: res.data,
            });
         } else {
            dispatch({
               type: actionTypes.FETCH_TOP_DOCTOR_FAILED,
            });
         }
      } catch (error) {
         console.log('FETCH_TOP_DOCTOR_ERROR', error);
         dispatch({
            type: actionTypes.FETCH_TOP_DOCTOR_FAILED,
         });
      }
   };
};
export const fetchAllDoctor = () => {
   return async (dispatch, getState) => {
      try {
         let res = await getAllDoctorsService();
         if (res && res.errCode === 1) {
            dispatch({
               type: actionTypes.FETCH_ALL_DOCTOR_SUCCESS,
               dataDr: res.data,
            });
         } else {
            dispatch({
               type: actionTypes.FETCH_ALL_DOCTOR_FAILED,
            });
         }
      } catch (error) {
         console.log('FETCH_ALL_DOCTOR_ERROR', error);
         dispatch({
            type: actionTypes.FETCH_ALL_DOCTOR_FAILED,
         });
      }
   };
};
export const saveDetailDoctor = (data) => {
   return async (dispatch, getState) => {
      try {
         let res = await saveDetailDoctorService(data);
         if (res && res.errCode === 1) {
            toast.success('Save information detail doctor successfully');
            dispatch({
               type: actionTypes.SAVE_DETAIL_DOCTOR_SUCCESS,
            });
         } else {
            
            toast.error('Save information detail doctor failed');
            dispatch({
               type: actionTypes.SAVE_DETAIL_DOCTOR_FAILED,
            });
         }
      } catch (error) {
         toast.error('Save information detail doctor failed');
         console.log('SAVE_DETAIL_DOCTOR_FAILED', error);
         dispatch({
            type: actionTypes.SAVE_DETAIL_DOCTOR_FAILED,
         });
      }
   };
};
export const fetchAllScheduleTime = () => {
   return async (dispatch, getState) => {
      try {
         let res = await getAllCodeService('TIME');
         if (res && res.errCode === 1) {
            dispatch({
               type: actionTypes.FETCH_ALLCODE_SCHEDULE_TIME_SUCCESS,
               dataTime: res.data,
            });
         } else {
            dispatch({
               type: actionTypes.FETCH_ALLCODE_SCHEDULE_TIME_FAILED,
            });
         }
      } catch (error) {
         console.log('FETCH_ALL_DOCTOR_ERROR', error);
         dispatch({
            type: actionTypes.FETCH_ALLCODE_SCHEDULE_TIME_FAILED,
         });
      }
   };
};
export const fetchDoctorPriceStart = () => {
   // 2 tham số trên của redux, không cần truyền vào
   return async (dispatch, getState) => {
      try {
         dispatch({
            type: actionTypes.FETCH_DOCTOR_PRICE_START,
         });
         let res = await getAllCodeService('price');
         if (res && res.errCode === 1) {
            dispatch(fetchDoctorPriceSuccess(res.data));
            //success chuyển trạng thái
         } else {
            dispatch(fetchDoctorPriceFailed());
         }
      } catch (error) {
         dispatch(fetchDoctorPriceFailed());
         //fail thì chuyển trạng thái sang fail
      }
   };
};
export const fetchDoctorPriceSuccess = (doctorPriceData) => ({
   type: actionTypes.FETCH_DOCTOR_PRICE_SUCCESS,
   data: doctorPriceData,
});
export const fetchDoctorPriceFailed = () => ({
   type: actionTypes.FETCH_DOCTOR_PRICE_FAILED,
});

export const fetchPaymentStart = () => {
   // 2 tham số trên của redux, không cần truyền vào
   return async (dispatch, getState) => {
      try {
         dispatch({
            type: actionTypes.FETCH_PAYMENT_START,
         });
         let res = await getAllCodeService('payment');
         if (res && res.errCode === 1) {
            dispatch(fetchPaymentSuccess(res.data));
            //success chuyển trạng thái
         } else {
            dispatch(fetchPaymentFailed());
         }
      } catch (error) {
         dispatch(fetchPaymentFailed());
         //fail thì chuyển trạng thái sang fail
      }
   };
};
export const fetchPaymentSuccess = (doctorPayment) => ({
   type: actionTypes.FETCH_PAYMENT_SUCCESS,
   data: doctorPayment,
});
export const fetchPaymentFailed = () => ({
   type: actionTypes.FETCH_PAYMENT_FAILED,
});

export const fetchProvinceStart = () => {
   // 2 tham số trên của redux, không cần truyền vào
   return async (dispatch, getState) => {
      try {
         dispatch({
            type: actionTypes.FETCH_PROVINCE_START,
         });
         let res = await getAllCodeService('province');
         if (res && res.errCode === 1) {
            dispatch(fetchProvinceSuccess(res.data));
            //success chuyển trạng thái
         } else {
            dispatch(fetchProvinceFailed());
         }
      } catch (error) {
         dispatch(fetchProvinceFailed());
         //fail thì chuyển trạng thái sang fail
      }
   };
};
export const fetchProvinceSuccess = (doctorProvince) => ({
   type: actionTypes.FETCH_PROVINCE_SUCCESS,
   data: doctorProvince,
});
export const fetchProvinceFailed = () => ({
   type: actionTypes.FETCH_PROVINCE_FAILED,
});

export const fetchSpecialty = () => {
   // 2 tham số trên của redux, không cần truyền vào
   return async (dispatch, getState) => {
      try {
         dispatch({
            type: actionTypes.FETCH_SPECIALTY_START,
         });
         let res = await getAllSpecialty();
         if (res && res.errCode === 1) {
            dispatch(fetchSpecialtySuccess(res.data));
            //success chuyển trạng thái
         } else {
            dispatch(fetchSpecialtyFailed());
         }
      } catch (error) {
         dispatch(fetchSpecialtyFailed());
         //fail thì chuyển trạng thái sang fail
      }
   };
};
export const fetchSpecialtySuccess = (doctorSpecialty) => ({
   type: actionTypes.FETCH_SPECIALTY_SUCCESS,
   data: doctorSpecialty,
});
export const fetchSpecialtyFailed = () => ({
   type: actionTypes.FETCH_SPECIALTY_FAILED,
});

export const fetchClinic = () => {
   // 2 tham số trên của redux, không cần truyền vào
   return async (dispatch, getState) => {
      try {
         dispatch({
            type: actionTypes.FETCH_CLINIC_START,
         });
         let res = await getAllClinic();
         if (res && res.errCode === 1) {
            dispatch(fetchClinicSuccess(res.data));
            //success chuyển trạng thái
         } else {
            dispatch(fetchClinicFailed());
         }
      } catch (error) {
         dispatch(fetchClinicFailed());
         //fail thì chuyển trạng thái sang fail
      }
   };
};
export const fetchClinicSuccess = (doctorClinic) => ({
   type: actionTypes.FETCH_CLINIC_SUCCESS,
   data: doctorClinic,
});
export const fetchClinicFailed = () => ({
   type: actionTypes.FETCH_CLINIC_FAILED,
});
