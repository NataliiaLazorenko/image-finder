import React from 'react';
import './Modal.css';

const Modal = ({ children }) => (
  <div className="Overlay">
    <div className="Modal">{children} </div>
  </div>
);

export default Modal;
