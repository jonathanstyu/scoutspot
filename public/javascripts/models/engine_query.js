// import { Element } from './elements';
// import { Filter } from './element_filter';
require("./element"); 
require("./filter"); 

var Query = function (table, elements, filters) {
  var a_query = {
    "table": table == null ? "" : table,
    "elements": elements == null ? [] : filters,
    "filters": filters == null ? [] : filters
  }
  
  a_query.reset = function () {
    a_query["table"] = ""
    a_query["elements"] = []
    a_query["filters"] = []
  }
  
  return a_query; 
}

module.exports = Query; 