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
    var content_title = content_element.title;

    switch (content_element.sql_func) {
    case "count":
      commands.push(content_table[content_element.sql_code]
        ["count"]()
        ["distinct"]()
        .as(content_title))
      break;
    case "sum":
      commands.push(content_table[content_element.sql_code]
        ["sum"]()
        .as(content_title))
    default:

    }
  });
  return commands;
}

module.exports = EngineContents;
