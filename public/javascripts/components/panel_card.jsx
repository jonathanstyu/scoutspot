var React = require("react");

var PanelCard = React.createClass({
  copyQuery: function () {
    console.log("Copying query " + "\n" + this.props.renderedQuery);
  },

  saveQuery: function () {
    console.log("Save query!")
  },

  render: function () {
    return (
      <div>
        <div className='card'>
          <div className='card-body' id='sql-content'>
            <p>{this.props.renderedQuery}</p>
          </div>
          <div className='card-footer'>
            <div className='btn-group btn-group-block'>
              <button className='btn' onClick={this.copyQuery}>Copy</button>
              <button className='btn' onClick={this.saveQuery}>Save</button>
            </div>
          </div>
        </div>
      </div>
    )
  }
});

module.exports = PanelCard;
