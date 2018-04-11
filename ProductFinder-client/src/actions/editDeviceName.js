import axios from 'axios';
import returnHeader from '../utils/returnHeader';
const Config = require('../config');
const url = Config.baseUrl;

const editDeviceNameFailure = () => ({
  type: 'EDIT_DEVICE_NAME_FAILURE'
});

const editDeviceNameSuccess = () => ({
  type: 'EDIT_DEVICE_NAME_SUCCESS'
});

export const editDeviceName = (deviceId, value, token) => {
  return (dispatch) => {
    axios.put(url + '/device/edit',{
      "deviceId": deviceId,
      "name": value
    },
    returnHeader(token)
  )
      .then((response) => {
        dispatch(editDeviceNameSuccess());
      })
      .catch((error) => {
        console.log(error)
        dispatch(editDeviceNameFailure());
      });
  }
}