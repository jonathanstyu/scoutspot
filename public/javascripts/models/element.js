var Element = function () {
  // sql_func is any fancy stuff we want to do like aggregate, sum, count, etc.
  // sql_code == the specific column referred
    this.id= "",
    this.generated = true,
    this.description= "",
    this.sql_code= "",
    this.type= "",
    this.table= "",
    this.group_by= "",
    this.sql_func= "",
    this.name= ""
}

Element.populate = function (type, options, id) {
  var element = new Element();
  element.type = type;
  element.id = id;
  element.generated = options["generated"] ? options["generated"] : "";
  element.description = options["description"] ? options["description"] : "";
  element.sql_code = options["sql_code"] ? options["sql_code"] : "";
  element.table = options["table"] ? options["table"] : "";
  element.group_by = options["group_by"] ? options["group_by"] : "";
  element.sql_func = options["sql_func"] ? options["sql_func"] : "";
  element.name = options["name"] ? options["name"] : "";
  return element;
}

Element.autogenerate_with_column = function (table_name, column, id) {
  var element = new Element();
  element.table = table_name;
  element.generated = true; 
  element.sql_code = column;
  element.name = table_name + "." + column;
  element.sql_func = "field";
  element.description = "Column " + column + " on table " + table_name;
  element.type = "column";
  element.id = id;

  return element;
}

module.exports = Element;
