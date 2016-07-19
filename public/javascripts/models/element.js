var _ = require('underscore'),
    sql = require('../sql');

var Element = function () {
  // sql_func is any fancy stuff we want to do like aggregate, sum, count, etc.
  // sql_code == the specific column referred
    this.id= "",
    this.generated = true,
    this.description= "",
    this.sql_code= "",
    this.type= "",
    this.table= "",
    this.group_by= "",
    this.sql_func= "",
    this.name= "",
    this._query_element = undefined
}

Element.populate = function (type, options, id) {
  var element = new Element();
  var schema_names = ["id", "type", "generated" ,"description", "sql_code", "table", "group_by", "sql_func", "name"]

  // populate the various parts of the schema
  _.each(schema_names, function (schema_name) {
    if (options[schema_name]) {
      element[schema_name] = options[schema_name]
    } else {
      element[schema_name] = ""
    }
  });

  element.type = type;
  element.id = id;

  return element;
}

Element.autogenerate_with_column = function (table_name, column, id) {
  var element = new Element();
  element.table = table_name;
  element.generated = true;
  element.sql_code = column;
  element.name = table_name + "." + column;
  element.sql_func = "field";
  element.description = "Column " + column + " on table " + table_name;
  element.type = "column";
  element.id = id;

  return element;
}

module.exports = Element;
