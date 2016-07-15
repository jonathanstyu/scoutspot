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
    SqlDefinitions = require("./components/sql_definitions"),
    QueryApp = require("./components/query_app");

// Model elements
var $ = require('jquery');
var _ = require('underscore');

var Engine = require('./models/engine');
// require('./templates/html_templates');

var engine = new Engine();

var bootstrap = JSON.parse($('#definitions').text().replace(/&quot;/g,'"'))
engine.load_definitions(bootstrap);

// Passing through QueryApp and definition
// Setting IndexRoute for dev purposes
// <IndexRoute component={Home} />
// <IndexRoute component={QueryApp} engine={engine} />

ReactDOM.render((
    <Router history={hashHistory}>
    <Route path="/" component={Wrapper}>
      <IndexRoute component={SqlDefinitions} definitions={bootstrap}  />      
      <Route path="query" component={QueryApp} engine={engine} />
      <Route path="definitions" component={SqlDefinitions} definitions={bootstrap} />
    </Route>
  </Router>
  ),
  document.getElementById("container")
);
