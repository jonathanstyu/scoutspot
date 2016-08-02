var React = require('react'),
    _ = require('underscore'),
    Freezer = require('freezer-js'),
    connect = require('react-redux').connect;

var StringAttribute = React.createClass({
  getInitialState: function () {
    return ({
      editing: !this.props.value,
      value: this.props.value,
      modified: false
    })
  },
  render: function () {
    var className = 'stringAttr';
    if (this.state.modified) {
      className = ' modified';
    }
    if (this.state.editing) {
      return <input value={this.state.value} onChange={this.updateValue} onBlur={this.setValue} ref="input" onKeyDown={this.handleKeyDown} />
    } else {
      return <span onClick={this.setEditMode} className={className}>{this.props.value}</span>;
    }

  },
  toggleEditing: function () {
    this.setState({
      editing: !this.state.editing
    })
  },

  setEditMode: function () {
    this.setState({editing: true})
  }
})

module.exports = StringAttribute;
