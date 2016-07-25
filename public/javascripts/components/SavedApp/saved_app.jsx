var React = require('react'),
    SavedTable = require('./saved_table'),
    connect = require('react-redux').connect,
    store = require('../../store/store_index');

var EngineQuery = require('../../models/engine_query');

var SavedApp = React.createClass({
  render: function () {
    return (
      <div className='container'>
        <div className='columns'>
          <h3>Saved Page</h3>
        </div>
        <div className='columns'>
          <SavedTable queries={store.getState().savedQueries} />
        </div>
      </div>
    )
  }
})
SavedApp = connect()(SavedApp);
module.exports = SavedApp;
