var React = require("react");

var MenuRowTable = React.createClass({
  getInitialState: function () {
    var table = this.props.table;
    return {
      header: table,
      buttonTitle: "See Schema",
      id: table
    }
  },

  render: function () {
    return (
      <tr>
        <td onClick={this.props.clickRowCallback} id={this.state.id}>{this.state.header}</td>
        <td></td>
        <td><button className='btn btn-sm' onClick={this.props.clickButtonCallback} id={this.state.id}>{this.state.buttonTitle}</button></td>
      </tr>
    )
  }
});

module.exports = MenuRowTable;
