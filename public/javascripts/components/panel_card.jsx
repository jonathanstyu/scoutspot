var React = require("react");

var PanelCard = React.createClass({
  copyQuery: function () {
    console.log("Copying query " + "\n" + this.props.renderedQuery);
  },

  saveQuery: function () {
    this.props.saveCallback(); 
  },

  resetQuery: function () {
    this.props.resetCallback();
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
              <button className='btn' onClick={this.resetQuery}>Reset</button>
            </div>
          </div>
        </div>
      </div>
    )
  }
});

module.exports = PanelCard;
