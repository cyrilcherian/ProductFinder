import axios from 'axios';
import returnHeader from '../utils/returnHeader';
const Config = require('../config');
const url = Config.baseUrl;

const deleteProductFailure = () => ({
  type: 'DELETE_PRODUCT_FAILURE'
});

const deleteProductSuccess = (productId) => ({
  type: 'DELETE_PRODUCT_SUCCESS',
  payload: productId
});

export const deleteProduct = (deviceId, productId, token) => {
  return (dispatch) => {
    axios.post(url + '/product/delete?deviceId=' + deviceId + '&productId=' + productId,
      {}, returnHeader(token)
    )
      .then((response) => {
        dispatch(deleteProductSuccess(productId));
      })
      .catch((error) => {
        console.log(error)
        dispatch(deleteProductFailure());
      });
  }
}