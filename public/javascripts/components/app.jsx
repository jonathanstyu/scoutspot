// React + components
var React = require('react'),
    ReactDOM = require('react-dom'),
    Router = require('react-router').Router,
    Route = require('react-router').Route,
    IndexRoute = require('react-router').IndexRoute,
    Link = require('react-router').Link,
    hashHistory = require('react-router').hashHistory,
    Provider = require('react-redux').Provider;

var NavBar = require("./navbar"),
    Home = require("./home"),
    SqlDefinitions = require("./Definitions/sql_definitions"),
    QueryApp = require("./QueryApp/query_app"),
    SavedApp = require("./SavedApp/saved_app");

var DataManager = require('../models/data_manager');
var store = require('../store/store_index');

var App = React.createClass({
  render: function () {
    var dataManager = new DataManager();
    dataManager.setupThirdParty(); 
    return (
      <Provider store={store}>
        <Router history={hashHistory}>
          <Route path="/" component={NavBar}>
            <IndexRoute component={Home} dataManager={dataManager} />
            <Route path="build" component={QueryApp} />
            <Route path="saved" component={SavedApp} />
            <Route path="edit" component={SqlDefinitions} />
          </Route>
        </Router>
      </Provider>
    )
  }
});

module.exports = App;
