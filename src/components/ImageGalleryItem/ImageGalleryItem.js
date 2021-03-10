import React from 'react';
import './ImageGalleryItem.css';

const ImageGalleryItem = ({ webformatURL, tags, largeImageURL }) => (
  <li className="ImageGalleryItem">
    <img
      src={webformatURL}
      alt={tags}
      data-largeimage={largeImageURL}
      className="ImageGalleryItem-image"
    />
  </li>
);

export default ImageGalleryItem;
