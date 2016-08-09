var React = require("react"),
    connect = require('react-redux').connect;

var Terminal = React.createClass({
  render() {
    return (
      <div id="terminal-bar">
        <input
          className='form-input input-lg'
          type='text'
          placeholder='Type here'
          onChange={this.props.terminalType} />
      </div>
    )
  } // close render
});

const mapStateToProps = (state) => {
  return {}
}

const mapDispatchToProps = (dispatch) => {
  return {
    terminalType: (event) => {
      dispatch({
        type: "TERMINAL_TYPE",
        content: event.target.value
      });
    }
  }
}

Terminal = connect(mapStateToProps, mapDispatchToProps)(Terminal);

module.exports = Terminal;
