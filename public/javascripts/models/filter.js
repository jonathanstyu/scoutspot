var Filter = function(query_element) {
  var filter = {}; 
  
  filter = Element("filter", query_element)
  if (query_element['type'] == 'content') {
    filter["sql_key"] = 'having'
  } else {
    filter["sql_key"] = 'where'
  }
  filter.name = query_element['name'] + "-filter"
  
  filter.parse = function parse() {
    return name; 
  }
  
  return filter; 
};

module.exports = Filter; 