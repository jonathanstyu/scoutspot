var React = require('react'),
    SavedTable = require('./saved_table'),
    connect = require('react-redux').connect;

var EngineQuery = require('../../models/engine_query');

var SavedApp = React.createClass({
  render: function () {
    return (
      <div className='container'>
        <div className='columns'>
          <h3>Saved Page</h3>
        </div>
        <div className='columns'>
          <SavedTable queries={this.props.savedQueries} />
        </div>
      </div>
    )
  }
})

const mapStateToProps = (state) => {
  var state = state.buildApp;
  return {
    savedQueries: state.savedQueries
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
  }
}

SavedApp = connect(mapStateToProps, mapDispatchToProps)(SavedApp);
module.exports = SavedApp;
