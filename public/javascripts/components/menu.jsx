var React = require("react"),
    MenuRow = require("./menu_row");

var Menu = React.createClass({
  buttonClicked: function (event) {
    this.props.clickButtonCallback(event); 
  },

  rowClicked: function (event) {
    this.props.clickRowCallback(event);
  },

  render: function () {
    var that = this;
    var tableHeader = "";

    var menu_components = []
    var joined_components = []

    if (this.props.available_tables) {
      tableHeader = "Tables";
      menu_components = this.props.available_tables.map(function (table) {
        return <MenuRow name={table} key={table} tableMode={true} clickButtonCallback={that.buttonClicked} clickRowCallback={that.rowClicked} />
      });
    } else {
      tableHeader = "Selected Table";
      menu_components = this.props.available_elements.map(function (element) {
        return <MenuRow element={element} key={element.id} id={element.id} tableMode={false} clickButtonCallback={that.buttonClicked} clickRowCallback={that.rowClicked} />
      })

      joined_components = this.props.joined_available_elements.map(function (element) {
        return <MenuRow element={element} key={element.id} id={element.id} tableMode={false} clickButtonCallback={that.buttonClicked} clickRowCallback={that.rowClicked} />
      })
    }

    return (
      <table className='table' id='menu-list'>
        <tbody>
          <tr><th colSpan='3'>{ tableHeader }</th></tr>
          { menu_components }
          { joined_components }
        </tbody>
      </table>
    )
  }
});

module.exports = Menu;
