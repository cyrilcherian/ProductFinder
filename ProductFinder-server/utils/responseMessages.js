const NOT_FOUND_MESSAGE = {
  status: 403,
  message: 'FAILED'
};
const DB_ERROR_MESSAGE = {
  status: 500,
  message: 'DB ERROR'
}
const INVALID_PARAMS = {
  status: 422,
  message: 'INVALID PARAMS'
};
const GOOGLE_AUTH_ERROR = {
  status: 502,
  message: 'google auth error'
};
const AUTHORIZATION_FAILED = {
  status: 401,
  message: 'AUTHORIZATION FAILED'
}
const DEVICE_SUCCESSFULLY_ADDED = {
  status: 200,
  message: 'device successfully added'
}
const ITEM_ALREADY_EXIST = {
  status: 409,
  message: 'item already exist'
}
const DEVICE_NAME_SUCCESSFULLY_CHANGED = {
  status: 200,
  message: 'device name successfully changed'
}
const DEVICE_SUCCESSFULLY_DELETED = {
  status: 200,
  message: 'device successfully deleted'
}
const PRODUCT_LOCATION_SUCCESSFULLY_UPDATED = {
  status: 200,
  message: 'product location successfully updated'
}
const PRODUCT_SUCCESSFULLY_ADDED = {
  status: 200,
  message: 'product successfully added'
}
const PRODUCT_SUCCESSFULLY_DELETED = {
  status: 200,
  message: 'product successfully deleted'
}

module.exports = {
  NOT_FOUND_MESSAGE,
  DB_ERROR_MESSAGE,
  INVALID_PARAMS,
  GOOGLE_AUTH_ERROR,
  AUTHORIZATION_FAILED,
  DEVICE_SUCCESSFULLY_ADDED,
  ITEM_ALREADY_EXIST,
  DEVICE_NAME_SUCCESSFULLY_CHANGED,
  DEVICE_SUCCESSFULLY_DELETED,
  PRODUCT_LOCATION_SUCCESSFULLY_UPDATED,
  PRODUCT_SUCCESSFULLY_ADDED,
  PRODUCT_SUCCESSFULLY_DELETED
}