var _ = require('underscore'),
    Engine = require('./engine'),
    EngineQuery = require('./engine_query'),
    Firebase = require('firebase'),
    store = require('../store/store_index'),
    Config = require('../../../resources/config');

var FirebaseManager = function () {

}

FirebaseManager.initialize = function () {
  Firebase.initializeApp(Config);
}

FirebaseManager.googleLogin = function () {
  var provider = new Firebase.auth.GoogleAuthProvider();
  Firebase.auth().signInWithRedirect(provider);
}

FirebaseManager.handleRedirect = function () {
  Firebase.auth().getRedirectResult().then(function (result) {
    if (result.credential) {
      var token = result.credential.accessToken;
    }
    if (result.user) {
      var user = result.user;
      console.log(user);
      store.dispatch({type: "LOG_IN_SUCCESS"});
    }
  }).catch(function (error) {
    var errorMessage = error.message;
    store.dispatch({type: "LOG_IN_FAIL"});
    console.log(errorMessage);
  })
}

module.exports = FirebaseManager;
