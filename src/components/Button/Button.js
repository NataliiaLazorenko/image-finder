import React from 'react';
import './Button.scss';

const Button = ({ handleButton }) => (
  <button type="button" onClick={handleButton} className="Button">
    Load more
  </button>
);

export default Button;
