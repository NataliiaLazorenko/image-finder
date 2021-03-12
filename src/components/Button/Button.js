import React from 'react';
import PropTypes from 'prop-types';
import './Button.css';

const Button = ({ onClick }) => (
  <button type="button" onClick={onClick} className="Button">
    Load more
  </button>
);

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default Button;
