var React = require("react");

var MenuRow = React.createClass({
  getInitialState: function () {
    return {
      name: "Name",
      classification: "Type",
      buttonTitle: "Button"
    }
  },
  render: function () {
    return (
      <tr>
        <td>{this.state.name}</td>
        <td>{this.state.classification}</td>
        <td>{this.state.buttonTitle}</td>
      </tr>
    )
  }
});

module.exports = MenuRow;
