var React = require("react"),
    MenuRow = require("./menu_row");

var Menu = React.createClass({

  render: function () {
    var tableHeader = this.props.header;
    var tables = this.props.tables;

    return (
      <table className='table' id='menu-list'>
        <tbody>
          <tr><th>{tableHeader}</th></tr>
        </tbody>
      </table>
    )
  }
});

module.exports = Menu;
