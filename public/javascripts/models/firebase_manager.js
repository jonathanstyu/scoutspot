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
      store.dispatch({type: "LOG_IN_SUCCESS", user: user});
    }
  }).catch(function (error) {
    var errorMessage = error.message;
    store.dispatch({type: "LOG_IN_FAIL", message: errorMessage});
  })
}

FirebaseManager.saveDefinitions = function (definitions) {
  var current_user = Firebase.auth().currentUser;
  if (current_user && definitions) {
    Firebase.database()
      .ref("definitions/"+encodeURI(current_user.uid))
      .set(definitions)
      .then(function (result) {
        // `console.log(result);`
      })
  } else {
    console.log("LOG IN");
  }
}

FirebaseManager.removeQuery = function (query) {
  var current_user = Firebase.auth().currentUser;
  if (current_user && query) {
    Firebase.database()
      .ref("queries/"+encodeURI(current_user.uid))
      .remove(query)
      .then(function (result) {
        console.log(result);
      })
  } else {
    console.log("LOG IN");
  }
}

module.exports = FirebaseManager;
