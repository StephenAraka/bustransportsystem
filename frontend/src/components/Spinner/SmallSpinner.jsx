import React from 'react'

const SmallSpinner = () => {
  return (
    <div className="SmallSpinnerContainer">
      <svg className="SmallSpinner" viewBox="0 0 50 50">
        <circle className="path" cx="25" cy="25" r="20" fill="none" strokeWidth="5"></circle>
      </svg>
    </div>
  )
}

export default SmallSpinner;
