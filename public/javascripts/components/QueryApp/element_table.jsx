var React = require("react"),
    ElementRow = require('./element_row'),
    FilterRow = require('./element_filter_row');

var ElementTable = React.createClass({
  render: function () {
    var that = this;
    var columns = this.props.columns.map(function (column) {
      return <ElementRow element={column} key={column.id}
        removeElementCallback={that.props.removeElementCallback}
        selectElementOrderCallback={that.props.selectElementOrderCallback}
        />
    });
    var contents = this.props.contents.map(function (content) {
      return <ElementRow element={content} key={content.id}
        removeElementCallback={that.props.removeElementCallback}
        selectElementOrderCallback={that.props.selectElementOrderCallback}
        />
    });
    var filters = this.props.filters.map(function (filter) {
      return <FilterRow filter={filter} key={filter.id + filter.filter_title}
        editFilterCallback={that.props.editFilterCallback}
        removeFilterCallback={that.props.removeFilterCallback}
        />
    });

    return (
      <table className='table'>
        <tbody>
          <tr><th colSpan='4'>Columns</th></tr>
          {columns}
          <tr><th colSpan='4'>Contents</th></tr>
          {contents}
          <tr><th colSpan='4'>Filters</th></tr>
          {filters}
        </tbody>
      </table>
    )
  }
});

module.exports = ElementTable;
