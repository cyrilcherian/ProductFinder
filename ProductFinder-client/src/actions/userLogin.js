import axios from 'axios';
import {
  saveUserDetails,
  removeUserDetails,
  loadToken,
  loadUserState
} from '../utils/storageUtils';
const Config = require('../config');
const url = Config.baseUrl;


export const setUserToken = () => {
  const token = loadToken();
  return {
    type: 'GET_USER_TOKEN',
    payload: token
  };
};

export const fetchUserToken = (googleResponse, routeToHome, alexaParams) => {
  return (dispatch) => {
    dispatch(userLogInStart());
    var isAlexa = Object.keys(alexaParams).length !== 0 ? true : false;
    axios.post(url + '/user/login', {
        tokenId: googleResponse.tokenId,
        isAlexa
      })
    .then((response) => {
      if (response.data.status === 200 || isAlexa) {
        if (isAlexa) {
          window.location = decodeURIComponent(`${alexaParams.redirect_uri}` +
          `#access_token=${response.data.token}` +
          `&state=${alexaParams.state}` +
          `&token_type=BearerToken`);
        }
        else {
          const userDetails = {
            userId: response.data.userId,
            userName: googleResponse.profileObj.name,
            imageUrl: googleResponse.profileObj.imageUrl
          };
          saveUserDetails(response.data.token, userDetails);
          dispatch(userLogInStatus());
          dispatch(setUserToken());
          routeToHome.push('/home');
        }
      }
      else if (response.data.status === 403) {
        // showInfo();
        dispatch(userUnauthorised());
      }
    })
    .catch(() => {
      console.error('Google Login Failed');
    });
  };
};

export const userLogInStatus = () => {
  return {
    type: 'USER_LOGGED_IN',
    ...loadUserState()
  }
};

const logOutSuccess = () => ({
  type: 'USER_LOGGED_OUT'
});

const userLogInStart = () => ({
  type: 'USER_LOGIN_START'
});

export const logOutUser = () => (dispatch) => {
  removeUserDetails();
  dispatch(logOutSuccess());
}

const userUnauthorised = () => ({
  type: 'USER_UNAUTHORISED'
})