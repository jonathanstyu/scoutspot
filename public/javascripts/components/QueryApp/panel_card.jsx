var React = require("react"),
    connect = require('react-redux').connect;

// var store = require('../../store/store_index');

var PanelCard = React.createClass({

  editTextbox: function (event) {
    this.props.dispatch({type: "editBoxEdit", value: event.target.value})
  },

  render: function () {
    return (
      <div>
        <div className='card'>
          <div className='card-body' id='sql-content'>
            <textarea value={this.props.renderedQuery} rows="3" className='form-input' onChange={this.props.edit} id="queryBox"></textarea>
          </div>
          <div className='card-footer'>
            <div className='btn-group btn-group-block'>
              <button className='btn' onClick={this.props.copy}>Copy</button>
              <button className='btn' onClick={this.props.save}>Save</button>
              <button className='btn' onClick={this.props.reset}>Reset</button>
              <button className='btn' onClick={this.props.share}>Share</button>
            </div>
          </div>
        </div>
      </div>
    )
  }
});

const mapStateToProps = function (state) {
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
      dispatch({type: "COPY_QUERY"})
    },
    edit: (event) => {
      dispatch({type: "EDIT_QUERY_BOX", value: event.target.value})
    },
    reset: () => {
      dispatch({type: "RESET_QUERY"})
    },
    share: () => {
      dispatch({type: "SHARE_QUERY"})
    }
  })
}

PanelCard = connect(mapStateToProps, mapDispatchToProps)(PanelCard);

module.exports = PanelCard;
