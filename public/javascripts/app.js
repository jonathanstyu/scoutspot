var $ = require('jquery'); 
var _ = require('underscore'); 

var Element = require('./models/element'); 
var EngineQuery = require('./models/engine_query'); 
var Filter = require('./models/filter'); 
var Engine = require('./models/engine'); 
require('./templates/html_templates'); 

var engine = new Engine(); 

var bootstrap = JSON.parse($('#definitions').text().replace(/&quot;/g,'"'))
engine.load_definitions(bootstrap); 

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

// select table 
$(document).on('click', '.table-menu', function(event) {
  engine.select_table(event.target.id); 
  render(); 
});

// click on the see table schema button 
$(document).on('click', '.see-schema', function(event) {
  var compiled_schema = _.template(table_schema_template); 
  $('#panel').html(compiled_schema({
    table: engine.definitions['tables'][event.currentTarget.id]
  }))
});

// dismiss and go back to the standard panel. Just rerun the render
$(document).on('click', '.dismiss-panel', function(event) {
  render();
});

// reset everything 
$(document).on('click', '#reset-all', function(event) {
  engine.reset_all();
  render(); 
});

// select column or content 
$(document).on('click', 'tr.element-menu-row', function(event) {
  engine.add_element(event.currentTarget.id); 
  render(); 
});

$(document).on('click', '.remove-element', function(event) { 
  engine.remove_element(event.currentTarget.id);
  render(); 
});

// actions on the sql query 
$(document).on('click', '#copy-query', function(event) { 
  console.log("copy the query!: " + $('#sql-content').text())
  render(); 
});

render(); 