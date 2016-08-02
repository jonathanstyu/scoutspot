var React = require('react'),
    _ = require('underscore'),
    Freezer = require('freezer-js'),
    connect = require('react-redux').connect;

var ObjectAttribute = require('./sql_def_editor_obj_attr');

var typeDefaultValues = {
  string: "",
  object: {},
  array: []
}

var SQLDefinitionsEditor = React.createClass({
  render: function () {
    var that = this;
    return (
      <div>
        <header className='navbar'>
          <section className='section-navbar'>
            <button className='btn'>Save</button>
          </section>
        </header>
        <hr />
        <div className='container' id='editor'>
          <ObjectAttribute value={this.props.definitions} />
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
