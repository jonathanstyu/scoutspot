// Libraries
var $ = require('jquery');

// React + components
var React = require("react"),
    Search = require("./search"),
    Menu = require("./menu"),
    PanelCard = require("./panel_card"),
    ElementTable = require("./element_table");

// Engine elements
var Engine = require('../models/engine');

var QueryApp = React.createClass({
  // engine is the only thing passed in as a props
  getInitialState: function () {
    var engine = this.props.route.engine;
    var query = engine.query;
    var available_tables = [];
    for (var key in engine.definitions['tables']) {
      if (engine.definitions['tables'].hasOwnProperty(key)) {
        available_tables.push(key);
      }
    };

    return {
      engine: engine,
      tableSelected: false,
      available_tables: available_tables,
      available_elements: [],
      joined_available_elements: [],
      renderedQuery: engine.render_query()
    }
  },

  refreshState: function () {
    var engine = this.state.engine;
    var renderedQuery = engine.render_query();
    
    this.setState({
      tableSelected: engine.query.table == "" ? false : true,
      available_elements: engine.available_elements,
      joined_available_elements: engine.joined_available_elements,
      renderedQuery: renderedQuery
    })
  },

  selectTable: function (event) {
    var that = this;
    var selectedTable = event.target.id;
    this.state.engine.select_table(selectedTable);
    this.refreshState();
  },

  resetQuery: function (event) {
    this.state.engine.reset_all()
    this.refreshState();
  },

  selectElement: function (event) {
    var that = this;
    this.state.engine.add_element(event.target.id);
    this.refreshState();
  },

  selectElementOrder: function (event) {
    var that = this;
    this.state.engine.add_element_ordering(event.target.id, event.target.value);
    this.refreshState();
  },

  removeElement: function (event) {
    this.state.engine.remove_element(event.target.id);
    this.refreshState();
  },

  selectFilter: function (event) {
    this.state.engine.add_filter(event.target.id);
    this.refreshState();
  },

  editFilter: function (filterData) {
    this.state.engine.edit_filter(filterData);
    this.refreshState();
  },

  removeFilter: function (event) {
    this.state.engine.remove_filter(event.target.id);
    this.refreshState();
  },

  saveQuery: function () {
    var query = this.state.engine.query;
    console.log(query);
  },

  render() {
    // Pre render the menu
    var menu = !this.state.tableSelected ?
      <Menu available_tables={this.state.available_tables}
        clickRowCallback={this.selectTable}
        /> :
      <Menu available_elements={this.state.available_elements}
        joined_available_elements={this.state.joined_available_elements}
        clickRowCallback={this.selectElement}
        clickButtonCallback={this.selectFilter}
        />

      //  Pre-render and attach callbacks to the filters/elements
      var panel = <ElementTable columns={this.state.engine.query.columns}
        contents={this.state.engine.query.contents}
        filters={this.state.engine.query.filters}
        selectElementOrderCallback={this.selectElementOrder}
        removeElementCallback={this.removeElement}
        editFilterCallback={this.editFilter}
        removeFilterCallback={this.removeFilter}
        />

    return (
      <div className='columns'>
        <div className='column col-md-4'>
          { menu }
        </div>
        <div className='column col-md-8'>
          <PanelCard
            renderedQuery={this.state.renderedQuery}
            resetCallback={this.resetQuery}
            saveCallback={this.saveQuery}
            />
          {panel}
        </div>
      </div>
    ); // closes return
  } // closes render function
}); // closes React class

module.exports = QueryApp;
