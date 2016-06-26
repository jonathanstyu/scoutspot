var _ = require('underscore'); 
var sql = require('../sql');
var Element = require('./element'); 
var EngineQuery = require('./engine_query'); 
var Filter = require('./filter'); 

var Engine = function () {
  this.definitions = {},
  this.tables = {},
  this.available_elements = [],
  this.elements = [],
  this.filters = [],
  this.query = new EngineQuery()
}
  // Load the definitions file, defining the data 
Engine.prototype.loadDefinitions = function (definitions) {
  this.definitions = definitions; 
  var that = this; 
  
  // Set SQL defaults 
  sql.setDialect(this.definitions['dialect']); 
  
  // Populate tables with table definitions
  _.forEach(this.definitions['tables'], function (table) {
    var indexed_table = sql.define(table);
    that.tables[table["name"]] = indexed_table;
  });
  
  // Populate elements and filters
  _.forEach(this.definitions['elements'], function (element) {
    that.elements.push(new Element(element.type, element)); 
  })
}
  
  // Once someone selects a table then filter out for all the available elements
Engine.prototype.select_table = function (selected_table) {
  var that = this; 
  this.clear_selected_table()
  this.query.table = selected_table; 
  
  // Create content items from content_mappings 
  this.available_elements = _.where(this.elements, {"table": selected_table}); 
}
  
Engine.prototype.clear_selected_table = function () {
  this.query.table = ""; 
  this.available_elements.length = 0;
}
  
// Function that puts together the query and writes it
Engine.prototype.render_query = function () {
  if (this.query.table == "") {
    return "Empty Query"; 
  }
  
  var table_key = this.query["table"] 
  // Retrieve the sql object from store
  var sql_query = this.tables[table_key];
  
  // Apply the individual parts of the query to it
  try {
    // _.forEach(this.elements, function (element) {
    //   switch (element.type) {
    //   case "content":
    //     sql_query = sql_query['select'](element.sql_code)
    //     break;
    //   case "column":
    //     sql_query = sql_query['select'](element.sql_code)
    //     break;
    //   default:
    //
    //   }
    // });
    // sql_query = sql_query['select']("orders.id");
    // var compiled_sql = sql_query.select("user.id").select("user.email")
    // console.log(compiled_sql.toQuery().text)
    var compiled_sql = (typeof sql_query.toQuery == 'function') ? sql_query.toQuery().text : "Incomplete Query"
    return compiled_sql
  } catch (variable) {
    return variable
  } // closes try/catch statement
} // closes render function 

module.exports = Engine; 