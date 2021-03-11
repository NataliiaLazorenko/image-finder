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
      images: [],
    });
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevState.searchQuery !== this.state.searchQuery) {
      this.fetchImages();
    }

    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: 'smooth',
    });
  }

  fetchImages = () => {
    const { searchQuery, currentPage } = this.state;
    const options = { searchQuery, currentPage };

    this.setState({ isLoading: true });

    fetchImages(options)
      .then(images =>
        this.setState(prevState => ({
          images: [...prevState.images, ...images],
          currentPage: prevState.currentPage + 1,
        })),
      )
      .catch(error => this.setState({ error }))
      .finally(() => {
        this.setState({ isLoading: false });
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
    const { images, isLoading, showModal, currentImage } = this.state;
    const shouldRenderLoadMoreBtn = images.length > 0 && !isLoading;

    return (
      <div className="App">
        <Searchbar onSubmit={this.onChangeQuery} />
        <ImageGalery images={images} onClick={this.handleGalleryClick} />
        <div className="spinnerContainer">
          {isLoading && (
            <Loader type="Bars" color="#3f51b5" height={80} width={80} />
          )}
        </div>
        {shouldRenderLoadMoreBtn && <Button handleButton={this.fetchImages} />}
        {showModal && (
          <Modal onClose={this.toggleModal}>
            <img
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
