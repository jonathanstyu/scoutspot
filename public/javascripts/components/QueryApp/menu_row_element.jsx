var React = require("react");

var MenuRowElement = React.createClass({
  getInitialState: function () {
    // tableMode means we are just showing tables
    var element = this.props.element;
    return {
      header: element.name,
      secondary_header: element.type,
      buttonTitle: "Filter",
      id: element.id
    }
  },

  render: function () {
    return (
      <tr>
        <td onClick={this.props.clickRowCallback} id={this.state.id}>{this.state.header}</td>
        <td>{this.state.secondary_header}</td>
        <td><button className='btn btn-sm' onClick={this.props.clickButtonCallback} id={this.state.id}>{this.state.buttonTitle}</button></td>
      </tr>
    )
  }
});

module.exports = MenuRowElement;
