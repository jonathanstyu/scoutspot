var Immutable = require('immutable'),
    _ = require('underscore'),
    Engine = require('../models/engine'),
    Definitions = require('../models/definitions'),
    EngineQuery = require('../models/engine_query'),
    React = require('react');

var createInitialModalState = require('../actions/build_actions');

// openModal is the only item in the intial modal state
// Split out the reducer here mostly because I don't want this messing with the engine actions in the reducer and causing issues. The Build_reducer passes the action and full state to this
var buildModalApp = function (state, action) {
  if (typeof state === 'undefined') {
    createInitialModalState()
  }

  switch (action.type) {
    case "SHARE_QUERY_MODAL":
      var queryString = state.engine.query.export()
      return Object.assign({}, state, {
        openModal: true,
        modalContent: `#/build?${queryString}`,
        modalContentType: "InputBar"
      });
      break;
    case "COPY_QUERY_MODAL":
      var queryString = state.engine.render_query()
      return Object.assign({}, state, {
        openModal: true,
        modalContent: queryString,
        modalContentType: "Announcement"
      });
      break;
    case "SEE_TABLE_SCHEMA_MODAL":
      var selectedTable = action.value;
      var selectedTableObject = state.definitions.tables[selectedTable]
      var selectedTableColumns = selectedTableObject['columns'];
      var selectedTableColumnSchemas = selectedTableObject['schema'];

      var zipped = _.zip(selectedTableColumns, selectedTableColumnSchemas);
      return Object.assign({}, state, {
        openModal: true,
        modalContentType: 'Schema',
        modalContent: zipped
      });
      break;
    case "CLOSE_MODAL":
      return Object.assign({}, state, {
        openModal: false
      });

    default:

  }
  return state;
}

module.exports = buildModalApp;
