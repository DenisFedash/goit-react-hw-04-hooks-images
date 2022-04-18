import { Component } from 'react';
import { Searchbar } from './Searchbar/Searchbar';
import fetchImages from '../services/api';
import { ImageGallery } from './ImageGallery/ImageGallery';

export class App extends Component {
  state = {
    search: '',
    images: [],
    pages: 1,
    loading: false,
  };

  onChangeSearch = query => {
    this.setState({
      images: [],
      currentPage: 1,
      search: query,
      error: null,
    });
  };

  getImages = async () => {
    const { pages, search } = this.state;

    this.setState({
      isLoading: true,
    });

    try {
      const { hits } = await fetchImages(search, pages);

      this.setState(prevState => ({
        images: [...prevState.images, ...hits],
        currentPage: prevState.currentPage + 1,
      }));
    } catch (error) {
      console.log('Smth wrong with App fetch', error);
      this.setState({ error });
    } finally {
      this.setState({
        isLoading: false,
      });
    }
  };

  componentDidUpdate(prevProps, prevState) {
    const prevSearch = prevState.search;
    const nextSearch = this.state.search;
    if (prevSearch !== nextSearch) {
      this.getImages();
    }
  }

  render() {
    const { images } = this.state;
    return (
      <>
        <Searchbar onSubmit={this.onChangeSearch} />
        <ImageGallery images={images} />
        {this.state.loading && <div>Loading...</div>}
      </>
    );
  }
}
