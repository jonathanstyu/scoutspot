var React = require('react'),
    $ = require('jquery'),
    _ = require('underscore');

var SqlDetailTable = require('./sql_detail_table'),
    SqlDetailPanel = require('./sql_detail_panel');

var SqlDefinitions = React.createClass({
  getInitialState: function () {

    return {
      definitions: this.props.route.definitions,
      tabTitles: ["Tables", "Joins", "Custom Elements"],
      detailMenuViewItems: [],
      tabFocus: "",
      detailFocusItem: ""
    }
  },

  selectTab: function (event) {
    this.setState({
      tabFocus: event.target.id,
      detailFocusItem: ""
    })
  },

  selectDetailItem: function (passedItem) {
    this.setState({
      detailFocusItem: passedItem
    })
  },

  render: function () {
    var that = this;

    var tabContent = (
      <ul className='tab tab-block'>
        {
          this.state.tabTitles.map(function (viewItem) {
            return (
              <li key={viewItem} onClick={that.selectTab} className={ viewItem == that.state.focusItem ? "selected tab-item" : "tab-item" } >
                  <a href="#" id={viewItem}>{viewItem}</a>
              </li>
            )
          })
        }
      </ul>
    )

    return (
      <div>
        <div className='columns'>
          <div className='column col-md-4'>
            <SqlDetailTable selectDetailItemCallback={this.selectDetailItem}
              definitions={this.state.definitions}
              tabFocus={this.state.tabFocus}
              />
          </div>
          <div className='column col-md-8'>
            {tabContent}
            <SqlDetailPanel detailFocusItem={this.state.detailFocusItem}/>
          </div>
        </div>
      </div>
    )
  }
})

module.exports = SqlDefinitions;
