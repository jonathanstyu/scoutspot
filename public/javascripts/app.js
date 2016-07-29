// React elements
// React + components
var React = require('react'),
    ReactDOM = require('react-dom'),
    Provider = require('react-redux').Provider;

// Custom React elements
var App = require("./components/app");

// DataManager

// Setting IndexRoute for dev purposes
ReactDOM.render((
    <App />
  ),
  document.getElementById("container")
);
