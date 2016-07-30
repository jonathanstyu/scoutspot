var Immutable = require('immutable'),
    _ = require('underscore'),
    Definitions = require('../models/definitions'),
    DataManager = require('../models/data_manager');

var definitionsApp = function (state, action) {
  if (typeof state === 'undefined') {
    var dataManager = new DataManager();
    var emptyState = {};
    var definitions = dataManager.definitions;
    
    emptyState.definitions = definitions;
    return emptyState;
  }
  console.log(state);
  return state
}

module.exports = definitionsApp;
