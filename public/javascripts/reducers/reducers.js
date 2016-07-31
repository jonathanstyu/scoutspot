var combineReducers = require('redux').combineReducers;

// Other reducers
var definitionsApp = require('./definitions_reducer'),
    savedApp = require('./saved_reducer'),
    buildApp = require('./build_reducer'),
    homeApp = require('./home_reducer');

var spotApp = combineReducers({
  definitionsApp,
  savedApp,
  buildApp,
  homeApp
})

module.exports = spotApp;
