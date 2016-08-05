var createStore = require('redux').createStore,
    applyMiddleware = require('redux').applyMiddleware,
    createLogger = require('redux-logger'),
    thunk = require('redux-thunk').default;

var spotApp = require('../reducers/reducers.js');

const loggerMiddleware = createLogger();
let store = createStore(
  spotApp,
  applyMiddleware(
    thunk,
    loggerMiddleware
  )
);
module.exports = store;
