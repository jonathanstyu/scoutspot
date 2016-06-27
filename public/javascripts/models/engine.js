var _ = require('underscore'); 
var sql = require('../sql');
var Element = require('./element'); 
var EngineQuery = require('./engine_query'); 
var Filter = require('./filter'); 

var Engine = function () {
  this.definitions = {},
  this.available_elements = [],
  this.elements = [],
  this.filters = [],
  this.query = new EngineQuery()
}
  // Load the definitions file, defining the data 
Engine.prototype.load_definitions = function (definitions) {
  this.definitions = definitions; 
  var that = this; 
  
  // Set SQL defaults 
  sql.setDialect(this.definitions['dialect']); 
  
  // Populate elements and filters
  _.forEach(this.definitions['elements'], function (element, index) {
    that.elements.push(new Element(element.type, element, index)); 
  })
}
  
  // Once someone selects a table then filter out for all the available elements
Engine.prototype.select_table = function (selected_table) {
  var that = this; 
  this.reset_all()
  this.query.table = selected_table; 
  
  // Create content items from content_mappings 
  this.available_elements = _.where(this.elements, {"table": selected_table}); 
}
  
Engine.prototype.reset_all = function () {
  this.query.reset_all(); 
  this.available_elements.length = 0;
}
  
// Function that puts together the query and writes it
Engine.prototype.render_query = function () {
  if (this.query.table == "") {
    return "Empty Query"; 
  }
  
  // Create the table from the inbuilt definitions
  var that = this; 
  var table_key = that.query["table"]; 
  var table_definition = that.definitions['tables'][table_key]; 
  var sql_query = sql.define(table_definition); 
  // Apply the individual parts of the query to it
  try {
    var select_commands = []
    _.forEach(that.query.contents, function (content_element) {
      
      // We need to initialize a sql table to access distinct and various other funcs
      var content_table_definition = that.definitions['tables'][content_element.table]; 
      var content_table = sql.define(content_table_definition);
      var content_title = content_element.title;

      switch (content_element.sql_class) {
      case "count":
        select_commands.push(content_table[content_element.sql_code]
          ["count"]()
          ["distinct"]()
          .as(content_title))
        break;
      case "sum":
        select_commands.push(content_table[content_element.sql_code]
          ["sum"]()
          .as(content_title))
      default:
        
      }
    }); 
    sql_query = sql_query.select(select_commands); 
    // This checks makes sure that we capture if not enough is done 
    var compiled_sql = (typeof sql_query.toQuery == 'function') ? sql_query.toQuery().text : "Incomplete Query"
    return compiled_sql
  } catch (variable) {
    return variable
  } // closes try/catch statement
} // closes render function 

// Handling the addition of an element Column or Content
Engine.prototype.add_element = function (element_id) {
  var selected_element = this.elements[element_id]; 
  if (selected_element.type == "content") {
    this.query.contents.push(selected_element); 
  } else {
    this.query.columns.push(selected_element); 
  }
}

// Handling the removal of an element
Engine.prototype.remove_element = function (element_id) {
  this.query.contents = _.reject(this.query.contents, function (content) {
    return content.id == element_id
  }); 
  
  this.query.columns = _.reject(this.query.columns, function (column) {
    return column.id == element_id
  }); 
}

module.exports = Engine; 