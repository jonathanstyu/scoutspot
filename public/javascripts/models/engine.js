var _ = require('underscore'); 
var sql = require('../sql');
var Element = require('./element'); 
var EngineQuery = require('./engine_query'); 
var Filter = require('./filter'); 

var Engine = function () {
  this.definitions = {},
  this.relevant_joins = [],
  this.available_elements = [],
  this.joined_available_elements = [],
  this.elements = [],
  this.filters = [],
  this.query = new EngineQuery()
}
  // Load the definitions file, defining the data 
Engine.prototype.load_definitions = function (definitions) {
  this.definitions = definitions; 
  var that = this; 
  var element_index_count = 0; 
  // Set SQL defaults 
  sql.setDialect(this.definitions['dialect']); 
  
  // Auto generate columns from the table schema 
  _.forEach(this.definitions["tables"], function (table_object) {
    _.forEach(table_object.columns, function (column) {
      // For each column within the table object, auto generate an element 
      that.elements.push(Element.autogenerate_with_column(table_object, column, element_index_count)); 
      element_index_count += 1;  
    }); 
  }); 
  
  // Populate custom elements from the definitions 
  _.forEach(this.definitions['elements'], function (element_options, index) {
    that.elements.push(Element.populate(element_options.type, element_options, index + element_index_count)); 
  }); 
}
  
// Once someone selects a table then filter out for all the available elements
Engine.prototype.select_table = function (selected_table) {
  var that = this; 
  this.reset_all()
  this.query.table = selected_table;
  
  this.relevant_joins = _.filter(this.definitions['joins'], function (join) {
    return (join.primary_key_table == selected_table || join.foreign_key_table == selected_table)
  }); 
  
  // Create content items from content_mappings 
  this.available_elements = _.where(this.elements, {"table": selected_table}); 
  
  // Select the applicable elements from the possible joins
  _.each(this.elements, function (element) {
    // for each element, search joins that are adjacent 
    _.each(that.relevant_joins, function (join) {
      // if the join i s
      if (element.table == join.primary_key_table || element.table == join.foreign_key_table) {
        // Only add to joined_available_elements if the element is unique 
        if (!(_.contains(that.available_elements, element)) && !(_.contains(that.joined_available_elements, element))) {
          that.joined_available_elements.push(element); 
        }
      }; // closes the if statement 
    }); // closes relevant joins each statement 
  }); // closes the joined_avail_elements each statement
}
  
Engine.prototype.reset_all = function () {
  this.query.reset_all(); 
  this.available_elements.length = 0;
  this.joined_available_elements.length = 0;
  this.relevant_joins.length = 0;
}
  
// --- The BBIG FUNCTION that renders --- 

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
    
    //The arrays of commands that we collect and group the query 
    var select_commands = []
    var group_by_commands = []    
    
    // --->> COLUMNS, which have to go first <<<--- 
    _.forEach(that.query.columns, function (column_element) {
      var column_table_definition = that.definitions['tables'][column_element.table]; 
      var column_table = sql.define(column_table_definition);
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
    
    // ------>>> CONTENTS .. Now we need to create our Contents.  <<<<----- 
    _.forEach(that.query.contents, function (content_element) {
      
      // We need to initialize a sql table to access distinct and various other funcs
      var content_table_definition = that.definitions['tables'][content_element.table]; 
      var content_table = sql.define(content_table_definition);
      var content_title = content_element.title;

      switch (content_element.sql_func) {
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
         
    // apply the select functions from the commands array 
    sql_query = sql_query.select(select_commands); 
    
    // ------ JOINS! -----
    //A FOREIGN KEY in one table points to a PRIMARY KEY in another table.
    var joined_tables = [that.query.table]
    
    _.each(that.query.contents.concat(that.query.columns), function (element) {
      if (!_.contains(joined_tables, element.table)) {
        var join_schema = _.findWhere(that.relevant_joins, {
          "primary_key_table": element.table,
          "foreign_key_table": that.query.table
        })
        
        var primary_join_table_definition = that.definitions['tables'][element.table]; 
        var primary_join_table = sql.define(primary_join_table_definition);
        var foreign_join_table_definition = that.definitions['tables'][that.query.table]; 
        var foreign_join_table = sql.define(foreign_join_table_definition);
        
        // Create the join schema separately 
        var join = foreign_join_table.join(primary_join_table)
        .on(foreign_join_table[join_schema['foreign_key']]
        .equals(primary_join_table[join_schema['primary_key']]))
        
        sql_query = sql_query.from(join); 
        // make sure that we don't accidentially rejoin already-joined tables
        joined_tables.push(element.table); 
      }; 
    });
    
    // FILTERSSSSSS
    // ------>>> Now we need to create our filters. God.  <<<<----- 
    // There are two ways to filter, having and where. Throw them here and treat them separately
    var filter_commands = []
    
    _.forEach(that.query.filters, function (filter) {
      var filter_table_definition = that.definitions['tables'][filter._element.table]; 
      var filter_sql = sql.define(filter_table_definition);
      
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
        console.log(filter_sql_object_with_column)
        break;
      case "Less Than":
        filter_sql_object_with_column = "(" + filter._element.table + "." + filter._element.sql_code + " < " + filter.value + ")"
        break;
      default:
        
      }
      // attach the sql object or custom sql command to the Filter object 
      filter._sql_object = filter_sql_object_with_column; 
      filter_commands.push(filter_sql_object_with_column); 
    }); 
    
    // We split the total filter command pool into where and having, and apply if length is greater than zero 
    
    var where_filters = _.where(that.query.filters, {"where_or_having": "where"}); 
    var having_filters = _.where(that.query.filters, {"where_or_having": "having"}); 
    
    if (where_filters.length > 0) {
      // Use pluck to grab the values of the _sql_object, because the sql object is tied
      // sql_query = sql_query.where(_.pluck(where_filters, '_sql_object'));
      sql_query = sql_query.where(_.pluck(where_filters, '_sql_object'));
    } else if (having_filters.length > 0) {
      sql_query = sql_query.having(_.pluck(having_filters, '_sql_object')); 
    }; 
    
    // If there is anything that needs to be grouped, it is applied here 
    if (group_by_commands.length > 0) {
      sql_query = sql_query.group(group_by_commands); 
    }
    
    // This is a fall through to parse for 
    return (typeof sql_query.toQuery == 'function') ? sql_query.toString() : "Incomplete Query"
  } catch (variable) {
    //
    return variable
  } // closes try/catch statement
} // closes render function 

//  ---- Prototype functions for maninpulating the columns ----

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

//  Add a filter, though in reality we are adding an element 
Engine.prototype.add_filter = function (element_id) {
  var selected_element = this.elements[element_id]; 
  var created_filter = new Filter(selected_element, {id: element_id}); 
  this.query.filters.push(created_filter); 
}

// now we will edit the filter in question to add 
Engine.prototype.edit_filter = function (options) {
  _.each(this.query.filters, function (filter) {
    if (filter.id == options["filter_id"]) {
      filter["method"] = options["filter_method"]; 
      filter["value"] = options["filter_value"];       
    }
  }); 
}

// Handling the removal of an element
Engine.prototype.remove_filter = function (element_id) {
  this.query.filters = _.reject(this.query.filters, function (filter) {
    return filter.id == element_id
  }); 
}


module.exports = Engine; 