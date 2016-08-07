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
      // this.
      // console.log(user);
      // console.log(encodeURI(user.uid));
      store.dispatch({type: "LOG_IN_SUCCESS"});
    }
  }).catch(function (error) {
    var errorMessage = error.message;
    store.dispatch({type: "LOG_IN_FAIL"});
    console.log(errorMessage);
  })
}

FirebaseManager.saveDefinitions = function (definitions) {
  var current_user = Firebase.auth().currentUser;
  if (current_user && definitions) {
    Firebase.database()
      .ref("definitions/"+encodeURI(current_user.uid))
      .set(definitions)
      .then(function (result) {
        console.log(result);
      })
  } else {
    console.log("LOG IN");
  }
}

FirebaseManager.saveQuery = function (query) {
  var current_user = Firebase.auth().currentUser;
  if (current_user && query) {
    Firebase.database()
      .ref("queries/"+encodeURI(current_user.uid))
      .push(query)
      .then(function (result) {
        console.log(result);
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

FirebaseManager.fetchSavedQueries = function () {
  var current_user = Firebase.auth().currentUser;
  if (current_user) {
    var current_user_queries = Firebase.database()
      .ref("queries/"+encodeURI(current_user.uid));
    current_user_queries.on('value', function (snapshot) {
      console.log(snapshot.val());
    })
  } else {
    console.log(error);
  }
}

module.exports = FirebaseManager;
