var Immutable = require('immutable'),
    _ = require('underscore'),
    Definitions = require('../models/definitions'),
    EngineQuery = require('../models/engine_query'),
    DataManager = require('../models/data_manager');

var savedApp = function (state, action) {
  if (typeof state === 'undefined') {
    var dataManager = new DataManager();
    var emptyState = {};
    var definitions = dataManager.definitions;

    emptyState.definitions = definitions;
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
    return emptyState;
  }
  return state
}

module.exports = savedApp;
