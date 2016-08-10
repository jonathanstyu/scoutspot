var _ = require('underscore');
var sql = require('../sql');
var Element = require('./element');
var EngineQuery = require('./engine_query');
var Filter = require('./filter');
var Definitions = require('./definitions');

var EngineContents = require('./engine_contents'),
    EngineColumns = require('./engine_columns'),
    EngineJoins = require('./engine_joins'),
    EngineFilters = require('./engine_filters'),
    EngineOrderBys = require('./engine_order_by');

var Engine = function (defOptions) {
  this.definitions = {},
  this.relevant_joins = [],
  this.available_elements = [],
  this.joined_available_elements = [],
  this.elements = [],
  this.filters = [],
  this.query = new EngineQuery(),
  this._saved_sql_object = ""
  if (typeof defOptions != 'undefined') {
    this.load_definitions(defOptions)
    return this
  }
}

// Load the definitions file, defining the data
Engine.prototype.load_definitions = function (definitions_schema) {
  this.definitions = Definitions.populate(definitions_schema);
  var that = this;
  sql.setDialect(this.definitions['dialect']);
  this.elements = this.definitions.elements;
}

// Once someone selects a table then filter out for all the available elements
Engine.prototype.select_table = function (selected_table) {
  var that = this;
  this.reset_all()
  if (typeof this.definitions['tables'][selected_table] === 'undefined') {
    throw "Unknown table selected."
    return;
  } else {
    this.query.table = selected_table;
  }

  // Create content items from content_mappings
  this.available_elements = _.where(this.elements, {"table": selected_table});
  this.select_join_elements();
}

// Helper function for select_table
Engine.prototype.select_join_elements = function () {
  var that = this;
  // Select joins that apply to the currently selected table.
  this.relevant_joins = _.filter(this.definitions['joins'], function (join) {
    return (join.foreign_key_table == that.query.table);
  });

  // Select the applicable elements from the possible joins
  _.each(this.elements, function (element) {
    // for each element, search joins that are adjacent
    _.each(that.relevant_joins, function (join) {
      // the element holds the primary key. the selected table here holds the foreign key
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

// helper function that initializes a fresh sql object
Engine.prototype.create_sql_object = function (table_name) {
  var table_definition = this.definitions['tables'][table_name];
  return sql.define(_.pick(table_definition, 'name', 'columns'));
}

// --- The BBIG FUNCTION that renders ---

Engine.prototype.render_query = function () {
  if (this.query.table == "") {
    return "Empty Query";
  }

  // Create the table from the inbuilt definitions
  var that = this;
  var table_key = that.query["table"];
  var sql_query = that.create_sql_object(table_key);
  // Apply the individual parts of the query to it
  try {
    // The arrays of commands that we collect and group the query
    var translated_column_output = EngineColumns.translate(that);
    var select_commands = translated_column_output[0]
    var group_by_commands = translated_column_output[1]

    select_commands = select_commands.concat(EngineContents.translate(that));

    // if select commands is empty, let's just throw in a star.
    if (select_commands.length === 0) {
      select_commands.push(that.create_sql_object(table_key).star())
    }

    // apply the select_commands first.
    sql_query = sql_query.select(select_commands);

    // Use the helper function to create the WHERE elements that are tacked later on
    EngineFilters.translate(that);

    // Apply joins after filters.
    // sql_query = that.translate_joins(sql_query);
    sql_query = EngineJoins.translate(sql_query, that);

    // We split the total filter command pool into where and having, and apply if length is greater than zero

    var where_filters = _.where(that.query.filters, {"where_or_having": "where"});
    var having_filters = _.where(that.query.filters, {"where_or_having": "having"});

    if (where_filters.length > 0) {
      // Use pluck to grab the values of the _sql_object, because the sql object is tied to the filter object
      sql_query = sql_query.where(_.pluck(where_filters, '_sql_object'));
    }

    if (having_filters.length > 0) {
      sql_query = sql_query.having(_.pluck(having_filters, '_sql_object'));
    };

    // If there is anything that needs to be grouped, it is applied here
    if (group_by_commands.length > 0) {
      sql_query = sql_query.group(group_by_commands);
    }

    // apply the order by columns
    if (that.query.order_by_columns.length > 0) {
      sql_query = sql_query.order(EngineOrderBys.translate(that));
    }

    // apply the limit number
    if (that.query.limit === "") {
      sql_query = sql_query.limit(100);
    } else {
      sql_query = sql_query.limit(that.query.limit);
    }

    // Archive for the future
    that._saved_sql_object = sql_query;
    // This is a fall through to parse for
    return (typeof sql_query.toQuery == 'function') ? sql_query.toString() : "Incomplete Query"
  } catch (variable) {
    //
    return variable.message
  } // closes try/catch statement
} // closes render function

//  ---- Prototype functions for maninpulating the columns ----

Engine.prototype.select_element_helper = function (selector) {
  // Have to create a new element and assign it into the new one for immutability

  if (this.elements[selector]) {
    return _.assign(new Element(), this.elements[selector]);
  } else if (_.findWhere(this.elements, {'name': selector})) {
    return _.assign(new Element(), _.findWhere(this.elements, {'name': selector}));
  }
}

// Handling the addition of an element Column or Content
Engine.prototype.add_element = function (element_id) {
  var selected_element = this.select_element_helper(element_id);
  if (typeof selected_element === 'undefined') {
    return;
  }

  if (
    (selected_element.type === "content" && _.where(this.query.contents, {name: selected_element.name}).length === 0) ||
    (selected_element.type === "column" && _.where(this.query.columns, {name: selected_element.name}).length === 0)
  ) {
    this.query[`${selected_element.type}s`] = this.query[`${selected_element.type}s`].concat([selected_element])
  } else {
    console.log(selected_element);
    throw `Unknown error: ${element_id}`
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

  this.query.order_by_columns = _.reject(this.query.order_by_columns, function (order_by_pair) {
    return order_by_pair[0].id == element_id
  });
}

// Handling the change of the ascending or descending for an element
Engine.prototype.add_element_ordering = function (element_id, order_direction) {
  var selected_element = this.select_element_helper(element_id);
  if (typeof selected_element === 'undefined') {
    throw `Invalid element: ${element_id}`
    return;
  }

  var element_check = _.find(this.query.order_by_columns, function (order_by_pair) {
    if (order_by_pair[0].id == element_id) {
      return order_by_pair
    }
  });

  if (element_check) {
    element_check[1] = order_direction;
  } else {
    switch (order_direction) {
      case "ASC":
        this.query.order_by_columns.push([selected_element, "ASC"])
        break;
      case "DESC":
        this.query.order_by_columns.push([selected_element, "DESC"])
        break;
      default:
        this.query.order_by_columns.push([selected_element, "ASC"])
    }
  }
}

//  Add a filter, though in reality we are adding an element
Engine.prototype.add_filter = function (element_id, method, value) {
  var selected_element = this.select_element_helper(element_id);
  if (typeof selected_element === 'undefined') {
    throw `Invalid element: ${element_id}`
    return;
  }

  var created_filter;
  if (method && value) {
    created_filter = Filter.build(selected_element, {
      id: element_id,
      method: method,
      value: value
    })
  } else {
    created_filter =  Filter.build(selected_element, {id: element_id});
  }
  this.query.filters = this.query.filters.concat([created_filter]);
}

// now we will edit the filter in question to add
Engine.prototype.edit_filter = function (options) {

  this.query.filters = this.query.filters.map(function (filter) {
    if (filter.id == options["filter_id"]) {
      if (options['filter_method'] && options['filter_method'] != '') {
        filter.method = options['filter_method']
      } else if (options['filter_value'] && options['filter_value'] != '') {
        filter.value = options['filter_value']
      }
      return _.assign(new Filter(), filter)
    } else {
      return filter
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
