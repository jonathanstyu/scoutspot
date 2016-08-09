var React = require("react"),
    connect = require('react-redux').connect;

// var store = require('../../store/store_index');

var PanelCard = React.createClass({

  editTextbox: function (event) {
    this.props.dispatch({type: "editBoxEdit", value: event.target.value})
  },

  render: function () {
    var acceptableQuery = this.props.renderedQuery == 'Empty Query';
    return (
      <div>
        <div className='card'>
          <div className='card-body' id='sql-content'>
            <textarea value={this.props.renderedQuery} rows="3" className='form-input' onChange={this.props.edit} id="queryBox"></textarea>
          </div>
          <div className='card-footer'>
            <div className='btn-group btn-group-block'>
              <button className='btn' onClick={this.props.copy} disabled={acceptableQuery}>Copy</button>
              <button className='btn' onClick={this.props.save} disabled={acceptableQuery}>Save</button>
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
    renderedQuery: state.engine.render_query()
  })
}

const mapDispatchToProps = function (dispatch) {
  return ({
    save: () => {
      dispatch({type: "SAVE_QUERY"})
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
