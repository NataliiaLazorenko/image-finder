import React from 'react';
import ImageGalleryItem from '../ImageGalleryItem';
import './ImageGallery.css';

const ImageGalery = ({ images, onClick }) => (
  <ul className="ImageGallery" onClick={onClick}>
    {images.map(({ id, webformatURL, tags, largeImageURL }) => (
      <ImageGalleryItem
        key={id}
        webformatURL={webformatURL}
        tags={tags}
        largeImageURL={largeImageURL}
      />
    ))}
  </ul>
);

export default ImageGalery;
