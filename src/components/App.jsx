import { Component } from 'react';
import { Searchbar } from './Searchbar/Searchbar';
import fetchImages from '../services/api';
import { ImageGallery } from './ImageGallery/ImageGallery';
import Button from './Button/Button';
import { Loader } from './Loader/Loader';
import Modal from './Modal/Modal';

export class App extends Component {
  state = {
    query: '',
    page: 1,
    imagesOnPage: 0,
    totalImages: 0,
    isLoading: false,
    showModal: false,
    images: null,
    error: null,
    currentImageUrl: null,
    currentImageDescription: null,
  };

  onChangeSearch = query => {
    this.setState({
      images: [],
      currentPage: 1,
      search: query,
    });
  };

  getImages = () => {
    const { pages, search } = this.state;

    this.setState({
      isLoading: true,
    });

    fetchImages(search, pages)
      .then(images => {
        this.setState(prevState => ({
          images: [...prevState.images, ...images.hits],
          pages: prevState.pages + 1,
        }));
      })
      .catch(error => {
        this.setState({ error });
      });
  };

  componentDidUpdate(prevProps, prevState) {
    const { query, page } = this.state;

    if (prevState.query !== query) {
      this.setState(({ isLoading }) => ({ isLoading: !isLoading }));

      fetchImages(query)
        .then(({ hits, totalHits }) => {
          const imagesArray = hits.map(
            ({ id, tags, webformatURL, largeImageURL }) => ({
              id: id,
              description: tags,
              smallImage: webformatURL,
              largeImage: largeImageURL,
            })
          );

          return this.setState({
            page: 1,
            images: imagesArray,
            imagesOnPage: imagesArray.length,
            totalImages: totalHits,
          });
        })
        .catch(error => this.setState({ error }))
        .finally(() =>
          this.setState(({ isLoading }) => ({ isLoading: !isLoading }))
        );
    }
    if (prevState.page !== page && page !== 1) {
      this.setState(({ isLoading }) => ({ isLoading: !isLoading }));

      fetchImages(query, page)
        .then(({ hits }) => {
          const imagesArray = hits.map(hit => ({
            id: hit.id,
            description: hit.tags,
            smallImage: hit.webformatURL,
            largeImage: hit.largeImageURL,
          }));

          return this.setState(({ images, imagesOnPage }) => {
            return {
              images: [...images, ...imagesArray],
              imagesOnPage: imagesOnPage + imagesArray.length,
            };
          });
        })
        .catch(error => this.setState({ error }))
        .finally(() =>
          this.setState(({ isLoading }) => ({ isLoading: !isLoading }))
        );
    }
  }

  getSearchRequest = query => {
    this.setState({ query });
    if (this.state.query === 0) {
      alert('fuck');
      return;
    }
  };

  onNextFetch = () => {
    this.setState(({ page }) => ({ page: page + 1 }));
  };

  toggleModal = () => {
    this.setState(({ showModal }) => ({ showModal: !showModal }));
  };

  openModal = e => {
    const currentImageUrl = e.target.dataset.large;
    const currentImageDescription = e.target.alt;

    if (e.target.nodeName === 'IMG') {
      this.setState(({ showModal }) => ({
        showModal: !showModal,
        currentImageUrl: currentImageUrl,
        currentImageDescription: currentImageDescription,
      }));
    }
  };

  render() {
    const {
      images,
      imagesOnPage,
      totalImages,
      isLoading,
      showModal,
      currentImageUrl,
      currentImageDescription,
    } = this.state;

    return (
      <>
        <Searchbar onSubmit={this.getSearchRequest} />
        {images && <ImageGallery openModal={this.openModal} images={images} />}
        {isLoading && <Loader />}
        {imagesOnPage >= 12 && imagesOnPage < totalImages && (
          <Button onNextFetch={this.onNextFetch} />
        )}
        {showModal && (
          <Modal
            onClose={this.toggleModal}
            currentImageUrl={currentImageUrl}
            currentImageDescription={currentImageDescription}
          />
        )}
      </>
    );
  }
}
