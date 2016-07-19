var _ = require('underscore');
var sql = require('../sql');
var Element = require('./element');
var EngineQuery = require('./engine_query');
var Filter = require('./filter');
var Definitions = require('./definitions');
var Engine = require('./engine');

var EngineContents = function () {

}

EngineContents.translate = function (engine) {
  var that = engine;
  var commands = [];

// ------>>> CONTENTS .. Now we need to create our Contents.  <<<<-----
  _.forEach(that.query.contents, function (content_element) {

// We need to initialize a sql table to access distinct and various other funcs
    var content_table = that.create_sql_object(content_element.table)
    var content_title = content_element.name;

    var query_element = content_table[content_element.sql_code][content_element.sql_func]()
    switch (content_element.sql_func) {
    case "count":
        query_element = query_element["distinct"]()
      break;
    default:
      break;
    }
    query_element = query_element.as(content_title)
    commands.push(query_element)
    content_element._query_element = query_element
  });
  return commands;
}

module.exports = EngineContents;
