var Element = function () {  
  // sql_func is any fancy stuff we want to do like aggregate, sum, count, etc. 
  // sql_code == the specific column referred 
  // return {
  //   id: id,
  //   description: options["description"] ? options["description"] : "",
  //   sql_code: options["sql_code"] ? options["sql_code"] : "",
  //   type: type,
  //   table: options["table"] ? options["table"] : "",
  //   group_by: options["group_by"] ? options["group_by"] : "",
  //   sql_func: options["sql_func"] ? options["sql_func"] : "",
  //   title: options["title"] ? options["title"] : "",
  // }
    this.id= "",
    this.description= "",
    this.sql_code= "",
    this.type= "", 
    this.table= "",
    this.group_by= "",
    this.sql_func= "",
    this.title= ""
} 

Element.populate = function (type, options, id) {
  var element = new Element();
  element.type = type; 
  element.id = id; 
  element.description = options["description"] ? options["description"] : ""; 
  element.sql_code = options["sql_code"] ? options["sql_code"] : ""; 
  element.table = options["table"] ? options["table"] : ""; 
  element.group_by = options["group_by"] ? options["group_by"] : ""; 
  element.sql_func = options["sql_func"] ? options["sql_func"] : ""; 
  element.title = options["title"] ? options["title"] : "";
  return element; 
}

Element.autogenerate_with_column = function (table_object, column, id) {
  var element = new Element(); 
  element.table = table_object.name; 
  element.sql_code = column; 
  element.title = table_object.name + "." + column; 
  element.sql_func = "field"; 
  element.description = "Column " + column + " on table " + table_object.name; 
  element.type = "column"; 
  element.id = id;  
  
  return element; 
}

module.exports = Element; 