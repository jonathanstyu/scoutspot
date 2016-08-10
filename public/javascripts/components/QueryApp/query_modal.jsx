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
      case 'Schema':
        zipped_columns = this.props.content
        content = (
          <div>
            <h3>Schema for Table</h3>
            <table className='table'>
              <tbody>
                <tr>
                  <th>Column</th>
                  <th>Data Type</th>
                </tr>
                {zipped_columns.map(function (column, index) {
                  return (
                    <tr key={index}>
                      <td>{column[0]}</td>
                      <td>{column[1]}</td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
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
    content: state.modalContent ? state.modalContent : "Hello",
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
