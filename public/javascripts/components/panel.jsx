var React = require("react"),
    PanelCard = require('./panel_card'),
    ElementTable = require('./panel_table');

var Panel = React.createClass({

  render: function () {
    return (
      <div>
        <PanelCard />
        <ElementTable />
      </div>
    )
  }
});

module.exports = Panel;
