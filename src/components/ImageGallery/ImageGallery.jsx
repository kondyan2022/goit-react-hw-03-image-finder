import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';
import { Component } from 'react';

import fetchImages from 'components/utils/pixabay-api';
import Button from 'components/Button/Button';
import Gallery from './ImageGallery.styled';

class ImageGallery extends Component {
  state = {
    page: 1,
    totalHits: 0,
    per_page: 12,
    showMore: false,
    galleryItems: [],
  };

  componentDidMount() {
    this.props.setLoader(true);
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
      .catch(error => console.log(error))
      .finally(this.props.setLoader(false));
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.page > prevState.page) {
      this.props.setLoader(true);
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
        .catch(error => console.log(error))
        .finally(this.props.setLoader(false));
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
        <Gallery className="gallery">
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
        {this.state.showMore && <Button onClick={this.handleButtonClick} />}
      </>
    );
  }
}

export default ImageGallery;
