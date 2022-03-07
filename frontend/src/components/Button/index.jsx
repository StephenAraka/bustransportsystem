import React from 'react';
import PropTypes from 'prop-types';
import './Button.css';

const Button = ({ onClick, label, className }) => (
  <div
    className={`Button ${className}`}
    onClick={onClick}
    role="presentation"
  >
    {label}
  </div>
);

Button.propTypes = {

};

export default Button;
