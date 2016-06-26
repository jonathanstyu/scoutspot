var Engine = function () {
  this.definitions = {},
  this.tables = {},
  this.selected_table = "",
  this.available_elements = [],
  
  // Load the definitions file, defining the data 
  this.loadDefinitions = function (definitions) {
    this.definitions = definitions; 
    this.tables = {}; 
    this.elements = []; 
    this.filters = []; 
    var that = this; 
    
    // Set SQL defaults 
    sql.setDialect(this.definitions['dialect']); 
    
    // Populate tables with table definitions
    _.forEach(this.definitions['tables'], function (table) {
      var indexed_table = sql.define(table);
      that.tables[table["name"]] = indexed_table;
    });    
  },
  
  // Once someone selects a table then filter out for all the available elements
  this.select_table = function (selected_table) {
    var that = this; 
    this.clear_selected_table()
    this.selected_table = selected_table; 
    
    // Create content items from content_mappings 
    _.forEach(this.definitions['elements'],function (object, key) {
      if (object['table'] == that.selected_table) {
        var element = Element(object['type'], object); 
        that.available_elements.push(element);         
      }
    }); 
  },
  
  this.clear_selected_table = function () {
    this.selected_table = ""; 
    this.available_elements.length = 0; 
  },
  
  // Function that puts together the query and writes it
  this.render_query = function (query_object) {
    if (query_object["table"] == "") {
      return "Empty Query"; 
    }
    
    var table_key = query_object["table"] 
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
      var compiled_sql = (typeof sql_query.toQuery == 'function') ? sql_query.toQuery().text : "Empty"
      return compiled_sql
    } catch (variable) {
      return variable
    } // closes try/catch statement
  } // closes render function 
}

module.exports = Engine; 