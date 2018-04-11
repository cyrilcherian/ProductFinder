import {
  loadUserState
} from '../utils/storageUtils';

const initialState = {...loadUserState().userDetails, loginStatus: loadUserState().loginStatus} || {};

export default function (state = initialState, action) {
  switch (action.type) {
    case 'USER_LOGIN_START': return 'LOADING';
    case 'USER_UNAUTHORISED': return 'UNAUTHORISED';
    case 'USER_LOGGED_IN': return {...action.userDetails, loginStatus: action.loginStatus };
    case 'USER_LOGGED_OUT': return { loginStatus: false };
    default: return state;
  }
}