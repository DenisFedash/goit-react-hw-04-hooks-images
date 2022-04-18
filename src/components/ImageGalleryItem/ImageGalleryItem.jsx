const ImageGalleryItem = ({ webformatURL, tags, largeImageURL }) => {
  return (
    <li>
      <img src={webformatURL} alt={tags} width={200} />
    </li>
  );
};
export default ImageGalleryItem;
