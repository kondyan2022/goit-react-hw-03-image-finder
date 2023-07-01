import { Component } from 'react';
import PropTypes from 'prop-types';
import { GalleryItem, GalleryItemImage } from './ImageGalleryItems.styled';

class ImageGalleryItem extends Component {
  componentDidMount() {
    this.props.setLoader(1);
  }
  handleClick = evt => {
    this.props.imageClick({
      largeImageURL: this.props.largeImageURL,
      tags: this.props.tags,
    });
  };

  render() {
    const { webformatURL, tags } = this.props;
    return (
      <GalleryItem>
        <GalleryItemImage
          src={webformatURL}
          alt={tags}
          onClick={this.handleClick}
          onLoad={() => {
            this.props.setLoader(-1);
          }}
          onError={() => {
            this.props.setLoader(-1);
          }}
        />
      </GalleryItem>
    );
  }
}
export default ImageGalleryItem;
ImageGalleryItem.propTypes = {
  id: PropTypes.number,
  largeImageURL: PropTypes.string,
  webformatURL: PropTypes.string,
  tags: PropTypes.string,
  imageClick: PropTypes.func,
  setLoader: PropTypes.func,
};
