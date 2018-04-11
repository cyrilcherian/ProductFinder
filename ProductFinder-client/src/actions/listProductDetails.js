import axios from 'axios';
const Config = require('../config');
const url = Config.baseUrl;

const fetchProductListFailure = () => ({
  type: 'RECEIVE_PRODUCT_LIST_FAILURE'
});

const fetchProductListSuccess = (obj) => ({
  type: 'RECEIVE_PRODUCT_LIST_SUCCESS',
  payload: obj
});

export const listProductDetails = (deviceId) => {
  return (dispatch) => {
    axios.get(url + '/product/list?deviceId=' + deviceId)
      .then((response) => {
        dispatch(fetchProductListSuccess(response.data.productList));
      })
      .catch((error) => {
        dispatch(fetchProductListFailure());
      });
  }
}