var EXPORTED_SYMBOLS = ["element_menu", "table_menu", "panel_template"]

table_menu = "<div class='container'>\
<table class='table' id='menu-list'><tbody>\
<% if (engine.query.table == '') { %>\
    <% _.forEach(engine.tables, function (table) { %>\
      <tr class='table-menu'><td id='<%= table._name %>'><%= table._name %></td></tr>\
    <% }) %>\
<% } else { %>\
  <button id='reset-all'>Reset All</button>\
  <% _.forEach(engine.available_elements, function (element) { %>\
    <tr id='<%= element.id %>' class='element-menu-row'>\
      <td><%= element.name %></td>\
      <td><%= element.type %></td>\
    </tr>\
  <% }) %>\
<% } %>\
</tbody></table>\
</div>"

panel_template = "<div class='container'>\
    <div class='columns col-gapless'>\
      <div class='column col-6'><p>CONTENT GOES HERE</p></div>\
      <div class='column col-6'><p id='table-identifier'>\
      <% if (engine.query.table == '') { %>\
        No Table Selected\
      <% } else { %>\
        <%= engine.query.table %>\
      <% } %>\
      </p></div>\
    </div>\
    <div class='column'>\
      <table class='table' id='menu-list'><tbody>\
        <% _.forEach(engine.query.columns, function (column) { %>\
          <tr id='<%= column.id %>' class='element-panel-row element-panel-column'>\
            <td><%= column.name %></td>\
          </tr>\
        <% }) %>\
        <% _.forEach(engine.query.contents, function (content) { %>\
          <tr id='<%= content.id %>' class='element-panel-row element-panel-content'>\
            <td><%= content.name %></td>\
          </tr>\
        <% }) %>\
      </tbody></table>\
    </div>\
    <div class='card'>\
      <div class='card-body' id='sql-content'>\
        <%= engine.render_query() %>\
      </div>\
    </div>\
  </div>"