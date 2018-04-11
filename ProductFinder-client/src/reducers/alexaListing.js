export default function (state = [], action) {
  switch (action.type) {
    case 'RECEIVE_ALEXA_LIST_SUCCESS': return action.payload;
    case 'DEREGISTER_DEVICE_SUCCESS': return state.filter(device => device.deviceId !== action.payload)
    default: return state;
  }
}