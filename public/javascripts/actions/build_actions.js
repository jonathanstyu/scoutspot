var Immutable = require('immutable'),
    _ = require('underscore'),
    Engine = require('../models/engine'),
    Definitions = require('../models/definitions'),
    EngineQuery = require('../models/engine_query'),
    EngineQueryInterpreter = require('../models/engine_query_interpreter'),
    DataManager = require('../models/data_manager'),
    Firebase = require('firebase');

// other actions
var createInitialModalState = require('./build_modal_actions');

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
  return _.assign({}, emptyState, createInitialModalState())
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

module.exports = {
  generateFromEngineAction: generateFromEngineAction,
  createInitialState: createInitialState
};
