var React = require("react"),
    PanelCard = require('./panel_card'),
    ElementTable = require('./element_table');

var Panel = React.createClass({

  render: function () {
    return (
      <div>
        <PanelCard />
        
      </div>
    )
  }
});

module.exports = Panel;
