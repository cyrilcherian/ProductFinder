import axios from 'axios';
import returnHeader from '../utils/returnHeader';
const Config = require('../config');
const url = Config.baseUrl;

const editProductLocationFailure = () => ({
  type: 'EDIT_PRODUCT_LOCATION_FAILURE'
});

const editProductLocationSuccess = () => ({
  type: 'EDIT_PRODUCT_LOCATION_SUCCESS'
});

export const editProductLocation = (deviceId, productId, value, token) => {
  return (dispatch) => {
    axios.put(url + '/product/edit', {
      "deviceId": deviceId,
      "productId": productId,
      "location": value
    },
      returnHeader(token)
    )
      .then((response) => {
        dispatch(editProductLocationSuccess());
      })
      .catch((error) => {
        console.log(error)
        dispatch(editProductLocationFailure());
      });
  }
}