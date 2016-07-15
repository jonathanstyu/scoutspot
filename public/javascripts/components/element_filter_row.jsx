var React = require("react");

var FilterRow = React.createClass({
  getInitialState: function () {
    return {
      filter_id: this.props.filter.id,
      filter_method: "",
      filter_value: ""
    }
  },

  selectMethod: function (event) {
    this.setState({
      filter_method: event.target.value
    });
    this.props.editFilterCallback(this.state);
  },

  selectValue: function (event) {
    this.setState({
      filter_value: event.target.value
    });
    this.props.editFilterCallback(this.state);
  },

  closeButtonClicked: function (event) {
    this.props.removeFilterCallback(event);
  },

  render: function () {
    var that = this;
    var filter = this.props.filter;
    selectOptions = ['','Is Not Null', 'Greater Than', 'Equals', 'Less Than', 'Contains', 'Other'].map(function (option) {
      return <option key={option}>{option}</option>
    });
    return (
      <tr id={this.state.id} className='element-panel-row'>
        <td>{filter.filter_title}</td>
        <td><select value={this.state.filter_method} className='form-select'  onChange={this.selectMethod}>{selectOptions}</select></td>
        <td><input value={this.state.filter_value} onChange={this.selectValue}></input></td>
        <td><button className='btn' id={this.state.filter_id} onClick={this.closeButtonClicked}>X</button></td>
      </tr>
    )
  }
});

module.exports = FilterRow;
