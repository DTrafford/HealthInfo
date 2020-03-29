import * as actionTypes from "./action";

const initState = {
  user: {
    isAuthenticated: false,
    shouldRedirect: false,
    user: null,
    userType: null,
    patientList: null,
    healthTips: null,
    posts: null,
    loadedResults: null,
    conditions: null
  }
};

export function user(state = initState, action) {
  switch (action.type) {
    case actionTypes.LOGIN:
      let userType = "";
      if (action.user.data.designation) {
        userType = "EM";
      } else {
        userType = "PT";
      }
      return {
        ...state,
        isAuthenticated: true,
        shouldRedirect: true,
        user: action.user.data,
        userType: userType
      };
    case actionTypes.LOGOUT:
      return {
        ...state,
        isAuthenticated: false,
        shouldRedirect: true,
        user: null,
        userType: null
      };
    case actionTypes.GETPATIENTS:
      return {
        ...state,
        patientList: action.patients.data.patients
      };
    case actionTypes.GETPATIENT:
      return {
        ...state,
        loadedResults: action.patient.data.healthData
      };
    case actionTypes.CREATETIP:
      return {
        ...state
      };
    case actionTypes.GETTIPS:
      return {
        ...state,
        healthTips: action.tips.data.tips
      };
    case actionTypes.CREATEPOST:
      return {
        ...state
      };
    case actionTypes.ADDREPLY:
      return {
        ...state
      };
    case actionTypes.GETPOSTS:
      return {
        ...state,
        posts: action.posts.data.posts
      };
    case actionTypes.DELETETIP:
      state.healthTips.splice(state.healthTips.indexOf(action.tip), 1);
      return {
        ...state,
        healthTips: state.healthTips
      };
    case actionTypes.GETCONDITIONS:
      return {
        ...state,
        conditions: action.conditions.data.conditions
      };
    default:
      return state;
  }
}
