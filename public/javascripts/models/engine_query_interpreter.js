var Engine = require('./engine');
var _ = require('underscore'); 

var EngineQueryInterpreter = function () {

}

EngineQueryInterpreter.open = function (options, engine) {
  // This opens a schema and does its best to "recreate" the query
  // if an option exists, select the table
  if (options.table) {
    engine.select_table(options.table)
  } else {
    return;
  }

  // add the elements using the engine's add element func
  _.each(["contents", "columns"], function (component) {
    var componentArray = String(options[component]).split(',');
    _.each(componentArray, function (elementToAdd) {
      engine.add_element(elementToAdd);
    })
  })

  if (options.filters) {
    var filterArray = String(decodeURI(options.filters)).split(',');
    _.each(filterArray, function (filterToAdd) {
      var filterGroup = String(filterToAdd).split('|');

      // if there's nothing well then we skip it.
      if (filterGroup[0]) {
        engine.add_filter(filterGroup[0], ("" || filterGroup[1] ), ("" || filterGroup[2]))
      }
    })
  }

}

module.exports = EngineQueryInterpreter;
