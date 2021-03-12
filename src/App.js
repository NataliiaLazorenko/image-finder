import React, { Component } from 'react';
import Loader from 'react-loader-spinner';

import Searchbar from './components/Searchbar';
import ImageGalery from './components/ImageGallery';
import Button from './components/Button';
import Modal from './components/Modal';
import fetchImages from './services/images-api';

import './App.css';

class App extends Component {
  state = {
    searchQuery: '',
    currentPage: 1,
    totalPages: 1,
    images: [],

    isLoading: false,
    error: null,

    showModal: false,
    currentImage: { largeImageURL: '', description: '' },
  };

  onChangeQuery = query => {
    this.setState({
      searchQuery: query,
      currentPage: 1,
      totalPages: 1,
      images: [],
    });
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevState.searchQuery !== this.state.searchQuery) {
      this.fetchImages();
    }
  }

  fetchImages = () => {
    const { searchQuery, currentPage } = this.state;
    const options = { searchQuery, currentPage };

    this.setState({ isLoading: true, error: null });

    fetchImages(options)
      .then(({ hits, totalHits }) =>
        hits.length > 0
          ? this.setState(prevState => ({
              images: [...prevState.images, ...hits],
              currentPage: prevState.currentPage + 1,
              totalPages: Math.ceil(totalHits / 12),
            }))
          : this.setState({ error: 'Nothing found, specify your query' }),
      )
      .catch(error =>
        this.setState({
          error,
        }),
      )
      .finally(() => {
        this.setState({ isLoading: false });

        window.scrollTo({
          top: document.documentElement.scrollHeight,
          behavior: 'smooth',
        });
      });
  };

  handleGalleryClick = event => {
    if (event.target.nodeName === 'IMG') {
      const largeImageURL = event.target.dataset.largeimage;
      const description = event.target.alt;

      this.setState({ currentImage: { largeImageURL, description } });
      this.toggleModal();
    }
  };

  toggleModal = () => {
    // this.setState(prevState => ({ showModal: !prevState.showModal }));
    this.setState(({ showModal }) => ({ showModal: !showModal }));
  };

  render() {
    const {
      currentPage,
      totalPages,
      images,
      isLoading,
      error,
      showModal,
      currentImage,
    } = this.state;

    const shouldRenderLoadMoreBtn =
      images.length > 0 && !isLoading && currentPage <= totalPages;

    return (
      <div className="App">
        <Searchbar onSubmit={this.onChangeQuery} />

        {error && <p className="warningMessage">{error}</p>}

        <ImageGalery images={images} onClick={this.handleGalleryClick} />

        {isLoading && (
          <div className="spinnerContainer">
            <Loader type="Bars" color="#3f51b5" height={80} width={80} />
          </div>
        )}

        {shouldRenderLoadMoreBtn && <Button onClick={this.fetchImages} />}

        {showModal && (
          <Modal onClose={this.toggleModal}>
            <img
              className="largeImage"
              src={currentImage.largeImageURL}
              alt={currentImage.description}
            />
          </Modal>
        )}
      </div>
    );
  }
}

export default App;
