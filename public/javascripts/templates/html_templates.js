var EXPORTED_SYMBOLS = ["table_schema_template", "table_menu", "panel_card_template", "panel_table_template", "join_schema_template"]

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
    <tr><th colspan=3>Table: <%= engine.query.table %></th></tr>\
  <% _.forEach(engine.available_elements, function (element) { %>\
    <tr id='<%= element.id %>' class='element-menu-row'>\
      <td class='tooltip tooltip-right' data-tooltip='<%= element.description %>'><%= element.title %></td>\
      <td><%= element.type %></td>\
      <% if (element.type == 'column') { %>\
        <td><button id='<%= element.id %>' class='btn element-filter'>Filter</button></td>\
      <% } %>\
    </tr>\
  <% }) %>\
  <tr><th colspan=3>Joined Elements</th></tr>\
  <% _.forEach(engine.joined_available_elements, function (element) { %>\
    <tr id='<%= element.id %>' class='element-menu-row'>\
      <td class='tooltip tooltip-right' data-tooltip='<%= element.description %>'><%= element.title %></td>\
      <td><%= element.type %></td>\
      <% if (element.type == 'column') { %>\
        <td><button id='<%= element.id %>' class='btn element-filter'>Filter</button></td>\
      <% } %>\
    </tr>\
  <% }) %>\
<% } %>\
</tbody></table>\
</div>"

panel_card_template = "<div class='container'>\
    <div class='column'>\
      <div class='card'>\
        <div class='card-body' id='sql-content'>\
          <p><%= engine.render_query() %></p>\
        </div>\
        <div class='card-footer'>\
          <div class='btn-group btn-group-block'>\
            <button class='btn' id='copy-query'>Copy</button>\
            <button class='btn'>Save</button>\
          </div>\
        </div>\
      </div>"

panel_table_template = "<table class='table' id='menu-list'><tbody>\
        <tr><th colspan=4>Columns</th></tr>\
        <% _.forEach(engine.query.columns, function (column) { %>\
          <tr id='<%= column.id %>' class='element-panel-row element-panel-column'>\
            <td><%= column.title %></td>\
            <td><button class='btn remove-element' id='<%= column.id %>'>X</button></td>\
          </tr>\
        <% }) %>\
        <tr><th colspan=4>Contents</th></tr>\
        <% _.forEach(engine.query.contents, function (content) { %>\
          <tr id='<%= content.id %>' class='element-panel-row element-panel-content'>\
            <td><%= content.title %></td>\
            <td><button class='btn remove-element' id='<%= content.id %>'>X</button></td>\
          </tr>\
        <% }) %>\
        <tr><th colspan=4>Filters</th></tr>\
        <% _.forEach(engine.query.filters, function (filter) { %>\
          <tr id='<%= filter.id %>' class='filter-panel-row'>\
            <td><%= filter.filter_title %></td>\
            <td>\
            <select class='form-select filter-select' id='<%= filter.id %>'>\
            <% _.each(['','Is Not Null', 'Greater Than', 'Equals', 'Less Than', 'Contains', 'Other'], function (method_option) { %>\
              <option <%= method_option == filter.method ? 'selected' : '' %> ><%= method_option %></option>\
            <% }) %>\
            </select></td>\
            <td><input class='filter-input' type='text' id='<%= filter.id %>' value='<%= filter.value %>' /></td>\
            <td><button class='btn remove-filter' id='<%= filter.id %>'>X</button></td>\
          </tr>\
        <% }) %>\
      </tbody></table>\
    </div>\
  </div>"
          
table_schema_template = "<div class='column'>\
  <button class='dismiss-panel btn'>Return</button>\
  <div class='container'>\
    <h3><%= table %> Elements</h3>\
    <% _.forEach(available_elements, function (element) { %>\
      <div>\
        <form class='form-horizontal'>\
          <% _.forEach(['table', 'type', 'description', 'title', 'sql_func', 'sql_code'], function (element_component) { %>\
            <div class='form-group'>\
              <label class='form-label' for='id='<%= element.title + element_component %>''><%= element_component %></label>\
              <input class='form-label' id='<%= element.title + element_component %>' value='<%= element[element_component] %>'></input>\
            </div>\
          <% }) %>\
        </form>\
        <div class='divider'></div>\
      </div>\
    <% })%>\
  </container>\
</div>"
            
join_schema_template = "<div class='column'>\
          <button class='dismiss-panel btn'>Return</button>\
          <div class='container'>\
            <h3><%= table %> Joins</h3>\
            <% _.forEach(available_elements, function (element) { %>\
              <div>\
                <form class='form-horizontal'>\
                  <% _.forEach(['table', 'type', 'description', 'title', 'sql_func', 'sql_code'], function (element_component) { %>\
                    <div class='form-group'>\
                      <label class='form-label' for='id='<%= element.title + element_component %>''><%= element_component %></label>\
                      <input class='form-label' id='<%= element.title + element_component %>' value='<%= element[element_component] %>'></input>\
                    </div>\
                  <% }) %>\
                </form>\
                <div class='divider'></div>\
              </div>\
            <% })%>\
          </container>\
        </div>"