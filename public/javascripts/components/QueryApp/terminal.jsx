var React = require("react"),
    connect = require('react-redux').connect;

var Terminal = React.createClass({
  render() {
    return (
      <div id="terminal-bar">
        <input className='form-input input-lg' type='text' placeholder='Type here' />
      </div>
    )
  } // close render
});

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

Terminal = connect(mapStateToProps, mapDispatchToProps)(Terminal);

module.exports = Terminal;
