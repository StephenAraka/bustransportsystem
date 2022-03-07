import React, { useState, useEffect } from 'react';
import { Link, withRouter } from 'react-router-dom';
import axios from 'axios';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import saveUser from '../../redux/actions/saveUser';
import { isValidEmail, isValidUsername, trimmed } from '../../helpers';
import Button from '../Button';
import InputTextField from '../InputText';
import './AddManager.css';
import Navbar from '../Navbar';

const AddManagerPage = (props) => {
  const [user, setUser ] = useState({
    firstName: '',
    lastName: '',
    telephone: '',
    address: ''
  });
  const [error, setError] = useState('');

  const handleChange = ({ target }) => {
    const { name, value } = target;

    if (error) {
      setError('');
    }

    setUser({
      ...user,
      [name]: value
    });
  };

  const handleRegister = () => {
    const { firstName, lastName, telephone, address } = user;

    //* Trim user details
    const userInfo = {
      firstName,
      lastName,
      telephone,
      address,
      profilePicture: null
    }
    
    if (!userInfo.firstName || !userInfo.lastName || !userInfo.address || !userInfo.telephone ) {
      setError('All fields are required');
      return;
    }

    if (!isValidUsername(userInfo.firstName)) {
      setError('Firstname can only contain letters and numbers');
      return;
    }

    if (!isValidUsername(userInfo.lastName)) {
      setError('Lastname can only contain letters and numbers');
      return;
    }
    
    console.log(userInfo)

    axios.post('/api/WeGo/Manager', userInfo)

      .then(res => {
        console.log(res.data);
        
        // props.saveUser(res.data);
        alert('Manager added successfully')
        //! Once they've registered, redirect them to the tutorial page
        window.location.href = "/";
      })
      .catch((err) => {
        setError('Process failed.');
        
        console.log(err);
      });
  };

  useEffect(() => {
    // remove the current state from local storage
    // so that when a person logs in they dont encounter
    // the previous state which wasnt cleared
    localStorage.removeItem('state');
  }, []);

  return (
    <div className="AddManagerPage Page">
      <Navbar />
      <div className="Form">
        <div className="FormTitle">Add manager</div>

        <InputTextField
          required
          type="text"
          name="firstName"
          value={user.firstName}
          placeholder="First Name"
          onChange={handleChange}
        />

        <InputTextField
          required
          type="text"
          name="lastName"
          value={user.lastName}
          placeholder="Last Name"
          onChange={handleChange}
        />

        <InputTextField 
          required
          type="number"
          name="telephone"
          value={user.telephone}
          placeholder="Phone"
          onChange={handleChange}
        />

        <InputTextField 
          required
          type="text"
          name="address"
          value={user.address}
          placeholder="Address"
          onChange={handleChange}
        />

        {error && (
          <div className="Error">
            {error}
          </div>
        )}

        <Button
          label="add manager"
          onClick={handleRegister}
        />
      </div>
    </div>
  )
}

const mapStateToProps = (state) => (
  { user: state.user }
);

const mapDispatchToProps = {
  saveUser
};

AddManagerPage.propTypes = {
  saveUser: PropTypes.func.isRequired
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(AddManagerPage));
