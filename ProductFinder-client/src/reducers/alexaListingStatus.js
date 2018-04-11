export default function (state = 'INITIAL', action) {
  switch (action.type) {
    case 'RECEIVE_ALEXA_LIST_SUCCESS': return 'RECEIVE_ALEXA_LIST_SUCCESS';
    case 'RECEIVE_ALEXA_LIST_FAILURE': return 'RECEIVE_ALEXA_LIST_FAILURE';
    case 'DEREGISTER_DEVICE_SUCCESS': return 'DEREGISTER_DEVICE_SUCCESS';
    case 'DEREGISTER_DEVICE_FAILURE': return 'DEREGISTER_DEVICE_FAILURE';
    default: return state;
  }
}