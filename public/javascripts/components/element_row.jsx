var React = require("react");

var ElementRow = React.createClass({
  closeButtonClicked: function (event) {
    this.props.removeElementCallback(event);
  },

  render: function () {
    var element = this.props.element;
    return (
      <tr id={element.id} className='element-panel-row'>
        <td colSpan='2'>{element.name}</td>
        <td><select className='form-select' value=""><option></option><option>ASC</option><option>DESC</option></select></td>
        <td><button className='btn' id={element.id} onClick={this.closeButtonClicked}>X</button></td>
      </tr>
    )
  }
});

module.exports = ElementRow;
