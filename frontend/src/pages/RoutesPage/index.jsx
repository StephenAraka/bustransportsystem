import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import './RoutesPage.css';
import axios from 'axios';
import Button from '../../components/Button';
import { trimmed } from '../../helpers';
import InputTextField from '../../components/InputText';

const RoutesPage = (props) => {
    const [route, setRoute] = useState({
        route: '',
    });
    const [error, setError] = useState('');
    const handleChange = ({ target }) => {
        const { name, value } = target;
    
        if (error) {
          setError('');
        }
    
        setRoute({
          ...route,
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
        const { routeName } = route;
    
        const routeInfo = {
          routeName: trimmed(routeName)
        }
    
        if (!routeInfo.route) {
          setError('Route is required');
          return;
        }
        
        console.log(routeInfo)
        axios.post('/api/WeGo/users', routeInfo)             //!   Needs to be changed
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
                <div className="FormTitle">Add Route</div>
        
                <InputTextField
                    required
                    type="text"
                    name="route"
                    value={route.routeName}
                    placeholder="Route"
                    onChange={handleChange}
                />
        
                {error && (
                    <div className="Error">
                    {error}
                    </div>
                )}
        
                <Button
                    label="ADD ROUTE"
                    onClick={submit}
                />
    
            </div>
        </div>
    )

}
export default connect(  )(withRouter(RoutesPage));