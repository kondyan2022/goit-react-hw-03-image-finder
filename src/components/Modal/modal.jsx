import { Component } from 'react';
import { createPortal } from 'react-dom';
import { ModalForm, ModalOverlay } from './modal.styled';

const modalRoot = document.querySelector('#modal-root');

export default class Modal extends Component {
  componentDidMount() {
    this.props.setLoader(true);
    document.addEventListener('keydown', this.handleKeyDown);
  }
  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyDown);
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
    return createPortal(
      <ModalOverlay className="overlay" onClick={this.handleBackdropClick}>
        <ModalForm className="modal">
          <img
            src={this.props.largeImageURL}
            alt={this.props.tags}
            onLoad={() => {
              this.props.setLoader(false);
            }}
          />
        </ModalForm>
      </ModalOverlay>,
      modalRoot
    );
  }
}
