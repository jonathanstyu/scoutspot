var React = require('react'),
    _ = require('underscore'),
    connect = require('react-redux').connect;

var SQLDefinitionsEditor = require('./sql_def_editor');

var SqlDefinitions = React.createClass({
  render: function () {
    var that = this;

    return (
      <div>
        <SQLDefinitionsEditor />
      </div>
    )
  }
})

const mapStateToProps = (state) => {
  return {
    definitions: state.buildApp.definitions
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
  }
}

SqlDefinitions = connect(mapStateToProps, mapDispatchToProps)(SqlDefinitions);

module.exports = SqlDefinitions;
