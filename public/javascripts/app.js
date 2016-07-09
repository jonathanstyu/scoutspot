// React elements

var React = require("react");
var ReactDOM = require("react-dom");
var App = require("./components/app");
var Menu = require("./components/menu"),
    Panel = require("./components/panel");

// Model elements
var $ = require('jquery');
var _ = require('underscore');

var Engine = require('./models/engine');
// require('./templates/html_templates');

var engine = new Engine();

var bootstrap = JSON.parse($('#definitions').text().replace(/&quot;/g,'"'))
engine.load_definitions(bootstrap);

ReactDOM.render(
  <App engine={engine} />,
  document.getElementById("container")
);
