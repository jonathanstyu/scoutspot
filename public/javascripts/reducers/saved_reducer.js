var Immutable = require('immutable'),
    _ = require('underscore'),
    Definitions = require('../models/definitions'),
    EngineQuery = require('../models/engine_query'),
    DataManager = require('../models/data_manager');

var fetchSavedQueries = require('../actions/actions.js');

var savedApp = function (state, action) {
  if (typeof state === 'undefined') {
    var dataManager = new DataManager();
    var emptyState = {};
    var definitions = dataManager.definitions;

    emptyState.fetching = false;
    emptyState.definitions = definitions;
    emptyState.savedQueries = []
    return emptyState;
  }
  switch (action.type) {
    case "FETCH_QUERIES":
      return Object.assign({}, state, {
        fetching: true
      });
    case "FETCH_QUERIES_SUCCESS":
      return Object.assign({}, state, {
        fetching: false,
        savedQueries: action.queries
      });
    default:
      return state;
  }
}

module.exports = savedApp;
