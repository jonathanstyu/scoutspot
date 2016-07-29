var React = require("react"),
    ElementRow = require('./element_row'),
    FilterRow = require('./element_filter_row'),
    connect = require('react-redux').connect;

var ElementTable = React.createClass({
  render: function () {
    var that = this;
    return (
      <table className='table'>
        <tbody>
          <tr><th colSpan='4'>Columns</th></tr>
          {
            this.props.columns.map(function (column) {
              return <ElementRow element={column} key={column.id} />
            })
          }
          <tr><th colSpan='4'>Contents</th></tr>
          {
            this.props.contents.map(function (content) {
              return <ElementRow element={content} key={content.id} />
            })
          }
          <tr><th colSpan='4'>Filters</th></tr>
          {
            this.props.filters.map(function (filter) {
              return <FilterRow filter={filter} key={filter.id + filter.filter_name} />
            })
          }
        </tbody>
      </table>
    )
  }
});

const mapStateToProps = (state) => {
  var state = state.buildApp; 
  return {
    columns: state.query_columns,
    contents: state.query_contents,
    filters: state.query_filters
  }
}

const mapDispatchToProps = (dispatch) => {
  return {

  }
}

ElementTable = connect(mapStateToProps, mapDispatchToProps)(ElementTable);

module.exports = ElementTable;
