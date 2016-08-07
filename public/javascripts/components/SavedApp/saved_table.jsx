var React = require('react'),
    FirebaseManager = require('../../models/firebase_manager'),
    EngineQuery = require('../../models/engine_query');

var SavedTable = React.createClass({
  save: function (event) {
    var queryToSave = this.props.queries[event.target.id];
    FirebaseManager.saveQuery(queryToSave);
  },

  delete: function (event) {
    var queryToDelete = this.props.queries[event.target.id];
    // console.log(this.props.queries);
    // console.log(_.without(this.props.queries), queryToDelete);
    FirebaseManager.removeQuery(queryToDelete)
  },

  render: function () {
    var that = this;
    return (
      <table className="table">
        <tbody>
          <tr>
            <th>Table</th>
            <th>Element Count</th>
            <th>Link</th>
            <th>Actions</th>
          </tr>
          {
            this.props.queries.map(function (query, index) {
              var query = new EngineQuery(query)
              return (
                <tr key={index}>
                  <td>{query.table}</td>
                  <td>{(query.contents ? query.contents.length : 0) + (query.columns ? query.columns.length : 0)}</td>
                  <td><a href={'#/build?' + query.export()} className='btn btn-link'>Go to Build Page</a></td>
                  <td><div className='btn-group btn-group-block'>
                    <button id={index} onClick={that.delete} className='btn'>Delete</button>
                  </div></td>
                </tr>
              )
            })
          }
        </tbody>
      </table>
    )
  }
})

module.exports = SavedTable;
