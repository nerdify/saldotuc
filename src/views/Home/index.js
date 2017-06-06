import React, { Component } from 'react';

import PlayStoreIcon from 'components/PlayStoreIcon';

import nexus from './nexus.png';
import './styles.css';

class Home extends Component {
  render() {
    return (
      <div className="Home">
        <div className="Home-intro">
          <h2 className="Home-title">Consulta tu saldo<br />sin esfuerzo</h2>
          <p className="Home-subtitle">
            Consultar tus tarjetas
            <br />
            <abbr title="Transporte Urbano Colectivo">TUC</abbr>
            {' '}
            desde cualquier lugar.
          </p>
          <a
            className="Home-button"
            href="https://play.google.com/store/apps/details?id=com.socialimprover.saldotuc"
          >
            <PlayStoreIcon /> <b>Google</b> play
          </a>
        </div>
        <img alt="Saldo TUC" className="Home-image" src={nexus} />
      </div>
    );
  }
}

export default Home;
