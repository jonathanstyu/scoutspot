var Immutable = require('immutable'),
    _ = require('underscore'),
    Definitions = require('../models/definitions'),
    DataManager = require('../models/data_manager');

var definitionsApp = function (state, action) {
  if (typeof state === 'undefined') {
    return {
      level: [0, 1, 2]
    }
  }

  switch (action.type) {
    case "TREE_MOVE_FORWARD":
      console.log(action);
      return state
    default:
      return state
  }
}

module.exports = definitionsApp;
