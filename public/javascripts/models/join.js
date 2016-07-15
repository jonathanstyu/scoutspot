var Join = function () {
  // sql_func is any fancy stuff we want to do like aggregate, sum, count, etc.
  // sql_code == the specific column referred
    this.id= "",
    this.foreign_key_table = "",
    this.foreign_key = "",
    this.primary_key_table = "",
    this.primary_key = "",
    this.join_type = ""
}

Join.populate = function (options) {
  var join = new Join();

  join.id = id;
  join.foreign_key_table = options["foreign_key_table"] ? options["foreign_key_table"] : "";
  join.primary_key_table = options["primary_key_table"] ? options["primary_key_table"] : "";
  join.foreign_key = options["foreign_key"] ? options["foreign_key"] : "";
  join.primary_key = options["primary_key"] ? options["primary_key"] : "";
  join.join_type = options["join_type"] ? options["join_type"] : "";

  return join;
}

module.exports = Join;
