// React + components
var React = require('react'),
    ReactDOM = require('react-dom'),
    Router = require('react-router').Router,
    Route = require('react-router').Route,
    IndexRoute = require('react-router').IndexRoute,
    Link = require('react-router').Link,
    hashHistory = require('react-router').hashHistory;

// Other components
var QueryApp = require('./query_app');

var Wrapper = React.createClass({
  render: function () {
    return (
      <div>
        <header className='navbar'>
          <section className='navbar-section'>
            <a href='/' className='navbar-brand'>ScoutSpot</a>
          </section>
          <section className='navbar-section'>
            <Link to='/query' className='btn btn-link'>Query</Link>
            <Link to='/definitions' className='btn btn-link'>Definitions</Link>
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
