var _ = require('underscore');
var sql = require('../sql');
var Element = require('./element');
var EngineQuery = require('./engine_query');
var Filter = require('./filter');
var Definitions = require('./definitions');
var Engine = require('./engine');

var EngineColumns = function () {

}

EngineColumns.translate = function (engine) {
  var that = engine;

  //The arrays of commands that we collect and group the query
  var select_commands = []
  var group_by_commands = []

  _.forEach(that.query.columns, function (column_element) {
    var column_table = that.create_sql_object(column_element.table)
    var column_title = column_element.title;
    switch (column_element.sql_func) {
    case "field":
      select_commands.push(column_table[column_element.sql_code]
        .as(column_title));
      group_by_commands.push(column_table[column_element.sql_code]);
      break;
    default:

    }
  });
  return [select_commands, group_by_commands];
}

module.exports = EngineColumns;
