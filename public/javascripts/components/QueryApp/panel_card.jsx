var React = require("react"),
    connect = require('react-redux').connect;

var saveQuery = require('../../actions/actions').saveQuery,
    store = require('../../store/store_index');

const boxStyles = {
  margin: '2px',
  padding: '10px',
  width: '100%',
  background: '#EDE6E3',
  fontFamily: 'Menlo',
  fontSize: '100%'
}

var PanelCard = React.createClass({
  save: function () {
    store.dispatch(saveQuery(this.props.query))
    this.props.save();
  },

  editTextbox: function (event) {
    this.props.dispatch({type: "editBoxEdit", value: event.target.value})
  },

  render: function () {
    var acceptableQuery = this.props.renderedQuery == 'Empty Query';
    return (
      <div>
        <div className='card'>
          <div className='card-body' id='sql-content'>
            <textarea
              value={this.props.renderedQuery}
              rows="6"
              style={boxStyles}
              onChange={this.props.edit}>
            </textarea>
          </div>
          <div className='card-footer'>
            <div className='btn-group btn-group-block'>
              <button className='btn' onClick={this.props.copy} disabled={acceptableQuery}>Copy</button>
              <button className='btn' onClick={this.save} disabled={acceptableQuery}>Save</button>
              <button className='btn' onClick={this.props.reset} disabled={acceptableQuery}>Reset</button>
              <button className='btn' onClick={this.props.share} disabled={acceptableQuery}>Share</button>
            </div>
          </div>
        </div>
      </div>
    )
  }
});

const mapStateToProps = function (state) {
  var state = state.buildApp;
  return ({
    query: state.engine.query,
    renderedQuery: state.engine.render_query()
  })
}

const mapDispatchToProps = function (dispatch) {
  return ({
    save: () => {
      // for some reason, if try to map this to props and then insert into the React code directly it dispatches prematurely. Had to roll it out into a this.save, which then toggles the store dispatch 
      // store.dispatch(saveQuery(this.props.query))
      dispatch({type: "SAVE_QUERY_BEGIN"})
    },
    copy: () => {
      dispatch({type: "COPY_QUERY_MODAL"})
    },
    edit: (event) => {
      dispatch({type: "EDIT_QUERY_BOX", value: event.target.value})
    },
    reset: () => {
      dispatch({type: "RESET_QUERY"})
    },
    share: () => {
      dispatch({type: "SHARE_QUERY_MODAL"})
    }
  })
}

PanelCard = connect(mapStateToProps, mapDispatchToProps)(PanelCard);

module.exports = PanelCard;
