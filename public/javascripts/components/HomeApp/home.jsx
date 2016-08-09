var React = require('react'),
    connect = require('react-redux').connect;

var Home = React.createClass({
  render: function () {
    return (
      <div>
        <header className='hero section bg-grey'>
          <h2 className='text-center'>ScoutSpot</h2>
          <section>
            <p><strong>ScoutSpot</strong> helps people write, save, and manage their SQL queries</p>
            <ul>
              <li>Customizeable - an easy way to make and manage queries</li>
              <li>Convenient - share a query with ease</li>
              <li>Powerful - use the Terminal to quickly create a new query</li>
            </ul>
          </section>
        </header>
        <header className='text-center'>
          <h5>A Query Builder for Analysts</h5>
        </header>
        <header className='text-center'>
          <h5>Customizeable</h5>
        </header>
        <header className='text-center'>
          <h5>The Terminal</h5>
        </header>
        <footer className='bg-grey'><section><p>Built with love by Jonathan Yu</p></section></footer>
      </div>
    )
  }
})

const mapStateToProps = (state) => {
  return {

  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch: dispatch
  }
}

Home = connect(mapStateToProps, mapDispatchToProps)(Home);
module.exports = Home;
