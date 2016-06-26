var EXPORTED_SYMBOLS = ["element_menu", "table_menu", "panel_template"]

table_menu = "<div class='container'>\
<table class='table' id='menu-list'><tbody>\
<% if (engine.query.table == '') { %>\
    <% _.forEach(engine.tables, function (table) { %>\
      <tr class='table-menu'><td id='<%= table._name %>'><%= table._name %></td></tr>\
    <% }) %>\
<% } else { %>\
  <button id='clear-selected-table'>Clear Selected Table</button>\
  <% _.forEach(engine.available_elements, function (element) { %>\
    <tr class='element-menu <%= element.type %>'><td id='<%= element.name %>'><%= element.name %></td></tr>\
  <% }) %>\
<% } %>\
</tbody></table>\
</div>"

panel_template = "<div class='container'>\
    <div class='columns col-gapless' id='filter-container'>\
      <div class='column col-6'><p>CONTENT GOES HERE</p></div>\
      <div class='column col-6'><p id='table-identifier'>\
      <% if (engine.query.table == '') { %>\
        No Table Selected\
      <% } else { %>\
        <%= engine.query.table %>\
      <% } %>\
      </p></div>\
    </div>\
      <div class='card'>\
        <div class='card-body' id='sql-content'>\
          <%= engine.render_query() %>\
        </div>\
      </div>\
  </div>"