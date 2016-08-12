var Firebase = require('firebase'),
    _ = require("underscore");

var receiveSavedQueries = function (queries) {
  return {
    type: "FETCH_QUERIES_SUCCESS",
    queries: _.values(queries),
    receivedAt: Date.now(),
    fetching: false
  }
}

var fetchSavedQueries = function () {
  return dispatch => {
    dispatch({type: "FETCH_QUERIES"})
    var current_user = Firebase.auth().currentUser;
    if (current_user) {
      var current_user_queries = Firebase.database()
        .ref("queries/"+encodeURI(current_user.uid));
      current_user_queries.on('value', function (snapshot) {
        dispatch(receiveSavedQueries(snapshot.val()))
      })
    } else {
      dispatch({type: "FETCH_QUERIES_FAILED"})
    }
  }
}

var confirmSavedQuery = function (result) {
  return {
    type: "SAVE_QUERY_CONFIRMED",
    result: queryConfirm
  }
}

var saveQuery = function (query) {
  return dispatch => {
    console.log(query);
    var current_user = Firebase.auth().currentUser;
    if (current_user) {
      // TODO: Implement with Firebase
      // Firebase.database()
      //   .ref("queries/"+encodeURI(current_user.uid))
      //   .push(query)
      //   .then(function (result) {
      //     dispatch(confirmSavedQuery(result))
      //   })
    } else {
      dispatch({type: "FETCH_QUERIES_FAILED"})
    }
  }
}

module.exports = {
  fetchSavedQueries: fetchSavedQueries,
  saveQuery: saveQuery
}
