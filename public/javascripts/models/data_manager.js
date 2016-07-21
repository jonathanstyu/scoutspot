var _ = require('underscore'),
    $ = require('jquery'),
    Engine = require('./engine'),
    EngineQuery = require('./engine_query');

var DataManager = function () {
  this.engine = new Engine(),
  this.definitions = JSON.parse($('#definitions').text().replace(/&quot;/g,'"')),
  this.engine.load_definitions(this.definitions),
  this.savedQueries = [
    new EngineQuery({
      table: "orders",
      columns: "orders.created_at"
    }),
    new EngineQuery({
      table: "customers",
      columns: "customers.id,customers.email"
    })
  ]
}

module.exports = DataManager;
