var Immutable = require('immutable'),
    _ = require('underscore'),
    Engine = require('../models/engine'),
    Definitions = require('../models/definitions'),
    EngineQuery = require('../models/engine_query'),
    EngineQueryInterpreter = require('../models/engine_query_interpreter'),
    DataManager = require('../models/data_manager');

var createInitialState = function (definitions) {
  var dataManager = new DataManager();
  var emptyState = {};
  // if (!definitions) {
  //   var definitions = {};
  // }
  var definitions = dataManager.definitions;
  var engine = new Engine(definitions);

  emptyState.definitions = definitions;
  emptyState.available_tables = _.keys(definitions['tables']);
  emptyState.table_selected = false;
  emptyState.engine = engine;
  emptyState.available_elements = [];
  emptyState.joined_available_elements = [];

  emptyState.query_columns = engine.query.columns;
  emptyState.query_contents = engine.query.contents;
  emptyState.query_filters = engine.query.filters;
  return emptyState;
}

var generateFromEngineAction = function (state, action, option) {
  var newEngine;
  if (typeof action != 'undefined' && typeof option != 'undefined') {
    newEngine = _.extend(state.engine, state.engine[action](option));
  } else {
    newEngine = _.extend(state.engine);
  }
  var newQuery = Immutable.Map(newEngine.query);

  return _.assign({}, state, {
    table_selected: newQuery.get('table') === "" ? false : true,
    engine: newEngine,
    available_tables: _.keys(newEngine.definitions['tables']),
    definitions: newEngine.definitions,
    joined_available_elements: newEngine.joined_available_elements,
    available_elements: newEngine.available_elements,
    query_columns: newQuery.get('columns'),
    query_contents: newQuery.get('contents'),
    query_filters: newQuery.get('filters')
  });
}

var buildApp = function (state, action) {
  if (typeof state === 'undefined') {
    return createInitialState()
  }

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
      // return generateFromEngineAction(state, "reset_all");
      return createInitialState(Object.assign({}, state.definitions))
      break;

    case "SHARE_QUERY":
      console.log(state.engine.query.export());
      return state;

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
