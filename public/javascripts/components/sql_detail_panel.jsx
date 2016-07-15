var React = require('react'),
    $ = require('jquery'),
    _ = require('underscore');

var SqlDetailPanel = React.createClass({
  addButtonClicked: function (event) {
    console.log(event);
  },

  inputEdited: function (event) {
    console.log(event.target.value);
  },

  render: function () {
    var formContent = "";
    var detailFocusItem = this.props.detailFocusItem;
    var that = this;
    if (detailFocusItem['columns']) {
      formContent = detailFocusItem['columns'].map(function (column) {
        return (
          <div className='form-group' key={column}>
            <label className="form-label" htmlFor={"input-" + column}>Column Name</label>
            <input className="form-input" type="text" id={"input-" + column} value={column} onChange={that.inputEdited} />
          </div>
        )
      })
    } else {
      var detailFocusItemPairs = _.pairs(detailFocusItem);

      formContent = detailFocusItemPairs.map(function (focusPair) {
        
        return (
          <div className='form-group' key={focusPair[0]}>
            <label className="form-label" htmlFor={"input-" + focusPair[0]}>{focusPair[0]}</label>
            <input className="form-input" type="text" id={"input-" + focusPair[0]} value={focusPair[1]} onChange={that.inputEdited} />
          </div>
        )
      });
    }

    return (
      <div className='container'>
        <div className='container'>
          <form>
            {formContent}
          </form>
        </div>
      </div>
    )
  }
});

module.exports = SqlDetailPanel;
