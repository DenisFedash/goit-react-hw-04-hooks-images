import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import { ModalCard, Overlay } from './Modal.styled';

const modalRoot = document.querySelector('#modal-root');

function Modal({ onClose, currentImageUrl, currentImageDescription }) {
  useEffect(() => {
    const handleKeyDown = e => {
      if (e.code === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  const handleClickBackdrop = e => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return createPortal(
    <Overlay onClick={handleClickBackdrop}>
      <ModalCard>
        <img src={currentImageUrl} alt={currentImageDescription} />
      </ModalCard>
    </Overlay>,
    modalRoot
  );
}

Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
  currentImageUrl: PropTypes.string.isRequired,
  currentImageDescription: PropTypes.string.isRequired,
};

export default Modal;
