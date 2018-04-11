import axios from 'axios';
import returnHeader from '../utils/returnHeader';
const Config = require('../config');
const url = Config.baseUrl;

const deRegisterDeviceFailure = () => ({
  type: 'DEREGISTER_DEVICE_FAILURE'
});

const deRegisterDeviceSuccess = (deviceId) => ({
  type: 'DEREGISTER_DEVICE_SUCCESS',
  payload: deviceId
});

export const deRegisterDevice = (deviceId, token) => {
  return (dispatch) => {
    axios.post(url + '/device/delete?deviceId=' + deviceId, 
      {}, returnHeader(token)
    )
      .then((response) => {
        dispatch(deRegisterDeviceSuccess(deviceId));
      })
      .catch((error) => {
        console.log(error)
        dispatch(deRegisterDeviceFailure());
      });
  }
}