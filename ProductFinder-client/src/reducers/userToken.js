export default function (state = {}, action) {
  switch (action.type) {
    case 'GET_USER_TOKEN': return action.payload;
    case 'USER_LOGGED_OUT': return null;
    default: return state;
  }
}