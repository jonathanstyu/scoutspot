var Immutable = require('immutable'),
    _ = require('underscore'),
    Engine = require('../models/engine'),
    Definitions = require('../models/definitions'),
    EngineQuery = require('../models/engine_query'),
    EngineQueryInterpreter = require('../models/engine_query_interpreter'),
    DataManager = require('../models/data_manager');

// actions
var createInitialState = require('../actions/build_actions').createInitialState;
var generateFromEngineAction = require('../actions/build_actions').generateFromEngineAction;
var saveQuery = require('../actions/actions').saveQuery;

// sub-reducer
var buildModalApp = require('./build_modal_reducer'),
    buildTerminalApp = require('./build_term_reducer');

var buildApp = function (state, action) {
  if (typeof state === 'undefined') {
    return createInitialState()
  }

  // I am going to shunt every event named Modal into its own reducer
  if (action.type.indexOf('MODAL') > 0) {
    return _.assign({}, state, buildModalApp(state, action));
  }

  if (action.type.indexOf('TERMINAL') > 0) {
    // return _.assign({}, state, buildTerminalApp(state, action));
  }

  // Other actions, involving queries
  switch (action.type) {
    case "OPEN_QUERY_STRING":
      var queryObject = action.queryObject;
      var newEngine = EngineQueryInterpreter.open(queryObject, state.engine);
      state.engine = newEngine;
      return generateFromEngineAction(state)

    case "FETCH_DEFINITIONS_SUCCESS":
      var newDefinitions = action.definitions;
      return generateFromEngineAction(state, "load_definitions", newDefinitions);
      break;

    case "RESET_QUERY":
      window.history.pushState({}, document.title, window.location.origin+'/#/build')
      return createInitialState(Object.assign({}, state.definitions))
      break;

    case "SAVE_QUERY_BEGIN":
      var query = state.engine.query;
      return state
      break;

    case "SAVE_QUERY_CONFIRMED":
      return state
      break;

    case "SELECT_TABLE":
      var selectedTable = action.value;
      return generateFromEngineAction(state, "select_table", selectedTable)

    case "SELECT_ELEMENT":
      var selectedElement = action.value;
      return generateFromEngineAction(state, "add_element", selectedElement)

    case "SELECT_FILTER":
      var selectedFilter = action.value;
      return generateFromEngineAction(state, "add_filter", selectedFilter)

    case "REMOVE_ELEMENT":
      var selectedElement = action.value;
      return generateFromEngineAction(state, "remove_element", selectedElement)

    case "REMOVE_FILTER":
      var selectedFilter = action.value;
      return generateFromEngineAction(state, "remove_filter", selectedFilter)

    case "EDIT_FILTER_VALUE":
    return generateFromEngineAction(state, "edit_filter", {
      filter_id: action.id,
      filter_value: action.value
    });

    case "EDIT_FILTER_METHOD":
    return generateFromEngineAction(state, "edit_filter", {
      filter_id: action.id,
      filter_method: action.method
    });

    case "SET_ASC_VALUE":
      var selectedElementID = action.id

    default:

  }
  return state;
}

module.exports = buildApp;
