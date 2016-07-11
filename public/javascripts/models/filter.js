var Filter = function(query_element, options) {
  return {
    id: query_element['id'],
    _element: query_element,
    filter_title: query_element["name"],

    where_or_having: query_element['type'] == "column" ? "where" : "having",

    // -- tied to the sql library,
    _sql_object: null,

    //--- Start filter exclusive elements here
    method: "",
    value: ""
  }
};

module.exports = Filter;
