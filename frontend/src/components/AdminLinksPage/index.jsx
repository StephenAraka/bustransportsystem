import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import Navbar from '../Navbar';

const AdminLinksPage = (props) => {
  return (
    <div className="AdminLinksPage Page">
      <Navbar />
      <div className="Form">
        <div className="FormTitle"></div>

        <Link to='/admin/add-manager' className="LandingLoginBtn">
          Add manager
        </Link>

        <Link to='/admin/add-driver' className="LandingLoginBtn">
          Add driver
        </Link>

        <Link to='/admin/add-route' className="LandingLoginBtn">
          Add route
        </Link>

        <Link to='/admin/add-zone' className="LandingLoginBtn">
          Add zones
        </Link>

        <Link to='/admin/add-bus-stop' className="LandingLoginBtn">
          Add bus stop
        </Link>

        <Link to='/admin/add-bus' className="LandingLoginBtn">
          Add bus
        </Link>

      </div>
    </div>
  )
}

const mapStateToProps = (state) => (
  { user: state.user }
);

export default connect(
  mapStateToProps
)(withRouter(AdminLinksPage));
