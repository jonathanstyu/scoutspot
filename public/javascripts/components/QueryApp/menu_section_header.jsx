var React = require("react");

var MenuSectionHeader = React.createClass({
  render: function () {
    var that = this;
    var sectionHeader = this.props.sectionHeader;
    return (
      <tr><th colSpan='3'>{ sectionHeader }</th></tr>
    )
  }
});

module.exports = MenuSectionHeader;
