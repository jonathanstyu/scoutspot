var Element = function (type, options, id) {  
  function parse() {
    console.log("Error. Type not defined.")
  }
  
  return {
    id: id,
    parse: parse,
    description: options["description"] ? options["description"] : "",
    sql_key: options["sql_key"] ? options["sql_key"] : "",
    sql_code: options["sql_code"] ? options["sql_code"] : "",
    type: type, 
    table: options["table"] ? options["table"] : "",
    title: options["group_by"] ? options["group_by"] : "",
    title: options["title"] ? options["title"] : "",
    name: (options["table"] && options["title"]) ? options["table"] + "." +  options["title"] : ""
  }
} 

module.exports = Element; 