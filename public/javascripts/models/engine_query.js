// import { Element } from './elements';
// import { Filter } from './element_filter';
require("./element");
require("./filter");

var EngineQuery = function (schema) {
  if (schema) {
    this.table = schema.table == null ? "" : schema.table;
    this.contents = schema.contents == null ? [] : schema.contents;
    this.columns = schema.columns == null ? [] : schema.columns;
    this.filters = schema.filters == null ? [] : schema.filters;
    this.order_by_columns = schema.order_by_columns == null ? [] : schema.order_by_columns;
    this.limit = 100;
    this._initialSchema = schema;
  } else {
    this.table = "";
    this.contents = [];
    this.columns = [];
    this.filters = [];
    this.order_by_columns = [];
    this.limit = 100;
    this._initialSchema = null;
  }
}

EngineQuery.prototype.reset_all = function () {
  this.table = "";
  this.contents = [];
  this.columns = [];
  this.filters = [];
  this.order_by_columns = [];
  this.limit = 100;
  this._initialSchema = null;
}


module.exports = EngineQuery;
