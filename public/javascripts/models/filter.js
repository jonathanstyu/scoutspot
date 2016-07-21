var Filter = function(query_element, options) {
  return {
    id: query_element['id'],
    _element: query_element,
    filter_name: query_element["name"],

    where_or_having: query_element['type'] == "column" ? "where" : "having",

    // -- tied to the sql library,
    _sql_object: null,

    //--- Start filter exclusive elements here
    method: options["method"] ? options["method"] : "",
    value: options["value"] ? options["value"] : ""
  }
};

module.exports = Filter;
