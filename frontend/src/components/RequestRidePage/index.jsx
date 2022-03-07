import React, { useState, useEffect } from 'react';
import DateTimePicker from 'react-datetime-picker';
import { Link, withRouter } from 'react-router-dom';
import axios from 'axios';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import saveUser from '../../redux/actions/saveUser';
import { isValidEmail, isValidUsername, trimmed } from '../../helpers';
import Button from '../Button';
import InputTextField from '../InputText';
import Navbar from '../Navbar';

const RequestRidePage = (props) => {
  const [details, setDetails] = useState({
    departureLocation: '',
    destinationLocation: '',
    numberOfSits: '',
    disabledPeople: '',
  });

  const [error, setError] = useState('');

  const [pickupTime, onDateTimeChange] = useState(new Date());

  const handleChange = ({ target }) => {
    const { name, value } = target;

    if (error) {
      setError('');
    }

    setDetails({
      ...details,
      [name]: value
    });
  };

  const handleRequestRide = () => {
    const {
      departureLocation,
      destinationLocation,
      numberOfSits,
      disabledPeople} = details;

    //* Trim user details

    if (!pickupTime || !departureLocation || !destinationLocation || !numberOfSits || 
      !disabledPeople) {
      setError('All fields are required');
      return;
    }

    const rideDetails = { ...details, pickupTime, passenger: localStorage.getItem('id') };

    console.log(rideDetails)

    axios.post('/api/rides/request', rideDetails)
      .then(res => {
        console.log(res.data);
        
        // props.saveUser(res.data);
        alert('Your ride has been requested')
        window.location.href = "/passenger/my-rides";
      })
      .catch((err) => {
        setError('Process failed.');
        
        console.log(err);
      });
  };

  const handleCancel = () => {
    setError('Request cancelled');
    setTimeout(() => setError(''), 2000);
  }

  useEffect(() => {
    // remove the current state from local storage
    // so that when a person logs in they dont encounter
    // the previous state which wasnt cleared
    localStorage.removeItem('state');
  }, []);

  return (
    <div className="RequestRidePage Page">
      <Navbar />
      <div className="Form">
        <div className="FormTitle">Request ride</div>

        <DateTimePicker
          onChange={onDateTimeChange}
          value={pickupTime}
        />

        <InputTextField
          required
          type="text"
          name="departureLocation"
          value={details.departureLocation}
          placeholder="Departure Location"
          onChange={handleChange}
        />

        <InputTextField
          required
          type="text"
          name="destinationLocation"
          value={details.destinationLocation}
          placeholder="Destination Location"
          onChange={handleChange}
        />

        <InputTextField
          required
          type="number"
          name="numberOfSits"
          value={details.numberOfSits}
          placeholder="Number of seats"
          onChange={handleChange}
        />

        <InputTextField
          required
          type="number"
          name="disabledPeople"
          value={details.disabledPeople}
          placeholder="Disabled people"
          onChange={handleChange}
        />

        {error && (
          <div className="Error">
            {error}
          </div>
        )}

        <Button
          label="request ride"
          onClick={handleRequestRide}
        />

        <Button
          label="cancel"
          className="CancelBtn"
          onClick={handleCancel}
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

RequestRidePage.propTypes = {
  saveUser: PropTypes.func.isRequired
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(RequestRidePage));
