// Libraries
var $ = require('jquery');

// React + components
var React = require("react"),
    Menu = require("./menu"),
    PanelCard = require("./panel_card"),
    ElementTable = require("./element_table"),
    connect = require('react-redux').connect;

// Engine elements
var Engine = require('../../models/engine'),
    EngineQueryInterpreter = require('../../models/engine_query_interpreter'),
    DataManager = require('../../models/data_manager');

var QueryApp = React.createClass({
  // engine is the only thing passed in as a props
  getInitialState: function () {
    // if there is something to work from, we use it
    var queryStringObject = this.props.location.query;
    var dataManager = this.props.route.dataManager;
    var engine = dataManager.engine;
    var available_tables = _.keys(engine.definitions['tables']);


    if (!_.isEmpty(queryStringObject)) {
      EngineQueryInterpreter.open(queryStringObject, engine);
    }

    return {
      engine: engine,
      tableSelected: engine.query.table == "" ? false : true,
      available_tables: available_tables,
      available_elements: engine.available_elements,
      joined_available_elements: engine.joined_available_elements,
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

  render() {
    return (
      <div className='columns'>
        <div className='column col-md-4'>
          <Menu />
        </div>
        <div className='column col-md-8'>
          <PanelCard />
          <ElementTable />
        </div>
      </div>
    ); // closes return
  } // closes render function
}); // closes React class

module.exports = QueryApp;
