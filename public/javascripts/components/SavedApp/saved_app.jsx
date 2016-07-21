var React = require('react'),
    SavedTable = require('./saved_table');

var EngineQuery = require('../../models/engine_query');

var SavedApp = React.createClass({
  render: function () {
    return (
      <div className='container'>
        <div className='columns'>
          <h3>Saved Page</h3>
        </div>
        <div className='columns'>
          <SavedTable queries={this.props.route.dataManager.savedQueries} />
        </div>
      </div>
    )
  }
})

module.exports = SavedApp;
