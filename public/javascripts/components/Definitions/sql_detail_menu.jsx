var React = require('react'),
    _ = require('underscore'),
    connect = require('react-redux').connect;

var SqlDetailMenu = React.createClass({
  render: function () {
    var that = this;
    var definitions = that.props.definitions;

    switch (this.props.tabFocus) {
      case "Tables":
      // dive into the def/tables/selectedTable/columns array
      detailItems = _.map(definitions["tables"], function (table, key) {
        return (
          <tr id={key} key={"table"+key} onClick={() => that.props.selectDetailItemCallback(table)} ><td>{key}</td></tr>
        )
      })
        break;
      case "Joins":

      detailItems = definitions['joins'].map(function (join) {
        return (
          <tr id={join.id} key={"join"+join.id} onClick={() => that.props.selectDetailItemCallback(join)} >
            <td>{join.foreign_key_table} to {join.primary_key_table}</td>
            <td>Foreign Key: {join.foreign_key}</td>
            </tr>
        )
      });
        break;
      case "Custom Elements":
      detailItems = definitions['elements'].map(function (element) {
        return (
          <tr id={element.name} key={"element"+element.name}
            onClick={() => that.props.selectDetailItemCallback(element)}>
            <td>{element.name}</td>
            <td>{element.type}</td>
          </tr>
        )
      });
        break;
      default:
      detailItems = [
        <tr key='empty'><td>Empty</td></tr>
      ]
    }

    return(
      <table className='table'>
        <tbody>
          {detailItems}
        </tbody>
      </table>
    )
  }
});

const mapStateToProps = (state) => {
  return {
    definitions: state.buildApp.definitions
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
  }
}

SqlDetailMenu = connect(mapStateToProps, mapDispatchToProps)(SqlDetailMenu);

module.exports = SqlDetailMenu;
