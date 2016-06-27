var EXPORTED_SYMBOLS = ["table_schema_template", "table_menu", "panel_template"]

table_menu = "<div class='container'>\
<table class='table' id='menu-list'><tbody>\
<% if (engine.query.table == '') { %>\
    <% _.forEach(engine.definitions['tables'], function (table) { %>\
      <tr>\
      <td id='<%= table.name %>' class='table-menu'><%= table.name %></td>\
      <td><button class='see-schema btn' id='<%= table.name %>'>See Schema</button></td>\
      </tr>\
    <% }) %>\
<% } else { %>\
  <div class='btn-group btn-group-block'>\
    <button class='btn' id='reset-all'>Reset All</button>\
    <button class='see-schema btn' id='<%= engine.query.table %>'>See Schema</button>\
  </div>\
    <tr><th colspan=2>Table: <%= engine.query.table %></th></tr>\
  <% _.forEach(engine.available_elements, function (element) { %>\
    <tr id='<%= element.id %>' class='element-menu-row'>\
      <td class='tooltip' data-tooltip='<%= element.description %>'><%= element.title %></td>\
      <td><%= element.type %></td>\
    </tr>\
  <% }) %>\
<% } %>\
</tbody></table>\
</div>"

panel_template = "<div class='container'>\
    <div class='column'>\
      <table class='table' id='menu-list'><tbody>\
        <tr><th colspan=2>Columns</th></tr>\
        <% _.forEach(engine.query.columns, function (column) { %>\
          <tr id='<%= column.id %>' class='element-panel-row element-panel-column'>\
            <td><%= column.title %></td>\
            <td><button class='btn remove-element' id='<%= column.id %>'>Remove</button></td>\
          </tr>\
        <% }) %>\
        <tr><th colspan=2>Contents</th></tr>\
        <% _.forEach(engine.query.contents, function (content) { %>\
          <tr id='<%= content.id %>' class='element-panel-row element-panel-content'>\
            <td><%= content.title %></td>\
            <td><button class='btn remove-element' id='<%= content.id %>'>Remove</button></td>\
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
          
table_schema_template = "<div class='column'>\
  <button class='dismiss-panel'>Return</button>\
  <table class='table'>\
    <tr><th>Columns</th></tr>\
    <% _.forEach(table.columns, function (column) { %>\
      <tr><td><%= column %></td></tr>\
    <% })%>\
  </table>\
</div>"