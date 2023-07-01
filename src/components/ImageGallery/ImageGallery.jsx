import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';
import { Component } from 'react';
import PropTypes from 'prop-types';
import fetchImages from 'components/utils/pixabay-api';
import Button from 'components/Button/Button';
import Gallery from './ImageGallery.styled';
import Message from 'components/Message/Message';

class ImageGallery extends Component {
  state = {
    page: 0,
    totalHits: 1,
    per_page: 12,
    showMore: false,
    galleryItems: [],
  };

  componentDidMount() {
    this.setState({ page: 1 });
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      this.state.page > prevState.page ||
      this.props.query !== prevProps.query
    ) {
      const newPage =
        this.props.query === prevProps.query ? this.state.page : 1;
      const prevGallery = newPage === 1 ? [] : prevState.galleryItems;

      this.props.setLoader(1);
      fetchImages(this.props.query, newPage)
        .then(response => {
          this.setState({
            galleryItems: [
              ...prevGallery,
              ...response.data.hits.map(
                ({ id, webformatURL, largeImageURL, tags }) => {
                  this.props.setLoader(1);
                  return {
                    id,
                    webformatURL,
                    largeImageURL,
                    tags,
                  };
                }
              ),
            ],
            showMore: response.data.totalHits > this.state.per_page * newPage,
            totalHits: response.data.totalHits,
            page: newPage,
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
          <Message>{`No matches for "${this.props.query}". Try again.`}</Message>
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
