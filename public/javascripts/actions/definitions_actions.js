var Firebase = require('firebase'),
    _ = require("underscore");

var shouldDownloadDefinitions = (state) => {
  const definitions = state.buildApp.definitions;
  if (_.isEmpty(definitions) && !state.definitionsApp.fetching) {
    return true;
  } else {
    false
  }
}

var receiveDefinitions = function (definitions) {
  return {
    type: "FETCH_DEFINITIONS_SUCCESS",
    definitions: definitions,
    receivedAt: Date.now(),
    fetching: false
  }
}

var fetchDefinitions = function () {
  return dispatch => {
    dispatch({type: "FETCH_DEFINITIONS", fetching: true})
    var current_user = Firebase.auth().currentUser;
    if (current_user) {
      var current_user_queries = Firebase.database()
        .ref("definitions/"+encodeURI(current_user.uid));
      current_user_queries.on('value', function (snapshot) {
        console.log(snapshot.val());
        dispatch(receiveDefinitions(snapshot.val()))
      })
    } else {
      dispatch({type: "USER_NOT_SIGNED_IN"})
    }
  }
}

var fetchDefinitionsIfNeeded = () => {
  return (dispatch, getState) => {
    if (shouldDownloadDefinitions(getState())) {
      return dispatch(fetchDefinitions());
    }
  }
}

module.exports = fetchDefinitions;
module.exports = fetchDefinitionsIfNeeded;
