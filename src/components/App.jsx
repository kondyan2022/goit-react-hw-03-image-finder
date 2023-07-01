import { Component } from 'react';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Modal from './Modal/modal';
import AppWrapper from './App.styled';
import Loader from './Loader/Loader';
import Message from './Message/Message';

export class App extends Component {
  state = {
    query: null,
    modal: null,
    loadingCount: 0,
    error: false,
  };

  handleSubmit = values => {
    if (this.state.query !== values.query) {
      this.setState({ ...values });
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

  setLoader = delta => {
    this.setState(prevState => ({
      loadingCount: delta === 0 ? 0 : prevState.loadingCount + delta,
    }));
  };

  setError = flag => {
    this.setState({ error: flag });
  };

  render() {
    return (
      <AppWrapper>
        <Searchbar onSubmit={this.handleSubmit} />

        {this.state.query && !this.state.error && (
          <ImageGallery
            query={this.state.query}
            imageClick={this.handleImageClick}
            setLoader={this.setLoader}
            setError={this.setError}
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
        {this.state.query === '' && (
          <Message>Please, input key words for search. </Message>
        )}
        {this.state.error && (
          <Message>Internet connection error. Please, try later! </Message>
        )}
      </AppWrapper>
    );
  }
}
