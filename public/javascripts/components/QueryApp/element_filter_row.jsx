var React = require("react"),
    connect = require('react-redux').connect;

var FilterRow = React.createClass({
  getInitialState: function () {
    return {
      filter_id: this.props.filter.id,
      filter_method: this.props.filter.method,
      filter_value: this.props.filter.value
    }
  },

  selectMethod: function (event) {
    var that = this;
    that.setState({
      filter_method: event.target.value
    });
    that.props.editFilterMethod(event);
  },

  selectValue: function (event) {
    var that = this;
    that.setState({
      filter_value: event.target.value
    });
    that.props.editFilterValue(event);
  },

  render: function () {
    var that = this;
    var filter = this.props.filter;
    selectOptions = ['','Is Not Null', 'Equals', 'Greater Than Equals', 'Less Than Equals' ,'Greater Than', 'Less Than', 'Contains'].map(function (option) {
      return <option key={option}>{option}</option>
    });
    return (
      <tr id={this.state.filter_id} className='element-panel-row'>
        <td>{filter.filter_name}</td>
        <td><select id={this.state.filter_id} value={this.state.filter_method} className='form-select'  onChange={this.selectMethod}>{selectOptions}</select></td>
        <td><input value={this.state.filter_value} onChange={this.selectValue} id={this.state.filter_id}></input></td>
        <td><button className='btn' id={this.state.filter_id} onClick={this.props.removeFilter}>X</button></td>
      </tr>
    )
  }
});

const mapStateToProps = (state) => {
  return {

  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    removeFilter: (event) => {
      dispatch({
        type: "REMOVE_FILTER",
        value: event.target.id
      })
    },
    editFilterValue: (event) => {
      dispatch({
        type: "EDIT_FILTER_VALUE",
        id: event.target.id,
        value: event.target.value
      })
    },
    editFilterMethod: (event) => {
      dispatch({
        type: "EDIT_FILTER_METHOD",
        id: event.target.id,
        method: event.target.value
      })
    }
  }
}

FilterRow = connect(mapStateToProps, mapDispatchToProps)(FilterRow);

module.exports = FilterRow;
