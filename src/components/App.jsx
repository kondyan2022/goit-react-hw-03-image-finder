import { Component } from 'react';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Modal from './Modal/modal';
import AppWrapper from './App.styled';
import Loader from './Loader/Loader';

export class App extends Component {
  state = {
    query: '',
    needClear: false,
    modal: null,
    loadingCount: 0,
    loadingSet: new Set(),
  };

  componentDidUpdate() {
    if (this.state.needClear) {
      this.setState({ needClear: false });
    }
  }
  handleSubmit = values => {
    if (this.state.query !== values.query) {
      this.setState({ ...values, needClear: true });
    }
  };

  handleImageClick = values => {
    this.setState({
      modal: { largeImageURL: values.largeImageURL, tags: values.tag },
    });
  };

  handleCloseModal = () => {
    this.setState({ modal: null });
  };

  setLoader = flag => {
    this.setState(prevState => ({
      loadingCount: flag
        ? prevState.loadingCount + 1
        : prevState.loadingCount - 1,
    }));
  };

  render() {
    console.log('render App');
    return (
      <AppWrapper>
        <Searchbar onSubmit={this.handleSubmit} />

        {this.state.query && !this.state.needClear && (
          <ImageGallery
            query={this.state.query}
            imageClick={this.handleImageClick}
            setLoader={this.setLoader}
          />
        )}
        {this.state.modal && (
          <Modal
            closeModal={this.handleCloseModal}
            setLoader={this.setLoader}
            largeImageURL={this.state.modal.largeImageURL}
            tags={this.state.modal.tags}
          />
        )}
        {this.state.loadingCount > 0 && <Loader />}
      </AppWrapper>
    );
  }
}
