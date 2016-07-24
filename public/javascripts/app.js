// React elements
// React + components
var React = require('react'),
    ReactDOM = require('react-dom');

// Custom React elements
var App = require("./components/app");

// Setting IndexRoute for dev purposes
ReactDOM.render((
    <App />
  ),
  document.getElementById("container")
);
