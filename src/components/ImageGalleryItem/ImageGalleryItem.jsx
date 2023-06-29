import { Component } from 'react';
import { GalleryItem, GalleryItemImage } from './ImageGalleryItems.styled';

class ImageGalleryItem extends Component {
  componentDidMount() {
    this.props.setLoader(true);
  }
  handleClick = evt => {
    console.log('click Image');
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
            this.props.setLoader(false);
          }}
        />
      </GalleryItem>
    );
  }
}
export default ImageGalleryItem;
