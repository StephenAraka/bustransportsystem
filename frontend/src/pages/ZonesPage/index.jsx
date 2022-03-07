import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import axios from 'axios';
import Button from '../../components/Button';
import { trimmed } from '../../helpers';
import InputTextField from '../../components/InputText';
import './ZonesPage.css'

const ZonesPage = (props) => {
    const [zone, setZone] = useState({
        routes: '',
        zoneName: '',
    });
    const [error, setError] = useState('');
    const handleChange = ({ target }) => {
        const { name, value } = target;
    
        if (error) {
          setError('');
        }
    
        setZone({
          ...zone,
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
        const { routes, zoneName } = zone;
    
        //* Trim user details
        const zoneInfo = {
          zoneName: trimmed(zoneName),
          routes: trimmed(routes)
        }
    
        if (!zoneInfo.zoneName || !zoneInfo.routes) {
          setError('All fields are required');
          return;
        }
        
        console.log(zoneInfo)
        axios.post('/api/WeGo/users', zoneInfo)             //!   Needs to be changed
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
                <div className="FormTitle">Add Zone</div>

                <InputTextField
                    required
                    type="text"
                    name="routes"
                    value={zone.routes}
                    placeholder="Zone"
                    onChange={handleChange}
                />
        
                <InputTextField
                    required
                    type="text"
                    name="zoneName"
                    value={zone.zoneName}
                    placeholder="Zone Name"
                    onChange={handleChange}
                />
        
                {error && (
                    <div className="Error">
                    {error}
                    </div>
                )}
        
                <Button
                    label="ADD ZONE"
                    onClick={submit}
                />
    
            </div>
        </div>
    )

}
export default connect(  )(withRouter(ZonesPage));