var React = require("react"),
    MenuRowElement = require("./menu_row_element"),
    MenuRowTable = require("./menu_row_table"),
    connect = require('react-redux').connect,
    fetchDefinitions = require('../../actions/definitions_actions');

var Menu = React.createClass({

  render: function () {
    var that = this;
    var tbodyContent;
    if (this.props.emptyDefinitions) {
      return (
        <div>
          <h4>Build a definitions file to start writing queries</h4>
          <button className='btn'>Start</button>
          <button className='btn' onClick={this.props.fetchDefinitions}>Signin and Sync</button>
        </div>
      )
    }

    if (!this.props.table_selected) {
      tbodyContent = (
        <tbody>
          <tr><th colSpan='3'>Tables</th></tr>
          {
            this.props.available_tables.map(function (table) {
              return <MenuRowTable table={table} key={table + "table"} />
            })
          }
        </tbody>
      )
    } else {
      tbodyContent = (
        <tbody>
          <tr><th colSpan='3'>Elements</th></tr>
          {
            this.props.available_elements.map(function (object) {
              return <MenuRowElement element={object} key={object.id + "object"} />
            })
          }
          <tr><th colSpan='3'>Joined</th></tr>
          {
            this.props.joined_available_elements.map(function (object) {
              return <MenuRowElement element={object} key={object.id + "filter"} />
            })
          }
        </tbody>
      )
    }; // close huge if else statement
    return (
      <table className='table' id='menu-list'>
        {tbodyContent}
      </table>
    ) // close the first return statement
  } // close render
});

const mapStateToProps = (state) => {
  var state = state.buildApp;
  return {
    table_selected: state.table_selected,
    available_tables: state.available_tables,
    available_elements: state.available_elements,
    joined_available_elements: state.joined_available_elements,
    emptyDefinitions: _.isEmpty(state.definitions)
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchDefinitions: () => {
      dispatch(fetchDefinitions())
    }
  }
}


Menu = connect(mapStateToProps, mapDispatchToProps)(Menu);

module.exports = Menu;
