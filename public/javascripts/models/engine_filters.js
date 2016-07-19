var _ = require('underscore');
var sql = require('../sql');
var Element = require('./element');
var EngineQuery = require('./engine_query');
var Filter = require('./filter');
var Definitions = require('./definitions');
var Engine = require('./engine');

var EngineFilters = function () {

}

EngineFilters.translate = function (engine) {
  var that = engine;
  // FILTERSSSSSS
  // ------>>> Now we need to create our filters. God.  <<<<-----
  // There are two ways to filter, having and where. Throw them here and treat them separately

  _.forEach(that.query.filters, function (filter) {
    var filter_sql = that.create_sql_object(filter._element.table)
    var filter_sql_object_with_column = filter_sql[filter._element.sql_code]

    switch (filter.method) {
    case "Equals":
      filter_sql_object_with_column = filter_sql_object_with_column["equals"](new String(filter.value));
      break;
    case "Is Not Null":
      filter_sql_object_with_column = filter_sql_object_with_column["isNotNull"]();
      break;
    case "Greater Than":
      filter_sql_object_with_column = "(" + filter._element.table + "." + filter._element.sql_code + " > " + filter.value + ")"
      break;
    case "Less Than":
      filter_sql_object_with_column = "(" + filter._element.table + "." + filter._element.sql_code + " < " + filter.value + ")"
      break;
    case "Not In":
      filter_sql_object_with_column = filter_sql_object_with_column["notIn"]([filter.value]);
      break;
    default:

    }
    // attach the sql object or custom sql command to the Filter object
    filter._sql_object = filter_sql_object_with_column;
  });
}

module.exports = EngineFilters;
