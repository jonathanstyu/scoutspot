var createStore = require('redux').createStore;
var spotApp = require('../reducers/reducers.js');

let store = createStore(spotApp);
module.exports = store;
