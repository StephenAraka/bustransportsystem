import React from 'react';
import './Spinner.css';

const Spinner = () => {
  return (
    <div className="SpinnerContainer">
      <div className="Spinner"></div>
      <div>Fetching Tasks...</div>
    </div>
  )
}

export default Spinner;
