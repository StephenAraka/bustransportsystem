import React, { useState } from 'react';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import removeUser from '../../redux/actions/removeUser';
import { ReactComponent as MenuIcon } from '../../assets/images/menu-dots.svg';
import Logo from '../Logo';
import './Navbar.css';

const Navbar = ({ showTutorialTodo, showTutorialSupport, showClose, removeUser }) => {
  const [showMenu, setshowMenu] = useState(false);

  const logout = () => {
    localStorage.removeItem('state');
    localStorage.removeItem('token');
    removeUser();
    window.location.href = "/login";
  };

  const handleClick = () => {
    setshowMenu(!showMenu);
  }
  
  return (
    <div className="Navbar">
      <Logo small />
      <div onClick={handleClick} >
        <MenuIcon className="Icon" />
        {showMenu && (
              <div className="MenuWrapper">
                <div className="DropdownMenu">
                  <div className="DropdownItem">
                    <Link to="/settings">Settings</Link>
                  </div>
                  <div className="DropdownItem">
                    <div role="presentation" onClick={logout}>Logout</div>
                  </div>
                </div>
              </div>
            )}
      </div>
    </div>
  )
}

const mapStateToProps = (state) => (
  { user: state.user }
);

const mapDispatchToProps = {
  removeUser
};

Navbar.propTypes = {
  removeUser: PropTypes.func.isRequired
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Navbar));
