// import { Element } from './elements';
// import { Filter } from './element_filter';
var Element = require("./element"),
    Filter = require("./filter");

var _ = require('underscore');

var EngineQuery = function (schema) {
  var that = this;
  if (schema) {
    _.each(["contents", "columns", "filters", "order_by_columns"], function (component) {
      if (schema[component]) {
        // it comes in as a string so we are gonna split it up
        that[component] = String(schema[component]).split(',');
      } else {
        that[component] = []
      }
    });
    this.table = schema['table'] ? schema['table'] : "";
    this.limit = "";
    this._initialSchema = schema;
  } else {
    this.table = "";
    this.contents = [];
    this.columns = [];
    this.filters = [];
    this.order_by_columns = [];
    this.limit = "";
    this._initialSchema = null;
  }
}

EngineQuery.prototype.reset_all = function () {
  this.table = "";
  this.contents = [];
  this.columns = [];
  this.filters = [];
  this.order_by_columns = [];
  this.limit = "";
  this._initialSchema = null;
}

EngineQuery.prototype.export = function () {
  var exportObject = {};
  exportObject.table = this.table;
  exportObject.contents = this.contents.map(function (contentElement) {
    return contentElement.name || contentElement;
  })
  exportObject.columns = this.columns.map(function (columnElement) {
    return columnElement.name || columnElement;
  })
  exportObject.filters = this.filters.map(function (filter) {
    return [filter["filter_name"], filter['method'], filter['value']];
  })
  exportObject.limit = this.limit;

  exportObject.string = _.reduce(["table", "contents", "columns", "limit"], function (memo, component) {
    if (exportObject[component].length === 0) {
      return memo
    } else {
      return memo + "&" + component + "=" + exportObject[component].toString();
    }
  }, "");

  if (exportObject.filters.length > 0) {
    exportObject.string = _.reduce(exportObject.filters, function (memo, filter_set) {
      return memo + encodeURIComponent(filter_set.join('|') + ",");
    }, exportObject.string + '&filters=');
  }

  return exportObject.string;
}


module.exports = EngineQuery;
