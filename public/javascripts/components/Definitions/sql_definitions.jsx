var React = require('react'),
    _ = require('underscore'),
    connect = require('react-redux').connect;

var SqlDetailMenu = require('./sql_detail_menu'),
    SqlDetailPanel = require('./sql_detail_panel');

var SqlDefinitions = React.createClass({
  getInitialState: function () {
    return {
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
          ["Tables", "Joins", "Custom Elements"].map(function (viewItem) {
            return (
              <li key={viewItem} onClick={that.selectTab} className={ viewItem == that.state.focusItem ? "selected tab-item" : "tab-item" } >
                  <a id={viewItem}>{viewItem}</a>
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
            <SqlDetailMenu selectDetailItemCallback={this.selectDetailItem}
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

const mapStateToProps = (state) => {
  return {
    definitions: state.buildApp.definitions
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
  }
}

SqlDefinitions = connect(mapStateToProps, mapDispatchToProps)(SqlDefinitions);

module.exports = SqlDefinitions;
