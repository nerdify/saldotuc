import React, { PureComponent } from 'react';

import Footer from 'components/Footer';
import Icon from 'components/Icon';

import {
  Button,
  Buttons,
  Image,
  Intro,
  Subtitle,
  Title,
  Wrapper,
} from './style';
import nexus from './nexus.png';

class Home extends PureComponent {
  componentDidMount() {
    document.body.classList.add('home');
  }

  componentWillUnmount() {
    document.body.classList.remove('home');
  }

  render() {
    return (
      <div>
        <Wrapper>
          <Intro>
            <Title>Consulta tu saldo<br />sin esfuerzo</Title>
            <Subtitle>
              Consultar tus tarjetas
              <br />
              <abbr title="Transporte Urbano Colectivo">TUC</abbr>
              {' '}
              desde cualquier lugar.
            </Subtitle>
            <Buttons>
              <Button href="https://play.google.com/store/apps/details?id=com.socialimprover.saldotuc">
                <Icon name="play_store" /> <b>Google</b> play
              </Button>
              <Button href="/app">
                <b>Web</b> app
              </Button>
            </Buttons>
          </Intro>
          <Image alt="Saldo TUC" src={nexus} />

        </Wrapper>

        <Footer />
      </div>
    );
  }
}

export default Home;
