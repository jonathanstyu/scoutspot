var React = require("react"),
    connect = require('react-redux').connect,
    Modal = require('react-modal');

const customStyles = {
  content: {
    padding: '5rem'
  },
  overlay: {
    padding: '5rem'
  }
};

var QueryModal = React.createClass({
  render: function () {
    var content;
    switch (this.props.contentType) {
      case "Announcement":
        content = (
          <h3>{this.props.content}</h3>
        )
        break;
      case "InputBar":
        content = (
          <div>
            <p>Share this query with this Link</p>
            <input value={this.props.content}
              className='form-input input-lg'
              type='text' />
          </div>
        )
        break;
      default:

    }


    return (
      <div>
        <Modal isOpen={this.props.open} onRequestClose={this.props.closeModal} style={customStyles}>
          <button className='btn' onClick={this.props.closeModal}>Close</button>
          <hr/>
          <div>
            {content}
          </div>
        </Modal>
      </div>
    )
  }
})

const mapStateToProps = (state) => {
  var state = state.buildApp
  return {
    open: state.openModal,
    content: state.modalContent || "Hello",
    contentType: state.modalContentType
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    closeModal: () => {dispatch({type: "CLOSE_MODAL"})}
  }
}

QueryModal = connect(mapStateToProps, mapDispatchToProps)(QueryModal);

module.exports = QueryModal;
