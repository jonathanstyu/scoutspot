// React + components
var React = require('react'),
    connect = require('react-redux').connect,
    Link = require('react-router').Link,
    Firebase = require('firebase'),
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
            <Link to='/' className='navbar-brand'>ScoutSpot || <small className='label'>Defined Query Builder</small></Link>
          </section>
          <section className='navbar-section'>
            <Link to='/about' className='btn btn-link'>About</Link>
            <Link to='/build' className='btn btn-link'>Build</Link>
            <Link to='/saved' className='btn btn-link'>Saved</Link>
            <Link to='/edit' className='btn btn-link'>Definitions/User</Link>
            <a className='btn' onClick={this.login}>{
                Firebase.auth().currentUser ? "Sign Out" : "Sign In"
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
