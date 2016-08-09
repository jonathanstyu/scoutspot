var Immutable = require('immutable'),
    _ = require('underscore'),
    Engine = require('../models/engine'),
    Definitions = require('../models/definitions'),
    EngineQuery = require('../models/engine_query'),
    EngineQueryInterpreter = require('../models/engine_query_interpreter'),
    DataManager = require('../models/data_manager'),
    Firebase = require('firebase');

var createInitialTerminalState = function () {
  return {
    terminalContent: ''
  }
}

module.exports = createInitialTerminalState;
