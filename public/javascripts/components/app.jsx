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
    SqlDefinitions = require("./Definitions/sql_definitions"),
    QueryApp = require("./QueryApp/query_app"),
    Home = require("./HomeApp/home"),
    SavedApp = require("./SavedApp/saved_app");

var FirebaseManager = require('../models/firebase_manager');

// Redux and react actions
var store = require('../store/store_index'),
    fetchDefinitionsIfNeeded = require('../actions/definitions_actions');

var App = React.createClass({
  render: function () {
    FirebaseManager.initialize();
    FirebaseManager.handleRedirect();
    store.dispatch(fetchDefinitionsIfNeeded())

    return (
      <Provider store={store}>
        <Router history={hashHistory}>
          <Route path="/" component={NavBar}>
            <IndexRoute component={Home} />
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
