var Element = function (type, options, id) {  
  function parse() {
    console.log("Error. Type not defined.")
  }
  // sql_func is any fancy stuff we want to do like aggregate, sum, count, etc. 
  // sql_code == the specific column referred 
  return {
    id: id,
    parse: parse,
    description: options["description"] ? options["description"] : "",
    sql_code: options["sql_code"] ? options["sql_code"] : "",
    type: type, 
    table: options["table"] ? options["table"] : "",
    group_by: options["group_by"] ? options["group_by"] : "",
    sql_func: options["sql_func"] ? options["sql_func"] : "",
    title: options["title"] ? options["title"] : "",
  }
} 

module.exports = Element; 