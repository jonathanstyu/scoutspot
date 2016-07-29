var React = require("react"),
    MenuRowElement = require("./menu_row_element"),
    MenuRowTable = require("./menu_row_table"),
    connect = require('react-redux').connect;

var Menu = React.createClass({

  render: function () {
    var that = this;
    if (!this.props.table_selected) {
      var table_elements = this.props.available_tables.map(function (table) {
        return <MenuRowTable table={table} key={table + "table"} />
      });

      return (
        <table className='table' id='menu-list'>
          <tbody>
            <tr><th colSpan='3'>Tables</th></tr>
            {table_elements}
          </tbody>
        </table>
      ) // close the first return statement
    } else {
      var table_elements = this.props.available_elements.map(function (object) {
        return <MenuRowElement element={object} key={object.id + "object"} />
      });

      var joined_elements = this.props.joined_available_elements.map(function (object) {
        return <MenuRowElement element={object} key={object.id + "filter"} />
      });

      return (
        <table className='table' id='menu-list'>
          <tbody>
            <tr><th colSpan='3'>Elements</th></tr>
            {table_elements}
            <tr><th colSpan='3'>Joined</th></tr>
            {joined_elements}
          </tbody>
        </table>
      ) // close return
    }; // close huge if else statement
  } // close render
});

const mapStateToProps = (state) => {
  var state = state.buildApp;
  return {
    table_selected: state.table_selected,
    available_tables: state.available_tables,
    available_elements: state.available_elements,
    joined_available_elements: state.joined_available_elements,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {

  }
}


Menu = connect(mapStateToProps, mapDispatchToProps)(Menu);

module.exports = Menu;
