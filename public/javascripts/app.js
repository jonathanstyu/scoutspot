var $ = require('jquery'); 
var _ = require('underscore'); 

var Element = require('./models/element'); 
var EngineQuery = require('./models/engine_query'); 
var Filter = require('./models/filter'); 
var Engine = require('./models/engine'); 
require('./templates/html_templates'); 

var engine = new Engine(); 

var bootstrap = JSON.parse($('#definitions').text().replace(/&quot;/g,'"'))
engine.loadDefinitions(bootstrap); 

var render = function () {
  var menu = _.template(table_menu); 
  $("#menu").html(menu({
    engine: engine
  })); 

  var panel = _.template(panel_template); 
  $("#panel").html(panel({
    engine: engine
  })); 
}

$(document).on('click', '.table-menu', function(event) {
  engine.select_table(event.target.id); 
  render(); 
});

$(document).on('click', '#clear-selected-table', function(event) {
  engine.clear_selected_table();
  render(); 
});

render(); 