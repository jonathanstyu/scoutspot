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
    this._initialSchema = schema; 
  } else {
    this.table = ""; 
    this.contents = []; 
    this.columns = []; 
    this.filters = []; 
    this._initialSchema = null; 
  }
}

EngineQuery.prototype.reset_all = function () {
  this.table = ""; 
  this.contents = []; 
  this.columns = []; 
  this.filters = []; 
}


module.exports = EngineQuery;