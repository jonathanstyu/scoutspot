var React = require('react'),
    _ = require('underscore'),
    connect = require('react-redux').connect;

var SqlDetailMenu = require('./sql_detail_menu'),
    SQLDefinitionsEditor = require('./sql_def_editor');

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

    return (
      <div>
        <div className='columns'>
          <div className='column col-md-3'>
            CONTNET GOES HERE
          </div>
          <div className='column col-md-9'>
            <SQLDefinitionsEditor />
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
