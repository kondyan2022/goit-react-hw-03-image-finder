import { Component } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import { ModalForm, ModalOverlay } from './modal.styled';
import { disablePageScroll, enablePageScroll } from 'scroll-lock';

const modalRoot = document.querySelector('#modal-root');

export default class Modal extends Component {
  componentDidMount() {
    this.props.setLoader(1);
    document.addEventListener('keydown', this.handleKeyDown);
    disablePageScroll();
  }
  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyDown);
    enablePageScroll();
  }

  handleKeyDown = evt => {
    if (evt.code === 'Escape') {
      this.props.closeModal();
    }
  };

  handleBackdropClick = evt => {
    if (evt.target === evt.currentTarget) {
      this.props.closeModal();
    }
  };

  render() {
    const { largeImageURL, tags, setLoader } = this.props;
    return createPortal(
      <ModalOverlay onClick={this.handleBackdropClick}>
        <ModalForm>
          <img
            src={largeImageURL}
            alt={tags}
            onLoad={() => {
              setLoader(-1);
            }}
          />
        </ModalForm>
      </ModalOverlay>,
      modalRoot
    );
  }
}
Modal.propTypes = {
  largeImageURL: PropTypes.string.isRequired,
  tags: PropTypes.string,
  setLoader: PropTypes.func,
  closeModal: PropTypes.func,
};
