import { GalleryImg } from './ImageGalleryItem.styled';
import PropTypes from 'prop-types';

const ImageGalleryItem = ({
  description,
  smallImage,
  largeImage,
  openModal,
}) => {
  return (
    <li>
      <GalleryImg
        src={smallImage}
        alt={description}
        onClick={openModal}
        data-large={largeImage}
      />
    </li>
  );
};

ImageGalleryItem.prototype = {
  description: PropTypes.string.isRequired,
  smallImage: PropTypes.string.isRequired,
  largeImage: PropTypes.string.isRequired,
  openModal: PropTypes.func.isRequired,
};

export default ImageGalleryItem;
