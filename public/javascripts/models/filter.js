var Filter = function(query_element, options) {
  return {
    id: query_element['id'],
    _element: query_element,
    filter_title: query_element["title"],
    where_or_having: query_element['type'] == "column" ? "where" : "having",
    
    // -- tied to the sql library, 
    _sql_object: null,
    
    //--- Start filter exclusive elements here
    isNotNull: options["isNotNull"],
    equals: options['equals'],
    greaterThan: options['greaterThan'],
    lessThan: options['lessThan'],
    contains: options['contains'],
    special: options['special']
  }
};

module.exports = Filter; 