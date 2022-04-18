import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';
import PropTypes from 'prop-types';

export const ImageGallery = ({ images }) => {
  return (
    <ul>
      {images.map(({ id, tags, largeImageURL, webformatURL }) => {
        return (
          <ImageGalleryItem
            key={id}
            tags={tags}
            largeImageURL={largeImageURL}
            webformatURL={webformatURL}
          />
        );
      })}
    </ul>
  );
};

ImageGallery.propTypes = {
  images: PropTypes.array.isRequired,
};
