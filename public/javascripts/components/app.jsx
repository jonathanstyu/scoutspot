var React = require("react"),
    Search = require("./search"),
    Menu = require("./menu");

var App = React.createClass({
  render() {
    var engine = new Engine();
    var jsonDefinitions = require('../resources/test.json')

    engine.load_definitions(jsonDefinitions);
    var tables = engine.definitions['tables'];

    return (
      <div className='columns col-gapless'>
        <div className='column col-md-8'>Thing</div>
        <div className='column col-md-4'><Table items={tables} /></div>
      </div>
    );
  }
});

module.exports = App;
