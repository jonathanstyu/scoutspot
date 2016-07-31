var _ = require('underscore'),
    Engine = require('./engine'),
    EngineQuery = require('./engine_query'),
    Firebase = require('firebase'),
    store = require('../store/store_index'),
    Config = require('../../../resources/config');

var FirebaseHandler = function () {

}

FirebaseHandler.initialize = function () {
  Firebase.initializeApp(Config);
}

FirebaseHandler.googleLogin = function () {
  dispatch({type: "LOG_IN_SUCCESS"})
  // var provider = new Firebase.auth.GoogleAuthProvider();
  // firebase.auth().signInWithRedirect(provider);
}

module.exports = FirebaseHandler;
