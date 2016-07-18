// React + components
var React = require('react'),
    ReactDOM = require('react-dom'),
    Router = require('react-router').Router,
    Route = require('react-router').Route,
    IndexRoute = require('react-router').IndexRoute,
    Link = require('react-router').Link,
    hashHistory = require('react-router').hashHistory;

var Wrapper = React.createClass({
  render: function () {
    return (
      <div>
        <header className='navbar'>
          <section className='navbar-section'>
            <a href='/' className='navbar-brand'>ScoutSpot</a>
          </section>
          <section className='navbar-section'>
            <Link to='/build' className='btn btn-link'>Build</Link>
            <Link to='/saved' className='btn btn-link'>Saved</Link>
            <Link to='/edit' className='btn btn-link'>Edit Definitions</Link>
          </section>
        </header>
        <div>
          {this.props.children}
        </div>
      </div>
    )
  }
});

module.exports = Wrapper;
