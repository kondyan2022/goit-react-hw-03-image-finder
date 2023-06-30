import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';
import { Component } from 'react';
import PropTypes from 'prop-types';
import fetchImages from 'components/utils/pixabay-api';
import Button from 'components/Button/Button';
import Gallery from './ImageGallery.styled';
import Message from 'components/Message/Message';

class ImageGallery extends Component {
  state = {
    page: 1,
    totalHits: 1,
    per_page: 12,
    showMore: false,
    galleryItems: [],
  };

  componentDidMount() {
    this.props.setError(false);
    this.props.setLoader(1);
    fetchImages(this.props.query, 1)
      .then(response => {
        this.setState({
          page: 1,

          totalHits: response.data.totalHits,
          showMore: response.data.totalHits > this.state.per_page,
          galleryItems: response.data.hits.map(
            ({ id, webformatURL, largeImageURL, tags }) => ({
              id,
              webformatURL,
              largeImageURL,
              tags,
            })
          ),
        });
      })
      .catch(error => {
        this.props.setError(true);
      })
      .finally(this.props.setLoader(-1));
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.page > prevState.page) {
      this.props.setLoader(1);
      fetchImages(this.props.query, this.state.page)
        .then(response => {
          this.setState({
            galleryItems: [
              ...prevState.galleryItems,
              ...response.data.hits.map(
                ({ id, webformatURL, largeImageURL, tags }) => ({
                  id,
                  webformatURL,
                  largeImageURL,
                  tags,
                })
              ),
            ],
          });
        })
        .catch(error => {
          this.props.setError(true);
        })
        .finally(this.props.setLoader(-1));
    }
  }

  handleButtonClick = evt =>
    this.setState(prevState => ({
      page: prevState.page + 1,
      showMore: prevState.totalHits > (prevState.page + 1) * prevState.per_page,
    }));

  render() {
    return (
      <>
        <Gallery>
          {this.state.galleryItems.map(
            ({ id, webformatURL, largeImageURL, tags }) => (
              <ImageGalleryItem
                key={id}
                id={id}
                webformatURL={webformatURL}
                largeImageURL={largeImageURL}
                tags={tags}
                imageClick={this.props.imageClick}
                setLoader={this.props.setLoader}
              />
            )
          )}
        </Gallery>
        {this.state.totalHits === 0 && (
          <Message>`No matches for "{this.state.query}" `</Message>
        )}
        {this.state.showMore && <Button onClick={this.handleButtonClick} />}
      </>
    );
  }
}

export default ImageGallery;
ImageGallery.propTypes = {
  query: PropTypes.string.isRequired,
  imageClick: PropTypes.func,
  setLoader: PropTypes.func,
  setError: PropTypes.func,
};
