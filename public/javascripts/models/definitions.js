var _ = require('underscore'),
    Element = require('./element');

var Definitions = function () {
  this.dialect = "",
  this.tables = {},
  this.joins = [],
  this.elements = [],
  this._options = ""
}

Definitions.populate = function (options) {
  var definitions = new Definitions();
  var element_index_count = 0;
  definitions._options = options;

  // set the dialect
  if (_.contains(['mssql', 'mysql', 'postgres', 'sqlite'], options['dialect'])) {
    definitions.dialect = options['dialect']
  }

  // set the tables
  if (options['tables']) {
    definitions.tables = options['tables'];
  }

  if (options['joins']) {
    definitions.joins = options['joins'];
  }

  // Auto generate columns from the table schema and add into definitions.elements
  _.forEach(options["tables"], function (table_object) {
    _.forEach(table_object.columns, function (column) {
      // For each column within the table object, auto generate an element
      definitions.elements.push(Element.autogenerate_with_column(table_object.name, column, element_index_count));
      element_index_count += 1;
    });
  });

  // Populate custom elements from the definitions
  _.forEach(options['elements'], function (element_options, index) {
    definitions.elements.push(Element.populate(element_options.type, element_options, index + element_index_count));
  });

  return definitions;
}

module.exports = Definitions;
