var Firebase = require("firebase"),
    _ = require('underscore');


var receiveLoggedInUserData = function (user) {
  return {
    type: "RECEIVE_LOGGED_IN_USER",
    user: user
  }
}

var logUserIn = function () {
  return dispatch => {
    dispatch({type: "START_LOG_IN"})
  }
}
