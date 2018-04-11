import { combineReducers } from 'redux';
import userDetails from './userDetails';
import alexaListing from './alexaListing';
import alexaListingStatus from './alexaListingStatus';
import productListing from './productListing';
import productListingStatus from './productListingStatus';
import userToken from './userToken';

export default combineReducers({
  userDetails,
  userToken,
  alexaListing,
  alexaListingStatus,
  productListing,
  productListingStatus
});
