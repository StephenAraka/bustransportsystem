import React from 'react';
import { Link } from 'react-router-dom';
import { ReactComponent as LogoImg } from '../../assets/images/logo.svg';
import './Logo.css';

const Logo = ({ small }) => (
  <Link className="LogoLink" to="/">
    <LogoImg className={`LogoIcon ${small && 'SmallLogoIcon'}`} />
  </Link>
);

export default Logo;
