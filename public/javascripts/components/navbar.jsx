// React + components
var React = require('react'),
    connect = require('react-redux').connect,
    Link = require('react-router').Link,
    FirebaseManager = require('../models/firebase_manager')

var NavBar = React.createClass({
  login() {
    FirebaseManager.googleLogin();
    this.props.login
  },

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
            <Link to='/edit' className='btn btn-link'>Definitions/User</Link>
            <a className='btn' onClick={this.login}>{
                this.props.loggedIn ? "Sign Out" : "Sign In"
              }</a>
          </section>
        </header>
        <div>
          {this.props.children}
        </div>
      </div>
    )
  }
});

const mapStateToProps = function (state) {
  return ({
    loggedIn: state.homeApp.loggedIn,
    requesting: state.homeApp.requesting
  })
}

const mapDispatchToProps = function (dispatch) {
  return ({
    login: () => {
      dispatch({
        type: "START_LOG_IN"
      })
    }
  })
}

NavBar = connect(mapStateToProps, mapDispatchToProps)(NavBar);
module.exports = NavBar;
