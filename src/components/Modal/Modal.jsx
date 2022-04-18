import { Component } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';

export class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.handleCloseModal);
    document.removeEventListener('click', this.handleCloseModal);
  }

  componentWillUnmount() {
    window.addEventListener('keydown', this.handleCloseModal);
    document.removeEventListener('click', this.handleCloseModal);
  }

  handleCloseModal = e => {
    if (e.code === 'Escape' || e.target.className === 'Overlay') {
      this.props.onClose();
    }
  };

  render() {
    return createPortal(
      <div>
        <div>
          <img src={this.props.url} alt="" />
        </div>
      </div>,
      document.querySelector('#modal')
    );
  }
}
Modal.propTypes = { onModalClouse: PropTypes.func };
