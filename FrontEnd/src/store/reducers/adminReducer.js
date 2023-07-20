import actionTypes from '../actions/actionTypes';
const initialState = {
   isLoadingGenders: false,
   isLoadingPositions: false,
   isLoadingRoles: false,
   genders: [],
   roles: [],
   positions: [],
   doctorPrices:[],
   doctorPayments:[],
   doctorProvinces:[],
   users: [],
   topDoctors: [],
   allDoctors: [],
   allScheduleTime: [],
   specialty:[],
   clinic:[],
};

const adminReducer = (state = initialState, action) => {
   switch (action.type) {
      case actionTypes.FETCH_GENDER_START:
         state.isLoadingGenders = true;

         return {
            ...state,
         };
      case actionTypes.FETCH_GENDER_SUCCESS:
         state.genders = action.data;
         state.isLoadingGenders = false;

         return {
            ...state,
         };
      case actionTypes.FETCH_GENDER_FAILED:
         state.isLoadingGenders = false;
         state.genders = [];

         return {
            ...state,
         };

      case actionTypes.FETCH_POSITION_START:
         state.isLoadingPositions = true;

         return {
            ...state,
         };
      case actionTypes.FETCH_POSITION_SUCCESS:
         state.positions = action.data;
         state.isLoadingPositions = false;

         return {
            ...state,
         };
      case actionTypes.FETCH_POSITION_FAILED:
         state.isLoadingPositions = false;
         state.positions = [];

         return {
            ...state,
         };

      case actionTypes.FETCH_ROLE_START:
         state.isLoadingRoles = true;

         return {
            ...state,
         };
      case actionTypes.FETCH_ROLE_SUCCESS:
         state.roles = action.data;
         state.isLoadingRoles = false;

         return {
            ...state,
         };
      case actionTypes.FETCH_ROLE_FAILED:
         state.isLoadingRoles = false;
         state.roles = [];

         return {
            ...state,
         };
      case actionTypes.FETCH_DOCTOR_PRICE_START:

         return {
            ...state,
         };
      case actionTypes.FETCH_DOCTOR_PRICE_SUCCESS:
         state.doctorPrices = action.data;

         return {
            ...state,
         };
      case actionTypes.FETCH_DOCTOR_PRICE_FAILED:
         state.doctorPrices = [];

         return {
            ...state,
         };
      case actionTypes.FETCH_PAYMENT_START:

         return {
            ...state,
         };
      case actionTypes.FETCH_PAYMENT_SUCCESS:
         state.doctorPayments = action.data;

         return {
            ...state,
         };
      case actionTypes.FETCH_PAYMENT_FAILED:
         state.doctorPayments = [];

         return {
            ...state,
         };
      case actionTypes.FETCH_PROVINCE_START:

         return {
            ...state,
         };
      case actionTypes.FETCH_PROVINCE_SUCCESS:
         state.doctorProvinces = action.data;

         return {
            ...state,
         };
      case actionTypes.FETCH_PROVINCE_FAILED:
         state.doctorProvinces = [];

         return {
            ...state,
         };

      case actionTypes.FETCH_SPECIALTY_START:

         return {
            ...state,
         };
      case actionTypes.FETCH_SPECIALTY_SUCCESS:
         state.specialty = action.data;

         return {
            ...state,
         };
      case actionTypes.FETCH_SPECIALTY_FAILED:
         state.specialty = [];

         return {
            ...state,
         };

      case actionTypes.FETCH_CLINIC_START:

         return {
            ...state,
         };
      case actionTypes.FETCH_CLINIC_SUCCESS:
         state.clinic = action.data;

         return {
            ...state,
         };
      case actionTypes.FETCH_CLINIC_FAILED:
         state.clinic = [];

         return {
            ...state,
         };

      case actionTypes.FETCH_ALL_USERS_SUCCESS:
         state.users = action.users;

         return {
            ...state,
         };
      case actionTypes.FETCH_ALL_USERS_FAILED:
         state.users = [];

         return {
            ...state,
         };

      case actionTypes.FETCH_TOP_DOCTOR_SUCCESS:
         state.topDoctors = action.dataDoctors;

         return {
            ...state,
         };
      case actionTypes.FETCH_TOP_DOCTOR_FAILED:
         state.topDoctors = [];

         return {
            ...state,
         };

      case actionTypes.FETCH_ALL_DOCTOR_SUCCESS:
         state.allDoctors = action.dataDr;

         return {
            ...state,
         };
      case actionTypes.FETCH_ALL_DOCTOR_FAILED:
         state.allDoctors = [];

         return {
            ...state,
         };

      case actionTypes.FETCH_ALLCODE_SCHEDULE_TIME_SUCCESS:
         state.allScheduleTime = action.dataTime;

         return {
            ...state,
         };
      case actionTypes.FETCH_ALLCODE_SCHEDULE_TIME_FAILED:
         state.allScheduleTime = [];

         return {
            ...state,
         };
      default:
         return state;
   }
};

export default adminReducer;
