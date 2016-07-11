var React = require("react"),
    MenuSectionHeader = require("./menu_section_header"),
    MenuRowElement = require("./menu_row_element"),
    MenuRowTable = require("./menu_row_table");

var Menu = React.createClass({

  render: function () {
    var that = this;
    var table = []

    if (this.props.available_tables) {
      var table_elements = this.props.available_tables.map(function (table) {
        return <MenuRowTable table={table} key={table + "table"}
          clickButtonCallback={that.buttonClicked} clickRowCallback={that.props.clickRowCallback} />
      });

      return (
        <table className='table' id='menu-list'>
          <tbody>
            <MenuSectionHeader sectionHeader={"Tables"}/>
            {table_elements}
          </tbody>
        </table>
      ) // close the first return statement
    } else {
      var table_elements = this.props.available_elements.map(function (object) {
        return <MenuRowElement element={object} key={object.id + "object"} clickButtonCallback={that.props.clickButtonCallback} clickRowCallback={that.props.clickRowCallback} />
      });

      var joined_elements = this.props.joined_available_elements.map(function (object) {
        return <MenuRowElement element={object} key={object.id + "filter"} clickButtonCallback={that.props.clickButtonCallback} clickRowCallback={that.props.clickRowCallback} />
      });

      return (
        <table className='table' id='menu-list'>
          <tbody>
            <MenuSectionHeader sectionHeader={"Elements"}/>
            {table_elements}
            <MenuSectionHeader sectionHeader={"Joined"}/>
            {joined_elements}
          </tbody>
        </table>
      ) // close return
    }; // close huge if else statement
  } // close render
});

module.exports = Menu;
