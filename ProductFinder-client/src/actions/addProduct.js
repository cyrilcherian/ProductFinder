import axios from 'axios';
import returnHeader from '../utils/returnHeader';
const Config = require('../config');
const url = Config.baseUrl;

const addProductToListFailure = () => ({
  type: 'ADD_PRODUCT_TO_LIST_FAILURE'
});

const addProductToListSuccess = (obj) => ({
  type: 'ADD_PRODUCT_TO_LIST_SUCCESS',
  payload: obj
});

export const addProductToList = (productData, token, uniqueProductInfo) => {
  return (dispatch) => {
    axios.post(url + '/product/add', productData ,
      returnHeader(token))
      .then((response) => {
        if(response.data.status === 409) {
          uniqueProductInfo();
        }
        else {
          dispatch(addProductToListSuccess(productData.productObj));
        }
      })
      .catch((error) => {
        console.log(error)
        dispatch(addProductToListFailure());
      });
  }
}