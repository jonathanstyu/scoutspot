var React = require('react');

var SqlDefinitions = React.createClass({
  getInitialState: function () {
    return {
      definitions: this.props.route.definitions
    }
  },

  render: function () {
    return (
      <div>
        <h1>This is the Sql definitions page</h1>
      </div>
    )
  }
})

module.exports = SqlDefinitions;
