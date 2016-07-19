var _ = require('underscore');
var sql = require('../sql');
var Element = require('./element');
var EngineQuery = require('./engine_query');
var Filter = require('./filter');
var Definitions = require('./definitions');
var Engine = require('./engine');

var EngineOrderBys = function () {

}

EngineOrderBys.translate = function (engine) {
  var order_by_export = [];
  var that = engine;
  _.each(that.query.order_by_columns, function (order_by_pair) {
    var element_to_order = order_by_pair[0];
    var filter_sql = that.create_sql_object(element_to_order.table);
    var filter_sql_object_with_column = filter_sql[element_to_order.sql_code];

    if (element_to_order.type === "content") {
      if (order_by_pair[1] === "DESC") {
        filter_sql_object_with_column = "`" + element_to_order.name + "` DESC";
      } else {
        filter_sql_object_with_column = "`" + element_to_order.name + "`";
      }
    } else {
      if (order_by_pair[1] == "DESC") {
        filter_sql_object_with_column = filter_sql_object_with_column.descending;
      }
    }

    order_by_export.push(filter_sql_object_with_column);
  });

  return order_by_export;
}

module.exports = EngineOrderBys;
