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
    // console.log(store);
    var dataManager = new DataManager();
    return (
      <Provider store={store}>
        <Router history={hashHistory}>
          <Route path="/" component={NavBar}>
            <IndexRoute component={Home} dataManager={dataManager} />
            <Route path="build" component={QueryApp} dataManager={dataManager} />
            <Route path="saved" component={SavedApp} />
            <Route path="edit" component={SqlDefinitions} dataManager={dataManager} />
          </Route>
        </Router>
      </Provider>
    )
  }
});

module.exports = App;
