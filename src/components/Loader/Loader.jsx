import { Component } from 'react';
import { createPortal } from 'react-dom';
import { RotatingLines } from 'react-loader-spinner';
import LoaderOverlay from './Loader.styled';

const modalRoot = document.querySelector('#modal-root');

export default class Loader extends Component {
  render() {
    return createPortal(
      <LoaderOverlay>
        <RotatingLines
          strokeColor="#3f51b5"
          strokeWidth="5"
          animationDuration="1.00"
          width="96"
          visible={true}
        />
      </LoaderOverlay>,
      modalRoot
    );
  }
}
