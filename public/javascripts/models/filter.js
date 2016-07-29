var Filter = function () {
  this.id = ''
  this._element = ''
  this.filter_name = ''
  this.where_or_having = ''
  this._sql_object = ''
  this.method = ''
  this.value = ''
}

Filter.build = function(query_element, options) {
  var newFilter = new Filter();
  newFilter.id = query_element['id'] || options['id'] || '';
  newFilter._element = query_element || '';
  newFilter.filter_name = query_element["name"] || '';

  newFilter.where_or_having = query_element['type'] == "column" ? "where" : "having";

  // -- tied to the sql library,
  newFilter._sql_object = null;

  //--- Start filter exclusive elements here
  newFilter.method = options["method"] || "";
  newFilter.value = options["value"] || "";

  return newFilter;
};

module.exports = Filter;
