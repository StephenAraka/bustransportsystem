import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import './BusstopsPage.css';
import axios from 'axios';
import Button from '../../components/Button';
import { trimmed } from '../../helpers';
import InputTextField from '../../components/InputText';

const BusstopsPage = (props) => {
    const [busStop, setBusStop] = useState({
        zones: '',
        busStopName: '',
    });
    const [error, setError] = useState('');
    const handleChange = ({ target }) => {
        const { name, value } = target;
    
        if (error) {
          setError('');
        }
    
        setBusStop({
          ...busStop,
          [name]: value
        });
    };
    useEffect(() => {
        // remove the current state from local storage
        // so that when a person logs in they dont encounter
        // the previous state which wasnt cleared
        localStorage.removeItem('state');
    }, []);

    const submit = () => {
        const { zones, busStopName } = busStop;
    
        const BusStopsInfo = {
          zones: trimmed(zones),
          busStopName: trimmed(busStopName),
        }
    
        if (!busStop.zones || !busStop.busStopName) {
          setError('All fields are required');
          return;
        }
        
        console.log(BusStopsInfo);
        // Needs to be changed
        axios.post('/api/WeGo/users', BusStopsInfo)             
          .then(res => {
            // save user data to store
            props.saveUser(res.data);
            // add access token to localstorage
            localStorage.setItem('token', res.data.id);
            
            window.location.href = "/";
          })
          .catch((err) => {
            setError('Incorrect email or password.');
            console.log(err);
        });
    };
    
    return(
        <div className="Page">
            <div className="Form">
                <div className="FormTitle">Add Bus Stop</div>
        
                <InputTextField
                    required
                    type="text"
                    name="zones"
                    value={busStop.zones}
                    placeholder="Zones"
                    onChange={handleChange}
                />

                <InputTextField
                    required
                    type="text"
                    name="busStopName"
                    value={busStop.busStopName}
                    placeholder="Bus Stop Name"
                    onChange={handleChange}
                />
        
                {error && (
                    <div className="Error">
                    {error}
                    </div>
                )}
        
                <Button
                    label="ADD BUS STOP"
                    onClick={submit}
                />
    
            </div>
        </div>
    )

}

export default connect(  )(withRouter(BusstopsPage));
  