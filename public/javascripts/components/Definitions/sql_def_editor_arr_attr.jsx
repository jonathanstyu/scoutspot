var React = require('react'),
    _ = require('underscore'),
    Freezer = require('freezer-js'),
    connect = require('react-redux').connect;

var ObjectAttribute = require('./sql_def_editor_obj_attr'),
    StringAttribute = require('./sql_def_editor_str_attr');

var ArrayAttribute = React.createClass({
  getInitialState: function () {
    return ({
      editing: false
    })
  },
  render: function () {
    var ObjectAttribute = require('./sql_def_editor_obj_attr'),
        StringAttribute = require('./sql_def_editor_str_attr');
    var className = this.state.editing ? 'open objectAttr compoundAttr' : 'objectAttr compoundAttr';
      var typeAttribute;

      var that = this;
      var attrs = that.props.value.map(function (attrPair, index) {
        var newAttrkey = typeof attrPair[0] != 'undefined' ? index : "";
        switch (typeof attrPair) {
          case 'string':
            typeAttribute = <StringAttribute value={attrPair} key={index} />
            break;
          case 'object':
            if (_.isArray(attrPair)) {
              typeAttribute = <ArrayAttribute value={attrPair} key={index} />
            } else {
              typeAttribute = <ObjectAttribute value={attrPair} key={index} />
            }
            break;
          default:
            typeAttribute = <StringAttribute key={index}/>
        }

        return (
          <div className={className} key={index+'-div'}>
            <a className="attrRemove" >[X]</a>
            <span className="attrName">{index}:  </span>
            <span className="attrValue">{typeAttribute}</span>
          </div>
        )
      });

      return (
        <span className={className}>
          <span onClick={this.toggleEditing} className="hashToggle">Map: [{this.props.value.length}]</span>
          <div className="attrChildren">
            {attrs}
          </div>
        </span>
      )
  },
  toggleEditing: function () {
    this.setState({
      editing: !this.state.editing
    })
  }
})

module.exports = ArrayAttribute;
