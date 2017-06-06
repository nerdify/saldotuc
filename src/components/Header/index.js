import React from 'react';

import CardIcon from 'components/CardIcon';

import './styles.css';

function Header(props) {
  return (
    <header className="Header">
      <h1 className="Header-title">
        <div className="Header-logo">
          <CardIcon />
        </div>
        Saldo TUC
      </h1>
    </header>
  );
}

export default Header;
