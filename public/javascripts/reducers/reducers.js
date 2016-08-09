var combineReducers = require('redux').combineReducers;
var applyMiddleware = require('redux').applyMiddleware;
var thunkMiddleware = require('redux-thunk');

// Other reducers
var definitionsApp = require('./definitions_reducer'),
    savedApp = require('./saved_reducer'),
    buildApp = require('./build_reducer'),
    buildModalApp = require('./build_modal_reducer'),
    homeApp = require('./home_reducer');

var spotApp = combineReducers({
  definitionsApp,
  savedApp,
  buildApp,
  homeApp
})

module.exports = spotApp;
