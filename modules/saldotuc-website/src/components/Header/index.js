import React from 'react';
import { Link } from 'react-router-dom';

import Icon from 'components/Icon';

import './styles.css';

function Header(props) {
  return (
    <header className="container Header">
      <Link className="Header-link" to="/">
        <div className="Header-logo">
          <Icon name="credit_card" />
        </div>
        Saldo TUC
      </Link>
    </header>
  );
}

export default Header;
