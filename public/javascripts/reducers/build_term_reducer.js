var Immutable = require('immutable'),
    _ = require('underscore'),
    Engine = require('../models/engine'),
    Definitions = require('../models/definitions'),
    EngineQuery = require('../models/engine_query'),
    EngineQueryInterpreter = require('../models/engine_query_interpreter'),
    DataManager = require('../models/data_manager');

var createInitialTerminalState = require('../actions/build_term_actions');

// openModal is the only item in the intial modal state
// Split out the reducer here mostly because I don't want this messing with the engine actions in the reducer and causing issues. The Build_reducer passes the action and full state to this
var buildTerminalApp = function (state, action) {
  if (typeof state === 'undefined') {
    createInitialTerminalState()
  }

  switch (action.type) {
    case "TERMINAL_TYPE":
      console.log(action.content);
      return Object.assign({}, state, {
        terminalContent: action.content
      });

    default:

  }
  return state;
}

module.exports = buildTerminalApp;
