import React from 'react';
import './InputText.css';

const InputTextField = ({ name, value, placeholder, onChange, type, required }) => {
  const handleChange = (e) => {
    onChange(e);
  }

  return (
    <input
      className="InputTextField"
      type={type}
      placeholder={`${placeholder}${required ? ' *' : ''}`}
      onChange={handleChange}
      name={name}
      value={value}
      multiple={type === "file" ? true : false}
    >
      
    </input>
  )
}

export default InputTextField;
