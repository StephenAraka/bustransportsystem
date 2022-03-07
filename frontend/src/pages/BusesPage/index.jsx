import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import './BusesPage.css';
import axios from 'axios';
import Button from '../../components/Button';
import { trimmed } from '../../helpers';
import InputTextField from '../../components/InputText';


const BusesPage = (props) => {
    const [bus, setBus] = useState({
        plateNumber: '',
        available: '',
        driver: '',
        issuingDate: '',
    });
    const [error, setError] = useState('');
    const handleChange = ({ target }) => {
        const { name, value } = target;
    
        if (error) {
          setError('');
        }
    
        setBus({
          ...bus,
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
        const { plateNumber, available, driver, issuingDate } = bus;
    
        const BusInfo = {
          plateNumber: trimmed(plateNumber),
          available: trimmed(available),
          driver: trimmed(driver),
          issuingDate: trimmed(issuingDate),
        }
    
        if (!bus.plateNumber || !bus.available || !bus.driver || !bus.issuingDate) {
          setError('All fields are required');
          return;
        }
        
        console.log(BusInfo);
        // Needs to be changed
        axios.post('/api/WeGo/users', BusInfo)             
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
                <div className="FormTitle">Add Bus</div>
        
                <InputTextField
                    required
                    type="text"
                    name="plateNumber"
                    value={bus.plateNumber}
                    placeholder="Plate Number"
                    onChange={handleChange}
                />

                <InputTextField
                    required
                    type="text"
                    name="available"
                    value={bus.available}
                    placeholder="Available"
                    onChange={handleChange}
                />

                <InputTextField
                    required
                    type="text"
                    name="driver"
                    value={bus.driver}
                    placeholder="driver"
                    onChange={handleChange}
                />

                <InputTextField
                    required
                    type="text"
                    name="issuingDate"
                    value={bus.issuingDate}
                    placeholder="Issuing Date"
                    onChange={handleChange}
                />
        
                {error && (
                    <div className="Error">
                    {error}
                    </div>
                )}
        
                <Button
                    label="ADD BUS"
                    onClick={submit}
                />
    
            </div>
        </div>
    )

}
export default connect()(withRouter(BusesPage));