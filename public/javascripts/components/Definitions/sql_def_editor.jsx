var React = require('react'),
    _ = require('underscore'),
    Freezer = require('freezer-js'),
    FirebaseManager = require('../../models/firebase_manager'),
    connect = require('react-redux').connect;

var ObjectAttribute = require('./sql_def_editor_obj_attr');

var SQLDefinitionsEditor = React.createClass({
  saveDefinitions: function () {
    FirebaseManager.saveDefinitions(this.props.definitions);
  },
  render: function () {
    var that = this;
    return (
      <div>
        <header className='navbar'>
          <section className='section-navbar'>
            <button className='btn' onClick={this.saveDefinitions}>Save</button>
          </section>
        </header>
        <hr />
        <div className='container' id='editor'>
          <ObjectAttribute value={this.props.definitions} parent={true} />
        </div>
      </div>
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

SQLDefinitionsEditor = connect(mapStateToProps, mapDispatchToProps)(SQLDefinitionsEditor);

module.exports = SQLDefinitionsEditor;

module.exports = SQLDefinitionsEditor;
