var React = require("react");

var ElementRow = React.createClass({
  getInitialState: function () {
    return {
      name: "none",
      id: ""
    }
  },

  closeButtonClicked: function (event) {
    console.log(event.target);
  },

  render: function () {
    return (
      <tr id={this.state.id} className='element-panel-row'>
        <td>{this.state.name}</td>
        <td></td>
        <td></td>
        <td><button className='btn' id=this.state.id onClick={this.closeButtonClicked}>X</button></td>
      </tr>
    )
  }
});

module.exports = ElementRow;
