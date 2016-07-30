var _ = require('underscore'),
    Firebase = require('firebase'),
    Engine = require('./engine'),
    EngineQuery = require('./engine_query');

var Config = require('../../../resources/config');

var DataManager = function () {
  this.definitions = DataManager.getBootstrappedData('definitions'),
  this.savedQueries = [
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

}

DataManager.prototype.setupThirdParty = function () {
  Firebase.initializeApp(Config);
}

DataManager.getBootstrappedData = function (selector) {
  if (typeof document != 'undefined') {
    var bootstrappedText = document.getElementById(selector).text
  } else {
    return {}
  }

  return JSON.parse(bootstrappedText.replace(/&quot;/g,'"'))
}

DataManager.clearQueryString = function () {
  window.history.pushState({}, document.title, window.location.origin+'/#/build')
}

module.exports = DataManager;
