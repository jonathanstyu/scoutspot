var React = require("react"),
    connect = require('react-redux').connect;

var MenuRowElement = React.createClass({
  render: function () {
    var element = this.props.element;
    return (
      <tr>
        <td onClick={this.props.selectElement} id={element.id}>{element.name}</td>
        <td>{element.type}</td>
        <td><button className='btn btn-sm' onClick={this.props.selectFilter} id={element.id}>Filter</button></td>
      </tr>
    )
  }
});

const mapStateToProps = function (state) {
  return ({

  })
}

const mapDispatchToProps = (dispatch) => {
  return {
    selectElement: (event) => {
      dispatch({type: "SELECT_ELEMENT", value: event.target.id})
    },
    selectFilter: (event) => {
      dispatch({type: "SELECT_FILTER", value: event.target.id})
    }
  }
}

MenuRowElement = connect(mapStateToProps, mapDispatchToProps)(MenuRowElement);

module.exports = MenuRowElement;
