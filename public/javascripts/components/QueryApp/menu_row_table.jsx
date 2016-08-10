var React = require("react"),
    connect = require('react-redux').connect;

var MenuRowTable = React.createClass({
  getInitialState: function () {
    var table = this.props.table;
    return {
      header: table,
      id: table
    }
  },

  render: function () {
    return (
      <tr>
        <td onClick={this.props.selectTable} id={this.state.id}>{this.state.header}</td>
        <td></td>
        <td>
          <button className='btn btn-sm' id={this.state.id} onClick={this.props.seeTableSchema}>Schema</button>
        </td>
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
    selectTable: (event) => {
      dispatch({type: "SELECT_TABLE", value: event.target.id})
    },
    seeTableSchema: (event) => {
      dispatch({type: "SEE_TABLE_SCHEMA_MODAL", value: event.target.id})
    }
  }
}

MenuRowTable = connect(mapStateToProps, mapDispatchToProps)(MenuRowTable);

module.exports = MenuRowTable;
