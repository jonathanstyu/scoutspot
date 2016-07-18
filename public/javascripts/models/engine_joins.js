var _ = require('underscore');
var sql = require('../sql');
var Element = require('./element');
var EngineQuery = require('./engine_query');
var Filter = require('./filter');
var Definitions = require('./definitions');
var Engine = require('./engine');

var EngineJoins = function () {

}

EngineJoins.translate = function (sql_object, engine) {
  var sql_object = sql_object;
  var that = engine;
  //A FOREIGN KEY in one table points to a PRIMARY KEY in another table.
  var joined_tables = [that.query.table]

  // Use pluck to grab the core filter elements because concatting filters breaks
  var stripped_filter_elements = _.pluck(that.query.filters, '_element');
  var joined_elements = that.query.contents.concat(that.query.columns, stripped_filter_elements);

  _.each(joined_elements, function (element) {
    if (!_.contains(joined_tables, element.table)) {
      var join_schema = _.findWhere(that.relevant_joins, {
        "primary_key_table": element.table,
        "foreign_key_table": that.query.table
      });

      var primary_join_table = that.create_sql_object(element.table);
      var foreign_join_table = that.create_sql_object(that.query.table);

      // Create the join schema separately
      var join = foreign_join_table.join(primary_join_table)
      .on(foreign_join_table[join_schema['foreign_key']]
      .equals(primary_join_table[join_schema['primary_key']]))

      sql_object = sql_object.from(join);
      // make sure that we don't accidentially rejoin already-joined tables
      joined_tables.push(element.table);
    };
  });
  return sql_object;
}

module.exports = EngineJoins;
