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
    var filter_sql_object_with_column;

    if (filter._element.sql_func === 'field') {
      filter_sql_object_with_column = filter_sql[filter._element.sql_code]
    } else {
      filter_sql_object_with_column = filter_sql[filter._element.sql_code]
        [filter._element.sql_func]().as(undefined)
    }

    var field_interpret = {
      'Equals': 'equals',
      'Greater Than': 'gt',
      'Less Than': 'lt',
      'Greater Than Equals': 'gte',
      'Less Than Equals': 'lte',
      '': ''
    }

    var agg_interpret = {
      'Equals': '=',
      'Greater Than': '>',
      'Less Than': '<',
      'Greater Than Equals': '>=',
      'Less Than Equals': '<=',
      '': ''
    }

    // this is messy but we have no choice
    switch (filter.method) {
    case "":
      break;
    case "Is Not Null":
      // split by whether it is a having or aggregate field
      if (filter._element.sql_func === 'field') {
        filter_sql_object_with_column = filter_sql_object_with_column["isNotNull"]();
      } else {
        filter_sql_object_with_column = `(${filter_sql_object_with_column.toString()} IS NOT NULL)`
      }
      break;
    case "Not In":
      // split by whether it is a having or aggregate field
      if (filter._element.sql_func === 'field') {
        filter_sql_object_with_column =
          filter_sql_object_with_column["notIn"](filter.value);
      } else {
        filter_sql_object_with_column = `(${filter_sql_object_with_column.toString()} NOT IN ${filter.value})`
      }
      break;
    default:
      // split by whether it is a having or aggregate field
      if ((filter._element.sql_func === 'field')) {
        filter_sql_object_with_column =
          filter_sql_object_with_column[field_interpret[filter.method]](filter.value);
      } else {
        filter_sql_object_with_column = `(${filter_sql_object_with_column.toString()} ${agg_interpret[filter.method]} '${filter.value}')`
      }
    }
    // attach the sql object or custom sql command to the Filter object
    filter._sql_object = filter_sql_object_with_column;
  });
} // closes engineFilter

module.exports = EngineFilters;
