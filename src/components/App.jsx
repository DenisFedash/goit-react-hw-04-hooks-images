import { Component } from 'react';
import { Searchbar } from './Searchbar/Searchbar';
import fetchImages from '../services/api';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button } from './Button/Button';
import { Loader } from './Loader/Loader';
import { Modal } from './Modal/Modal';

export class App extends Component {
  state = {
    search: '',
    images: [],
    pages: 1,
    isLoading: false,
    error: null,
    largeImg: null,
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
      })
      .finally(() => {
        this.setState({ isLoading: false });
      });
  };

  onClickLoadMore = () => {
    this.getImages();
  };

  componentDidUpdate(prevProps, prevState) {
    const prevSearch = prevState.search;
    const nextSearch = this.state.search;
    if (prevSearch !== nextSearch) {
      this.getImages();
    }

    if (
      prevState.images.length < this.state.images.length &&
      prevState.images.length !== 0
    ) {
      window.scrollTo({
        top: document.documentElement.scrollHeight,
        behavior: 'smooth',
      });
    }
  }

  closeModal = () => {
    this.setState({ largeImg: null });
  };

  setLargeImg = url => {
    this.setState({ largeImg: url });
  };

  render() {
    const { images, isLoading, largeImg } = this.state;

    return (
      <>
        <Searchbar onSubmit={this.onChangeSearch} />
        {images.length > 0 && (
          <ImageGallery setLargeImg={this.setLargeImg} images={images} />
        )}
        {isLoading && <Loader />}
        {images.length > 0 && !isLoading && (
          <Button onClick={this.onClickLoadMore} />
        )}
        {largeImg && <Modal onClose={this.closeModal} url={largeImg} />}
      </>
    );
  }
}
