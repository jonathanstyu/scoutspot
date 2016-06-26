var EXPORTED_SYMBOLS = ["element_menu", "table_menu", "right_column_template"]

table_menu = "<div class='container'>\
<table class='table' id='menu-list'><tbody>\
<% if (engine.selected_table == '') { %>\
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

right_column_template = "<div class='container'>\
    <div class='columns col-gapless' id='filter-container'>\
      <div class='column col-6'><p>CONTENT GOES HERE</p></div>\
      <div class='column col-6'><p id='table-identifier'>\
      <% if (engine.selected_table == '') { %>\
        No Table Selected\
      <% } else { %>\
        <%= engine.selected_table %>\
      <% } %>\
      </p></div>\
    </div>\
      <div class='card'>\
        <div class='card-body' id='sql-content'>\
          <%= engine.render_query(requested_query) %>\
        </div>\
      </div>\
  </div>"