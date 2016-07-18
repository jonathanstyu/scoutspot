var React = require("react"),
    PanelCard = require('./panel_card'),
    ElementTable = require('./element_table');

var Panel = React.createClass({

  render: function () {
    return (
      <div>
        <PanelCard resetCallback={this.props.resetCallback} />
      </div>
    )
  }
});

module.exports = Panel;
