import React, { useState, useEffect } from 'react';
import { Link, withRouter } from 'react-router-dom';
import axios from 'axios';
import { connect } from 'react-redux';
import Navbar from '../Navbar';
import './MyRides.css';

const MyRidesPage = (props) => {
  const [rides, setrides] = useState([]);

  useEffect(() => {
    // remove the current state from local storage
    // so that when a person logs in they dont encounter
    // the previous state which wasnt cleared
    const id = localStorage.getItem('id');
    axios.get(`/api/rides/${id}`)
    .then((res) =>{
      setrides(res.data)
    })
    .catch(err => {
      console.log(err)
    })


  }, []);

  return (
    <div className="MyRidesPage Page">
      <Navbar />
      <div className="Form">
        <div className="FormTitle">My Rides</div>
        {rides.map((ride, index) => (
          <div className="Ride" key={index}>
            <div className="Date">{ride.pickupTime}</div>
            <div className="Departure">{ride.departureLocation}</div>
            <div className="Dest">{ride.destinationLocation}</div>
          </div>
        ))}    
      </div>
    </div>
  )
}

const mapStateToProps = (state) => (
  { user: state.user }
);

export default connect(
  mapStateToProps
)(withRouter(MyRidesPage));
