export default function (state = 'INITIAL', action) {
  switch (action.type) {
    case 'RECEIVE_PRODUCT_LIST_SUCCESS': return 'RECEIVE_PRODUCT_LIST_SUCCESS';
    case 'RECEIVE_PRODUCT_LIST_FAILURE': return 'RECEIVE_PRODUCT_LIST_FAILURE';
    case 'ADD_PRODUCT_TO_LIST_SUCCESS': return 'ADD_PRODUCT_TO_LIST_SUCCESS';
    case 'ADD_PRODUCT_TO_LIST_FAILURE': return 'ADD_PRODUCT_TO_LIST_FAILURE';
    case 'DELETE_PRODUCT_SUCCESS': return 'DELETE_PRODUCT_SUCCESS';
    case 'DELETE_PRODUCT_FAILURE': return 'DELETE_PRODUCT_FAILURE';
    default: return state;
  }
}