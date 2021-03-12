import React from 'react';
import PropTypes from 'prop-types';
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

ImageGalleryItem.propTypes = {
  webformatURL: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
  largeImageURL: PropTypes.string.isRequired,
};

export default ImageGalleryItem;
