import { useState, useEffect } from 'react';
import { Searchbar } from './Searchbar/Searchbar';
import fetchImages from '../services/api';
import { ImageGallery } from './ImageGallery/ImageGallery';
import Button from './Button/Button';
import { Loader } from './Loader/Loader';
import Modal from './Modal/Modal';
import { Message } from './Message/Message';

const getArrayImages = hits => {
  return hits.map(({ id, tags, webformatURL, largeImageURL }) => ({
    id: id,
    description: tags,
    smallImage: webformatURL,
    largeImage: largeImageURL,
  }));
};

export function App() {
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [totalImages, setTotalImages] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [images, setImages] = useState(null);
  const [error, setError] = useState(null);
  const [currentImageUrl, setCurrentImageUrl] = useState(null);
  const [currentImageDescription, setCurrentImageDescription] = useState(null);

  if (error) {
    console.log(error);
  }

  useEffect(() => {
    if (query !== '') {
      setIsLoading(prevIsLoading => !prevIsLoading);
      fetchImages(query, page)
        .then(({ hits, totalHits }) => {
          const imagesArray = getArrayImages(hits);

          setTotalImages(totalHits);

          return imagesArray;
        })

        .then(imagesArray => {
          if (page === 1) {
            setImages(imagesArray);
          }
          return imagesArray;
        })
        .then(imagesArray => {
          if (page !== 1) {
            setImages(prevImages => [...prevImages, ...imagesArray]);
          }
        })
        .catch(error => setError('Something went wrong. Try again.'))
        .finally(() => setIsLoading(false));
    }
  }, [page, query]);

  const onChangeSearch = query => {
    setImages([]);
    setPage(1);
    setQuery(query);
  };

  const onNextFetch = () => {
    setPage(prevPages => prevPages + 1);
  };

  const toggleModal = () => {
    setShowModal(prevShowmodal => !prevShowmodal);
  };

  const openModal = e => {
    const currentImageUrl = e.target.dataset.large;
    const currentImageDescription = e.target.alt;

    if (e.target.nodeName === 'IMG') {
      setShowModal(prevShowmodal => !prevShowmodal);
      setCurrentImageUrl(currentImageUrl);
      setCurrentImageDescription(currentImageDescription);
    }
  };

  return (
    <>
      <Searchbar onSubmit={onChangeSearch} />
      {totalImages < 1 && (
        <Message>
          <h2>The gallery is empty 🙁</h2>
          <p>Use search field!</p>
        </Message>
      )}
      {images && <ImageGallery openModal={openModal} images={images} />}
      {isLoading && <Loader />}
      {images && images.length >= 12 && images.length < totalImages && (
        <Button onNextFetch={onNextFetch} />
      )}
      {showModal && (
        <Modal
          onClose={toggleModal}
          currentImageUrl={currentImageUrl}
          currentImageDescription={currentImageDescription}
        />
      )}
    </>
  );
}
