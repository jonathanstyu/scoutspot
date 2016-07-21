var React = require('react');

var SavedTableRow = React.createClass({
  render: function () {
    return (
      <tr>
        <td>{this.props.querySave.table}</td>
        <td><a href={'#/build?' + this.props.querySave.export()} className='btn btn-link'>Go to Build Page</a></td>
      </tr>
    )
  }
})

module.exports = SavedTableRow;
