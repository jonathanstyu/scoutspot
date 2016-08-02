var createStore = require('redux').createStore,
    applyMiddleware = require('redux').applyMiddleware,
    thunk = require('redux-thunk');

var spotApp = require('../reducers/reducers.js');

let store = createStore(
  spotApp
);
module.exports = store;
