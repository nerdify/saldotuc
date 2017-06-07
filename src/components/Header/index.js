import React from 'react';
import { Link } from 'react-router-dom';

import CardIcon from 'components/CardIcon';

import './styles.css';

function Header(props) {
  return (
    <header className="container Header">
      <Link className="Header-link" to="/">
        <div className="Header-logo">
          <CardIcon />
        </div>
        Saldo TUC
      </Link>
    </header>
  );
}

export default Header;
