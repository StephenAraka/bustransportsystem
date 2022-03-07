import React, { useState, useEffect } from 'react';
import { Link, withRouter } from 'react-router-dom';
import axios from 'axios';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import saveUser from '../../redux/actions/saveUser';
import { isValidEmail, trimmed } from '../../helpers';
import Button from '../Button';
import InputTextField from '../InputText';
import './LoginPage.css';

const LoginPage = (props) => {
  const [user, setUser] = useState({
    email: '',
    password: ''
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

  const handleLogin = () => {
    const { email, password } = user;

    //* Trim user details
    const userInfo = {
      email: trimmed(email),
      password: trimmed(password)
    }

    if (!userInfo.email || !userInfo.password) {
      setError('Email and password are required');
      return;
    }

    if (!isValidEmail(userInfo.email)) {
      setError('Invalid email address');
      return;
    }

    console.log(userInfo)
    axios.post('/api/users/login', userInfo)
      .then(res => {
        // save user data to store
        props.saveUser(res.data);
        // add access token to localstorage
        // localStorage.setItem('token', res.data.id);
        localStorage.setItem('id', res.data.user);
        // console.log(res);
        if (res.data.role === 'passenger') {
          window.location.href = "/passenger";
        } else {
          window.location.href = "/admin";
        }                
      })
      .catch((err) => {
        setError('Incorrect email or password.');
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
    <div className="LoginPage Page">
      <div className="Form">
        <div className="FormTitle">welcome back</div>

        <InputTextField
          required
          type="text"
          name="email"
          value={user.email}
          placeholder="Email"
          onChange={handleChange}
        />
        <InputTextField
          required
          type="password"
          name="password"
          value={user.password}
          placeholder="Password"
          onChange={handleChange}
        />

        {error && (
          <div className="Error">
            {error}
          </div>
        )}

        <Button
          label="Login"
          onClick={handleLogin}
        />

        <div className="AlternativeLink">
          Forgot password? <Link to='/forgot'>Reset</Link>
        </div>

        <div className="AlternativeLink">
          No account? <Link to='/register'>Register</Link>
        </div>
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

LoginPage.propTypes = {
  saveUser: PropTypes.func.isRequired
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(LoginPage));
