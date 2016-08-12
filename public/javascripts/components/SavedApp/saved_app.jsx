var React = require('react'),
    SavedTable = require('./saved_table'),
    FirebaseManager = require('../../models/firebase_manager'),
    store = require('../../store/store_index'),
    connect = require('react-redux').connect;

var EngineQuery = require('../../models/engine_query');
var fetchSavedQueries = require('../../actions/actions.js').fetchSavedQueries;

var SavedApp = React.createClass({
  fetchQueries: function () {
    this.props.dispatch(fetchSavedQueries());
  },

  render: function () {
    return (
      <div className='container'>
        <div className='columns'>
          <div className='col-md-9'><h4>Saved Queries</h4></div>
          <div className='col-md-3'>
            <div className={this.props.fetching ? 'btn-group btn-group-block loading' : 'btn-group btn-group-block'}>
              <button className='btn' onClick={this.fetchQueries}>Refresh Queries</button>
            </div>
          </div>
        </div>
        <div className='columns'>
          <SavedTable queries={this.props.savedQueries} />
        </div>
      </div>
    )
  }
})

const mapStateToProps = (state) => {
  var state = state.savedApp;
  return {
    savedQueries: state.savedQueries
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    // fetchQueries: () => {dispatch({type: 'FETCH_QUERIES'})},
    dispatch: dispatch
  }
}

SavedApp = connect(mapStateToProps, mapDispatchToProps)(SavedApp);
module.exports = SavedApp;
