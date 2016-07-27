var React = require("react"),
    connect = require('react-redux').connect;

var ElementRow = React.createClass({
  getInitialState: function () {
    return {
      ascendValue: ""
    }
  },

  selectAscendValue: function (event) {
    this.setState({
      ascendValue: event.target.value
    });
    this.props.selectAscendValue(event);
  },

  render: function () {
    var element = this.props.element;
    return (
      <tr id={element.id} className='element-panel-row'>
        <td colSpan='2'>{element.name}</td>
        <td>
          <select className='form-select' value={this.state.ascendValue} onChange={this.selectAscendValue} id={element.id} >
            <option></option>
            <option>ASC</option>
            <option>DESC</option>
          </select>
        </td>
        <td><button className='btn' id={element.id} onClick={this.props.removeElement}>X</button></td>
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
    removeElement: (event) => {
      dispatch({
        type: "REMOVE_ELEMENT",
        value: event.target.id
      })
    },
    selectAscendValue: (event) => {
      dispatch({
        type: "SET_ASC_VALUE",
        value: event.target.value,
        id: event.target.id
      })
    }
  }
}

ElementRow = connect(mapStateToProps, mapDispatchToProps)(ElementRow);

module.exports = ElementRow;
