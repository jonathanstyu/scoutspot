var Immutable = require('immutable'),
    _ = require('underscore'),
    $ = require('jquery'),
    Engine = require('../models/engine'),
    Definitions = require('../models/definitions'),
    EngineQuery = require('../models/engine_query');

var createInitialState = function (definitions) {
  var emptyState = {};

  var definitions = JSON.parse($('#definitions').text().replace(/&quot;/g,'"'));
  var engine = new Engine(definitions);
  emptyState.savedQueries = [
    new EngineQuery({
      table: "orders",
      columns: "orders.created_at"
    }),
    new EngineQuery({
      table: "customers",
      columns: "customers.id,customers.email"
    }),
    new EngineQuery({
      table: "orders",
      columns: "orders.created_at,orders.customer_id,customers.id",
      contents: 'customers.count'
    })
  ]
  emptyState.definitions = definitions;
  emptyState.available_tables = _.keys(definitions['tables']);
  emptyState.table_selected = false;
  emptyState.engine = engine;
  emptyState.available_elements = [];
  emptyState.joined_available_elements = [];
  return emptyState;
}

var spotApp = function (state, action) {
  if (typeof state === 'undefined') {
    return createInitialState()
  }
  // console.log(state);
  // console.log(action);
  switch (action.type) {
    case "RESET_QUERY":
      return createInitialState()
      break;

    case "SHARE_QUERY":
      console.log(state.engine.query.export());
      return state;

    case "SELECT_TABLE":
      var selectedTable = action.value;
      var newEngine = _.extend(state.engine, state.engine.select_table(selectedTable));
      return _.assign({}, state, {
        table_selected: true,
        engine: newEngine,
        joined_available_elements: newEngine.joined_available_elements,
        available_elements: newEngine.available_elements
      });

    default:

  }
  return state;
}

module.exports = spotApp;
