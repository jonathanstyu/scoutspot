// import { Element } from './elements';
// import { Filter } from './element_filter';
require("./element"); 
require("./filter"); 

var EngineQuery = function (schema) {
  if (schema) {
    this.table = schema.table == null ? "" : schema.table; 
    this.elements = schema.elements == null ? [] : schema.elements;
    this.filters = schema.filters == null ? [] : schema.filters;
    this._initialSchema = schema; 
  } else {
    this.table = ""; 
    this.elements = []; 
    this.filters = []; 
    this._initialSchema = null; 
  }
}

EngineQuery.reset_all = function () {
  this.table = ""; 
  this.elements.length = 0; 
  this.filters.length = 0; 
}


module.exports = EngineQuery;