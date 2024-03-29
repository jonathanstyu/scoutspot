// React + components
var React = require("react"),
    Menu = require("./menu"),
    PanelCard = require("./panel_card"),
    ElementTable = require("./element_table"),
    Terminal = require('./terminal'),
    connect = require('react-redux').connect,
    QueryModal = require('./query_modal');

// Engine elements
var Engine = require('../../models/engine'),
    DataManager = require('../../models/data_manager');

var QueryApp = React.createClass({
  componentDidMount: function () {
    var queryStringObject = this.props.location.query;
    if (!_.isEmpty(queryStringObject)) {
      this.props.openQueryString(queryStringObject);
    }
  },

  render() {
    return (
      <div>
        <div className='columns'>
          <div className='column col-md-4'>
            <Menu />
          </div>
          <div className='column col-md-8'>
            <PanelCard />
            <ElementTable />
            <QueryModal />
          </div>
        </div>
        <Terminal />
      </div>
    ); // closes return
  } // closes render function
}); // closes React class

const mapStateToProps = (state) => {
  return {}
}

const mapDispatchToProps = (dispatch) => {
  return {
    openQueryString: (string) => {
      dispatch({
        type: "OPEN_QUERY_STRING",
        queryObject: string
      });
    }
  }
}

QueryApp = connect(mapStateToProps, mapDispatchToProps)(QueryApp);

module.exports = QueryApp;
