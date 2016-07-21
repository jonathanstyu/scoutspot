var React = require('react'),
    SavedTableRow = require('./saved_table_row');

var SavedTable = React.createClass({
  render: function () {
    return (
      <table className="table">
        <tbody>
          <tr>
            <th>Query</th>
            <th>What's in it?</th>
          </tr>
          {
            this.props.queries.map(function (query) {
              return <SavedTableRow querySave={query} />
            })
          }
        </tbody>
      </table>
    )
  }
})

module.exports = SavedTable;
