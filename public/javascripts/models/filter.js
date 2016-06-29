var Filter = function(query_element, options) {
  return {
    id: query_element['id'],
    _element: query_element,
    title: query_element['title'] != null ?  query_element["title"] : "filter",
    isNotNull: options["isNotNull"],
    equals: options['equals'],
    greaterThan: options['greaterThan'],
    lessThan: options['lessThan'],
    contains: options['contains'],
    special: options['special']
  }
};

module.exports = Filter; 