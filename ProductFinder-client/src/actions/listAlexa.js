import axios from 'axios';
const Config = require('../config');
const url = Config.baseUrl;

const fetchAlexaListFailure = () => ({
  type: 'RECEIVE_ALEXA_LIST_FAILURE'
});

const fetchAlexaListSuccess = (obj) => ({
  type: 'RECEIVE_ALEXA_LIST_SUCCESS',
  payload: obj
});


export const listAlexa = (userId) => {
  return (dispatch) => {
    axios.get(url + '/device/list?userId=' + userId)
    .then((response) => {
      dispatch(fetchAlexaListSuccess(response.data.deviceList));
    })
    .catch((error) => {
      console.log(error)
      dispatch(fetchAlexaListFailure());
    });
  }
}