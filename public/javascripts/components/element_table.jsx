var React = require("react"),
    ElementRow = require('./element_row'); 

var ElementTable = React.createClass({

  render: function () {
    return (
      <table className='table'>
        <tbody>
          <tr><th colSpan='4'>Columns</th></tr>
          <tr><th colSpan='4'>Contents</th></tr>
          <tr><th colSpan='4'>Filters</th></tr>
        </tbody>
      </table>
    )
  }
});

module.exports = ElementTable;
