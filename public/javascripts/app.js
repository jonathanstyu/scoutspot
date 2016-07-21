// React elements
// React + components
var React = require('react'),
    ReactDOM = require('react-dom'),
    Router = require('react-router').Router,
    Route = require('react-router').Route,
    IndexRoute = require('react-router').IndexRoute,
    Link = require('react-router').Link,
    hashHistory = require('react-router').hashHistory;

// Custom React elements
var Wrapper = require("./components/app"),
    Home = require("./components/home"),
    SqlDefinitions = require("./components/Definitions/sql_definitions"),
    QueryApp = require("./components/QueryApp/query_app"),
    SavedApp = require("./components/SavedApp/saved_app");

var DataManager = require('./models/data_manager');
var dataManager = new DataManager();

// Setting IndexRoute for dev purposes
ReactDOM.render((
    <Router history={hashHistory}>
    <Route path="/" component={Wrapper}>
      <IndexRoute component={Home} dataManager={dataManager} />
      <Route path="build" component={QueryApp} dataManager={dataManager} />
      <Route path="saved" component={SavedApp} dataManager={dataManager}/>
      <Route path="edit" component={SqlDefinitions} dataManager={dataManager} />
    </Route>
  </Router>
  ),
  document.getElementById("container")
);
