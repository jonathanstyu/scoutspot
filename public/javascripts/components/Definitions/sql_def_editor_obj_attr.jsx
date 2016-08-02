var React = require('react'),
    _ = require('underscore'),
    Freezer = require('freezer-js'),
    connect = require('react-redux').connect;

var ObjectAttribute = React.createClass({
  getInitialState: function () {
    return ({
      editing: false
    })
  },
  render: function () {
    var StringAttribute = require('./sql_def_editor_str_attr'),
        ArrayAttribute = require('./sql_def_editor_arr_attr');
    var keys = Object.keys(this.props.value),
        className = this.state.editing ? 'open objectAttr compoundAttr' : 'objectAttr compoundAttr';
    var typeAttribute;

    var that = this;
    var attrs = _.pairs(that.props.value).map(function (attrPair) {
      var newAttrkey = typeof attrPair[0] != 'undefined' ? attrPair[0] : "";
      switch (typeof attrPair[1]) {
        case 'string':
          typeAttribute = <StringAttribute value={attrPair[1]} key={attrPair[0]} />
          break;
        case 'boolean':
          typeAttribute = <StringAttribute value={attrPair[1].toString()} key={attrPair[0]} />
          break;
        case 'number':
          typeAttribute = <StringAttribute value={attrPair[1].toString()} key={attrPair[0]} />
          break;
        case 'object':
          if (_.isArray(attrPair[1])) {
            typeAttribute = <ArrayAttribute value={attrPair[1]} key={attrPair[0]} />
          } else {
            typeAttribute = <ObjectAttribute value={attrPair[1]} key={attrPair[0]} />
          }
          break;
        default:
          typeAttribute = <StringAttribute key={attrPair[0]}/>
      }

      return (
        <div className={className} key={attrPair[0]+'-div'}>
          <a className="attrRemove" >[X]</a>
          <span className="attrName">{attrPair[0]}:  </span>
          <span className="attrValue">{typeAttribute}</span>
        </div>
      )
    });

    return (
      <span className={className}>
        <span onClick={this.toggleEditing} className="hashToggle">Map: [{keys.length}]</span>
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

module.exports = ObjectAttribute;
