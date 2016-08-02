var Immutable = require('immutable'),
    _ = require('underscore'),
    Definitions = require('../models/definitions'),
    EngineQuery = require('../models/engine_query'),
    FirebaseManager = require('../models/firebase_manager'),
    DataManager = require('../models/data_manager');

var homeApp = function (state, action) {
  if (typeof state === 'undefined') {
    return {
      loggedIn: false,
      requesting: false
    }
  }
  switch (action.type) {
    case "START_LOG_IN":
      return _.assign({}, state, {requesting: !state.requesting});

    case "LOG_IN_SUCCESS":
      return _.assign({}, state, {requesting: !state.requesting, loggedIn: !state.loggedIn});

    case "LOG_IN_FAIL":
      return _.assign({}, state, {requesting: !state.requesting});
    default:
      return state;
  }
}

module.exports = homeApp;
