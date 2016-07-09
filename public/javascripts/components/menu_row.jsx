var React = require("react");

var MenuRow = React.createClass({
  getInitialState: function () {
    // tableMode means we are just showing tables
    if (this.props.tableMode) {
      return {
        name: this.props.name,
        classification: "",
        buttonTitle: "See Schema",
        id: this.props.name
      }
    } else {
      return {
        name: this.props.element.title,
        classification: this.props.element.type,
        id: this.props.element.id,
        buttonTitle: "Filter"
      }
    } // close else statement
  },

  render: function () {
    return (
      <tr>
        <td onClick={this.props.clickRowCallback} id={this.state.id}>{this.state.name}</td>
        <td>{this.state.classification}</td>
        <td><button className='btn btn-sm' onClick={this.props.clickButtonCallback} id={this.state.id}>{this.state.buttonTitle}</button></td>
      </tr>
    )
  }
});

module.exports = MenuRow;
