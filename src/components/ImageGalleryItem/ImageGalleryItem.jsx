import { GalleryImg } from './ImageGalleryItem.styled';

const ImageGalleryItem = ({ webformatURL, tags, largeImageURL }) => {
  return (
    <li>
      <GalleryImg src={webformatURL} alt={tags} width={200} />
    </li>
  );
};
export default ImageGalleryItem;
