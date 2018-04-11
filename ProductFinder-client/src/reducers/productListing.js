export default function (state = [], action) {
  switch (action.type) {
    case 'RECEIVE_PRODUCT_LIST_SUCCESS': return action.payload;
    case 'ADD_PRODUCT_TO_LIST_SUCCESS' : return [...state].concat(action.payload);
    case 'DELETE_PRODUCT_SUCCESS': return state.filter(product => product.productId !== action.payload)
    default: return state;
  }
}