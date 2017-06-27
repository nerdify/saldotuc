import bowser from 'bowser';
import Cookies from 'js-cookie';
import queryString from 'query-string';
import React, { PureComponent } from 'react';

import LoginForm from 'components/LoginForm';

import AuthService from 'utils/AuthService';

import {
  Description,
  Title,
  Wrapper,
} from './style';

const API_URL = 'https://saldotuc.com/api/registration';

class Login extends PureComponent {
  state = {
    email: null,
    errorMessage: null,
    loading: false,
    success: false,
    securityCode: null,
  }

  cancels = []

  onSubmit = async (email) => {
    let canceled = false;

    this.setState({
      email,
      loading: true,
    });

    this.cancels.push(() => {
      canceled = true;
    });

    try {
      const { securityCode, token } = await this.register(email);

      if (!canceled) {
        this.setState({
          securityCode,
          loading: false,
          success: true,
        });

        const data = await this.waitForVerification(token);

        if (data) {
          Cookies.set('token', data.token, {
            secure: window.document.protocol === 'https',
            expires: 365,
          });

          this.redirect();
        }
      }
    } catch (err) {
      this.setState({
        errorMessage: err.message,
        loading: false,
      });
    }
  }

  onCancel = (e) => {
    e.preventDefault();

    this.cancelAll()

    this.setState({
      email: null,
      success: false,
    });
  }

  async register(email) {
    const response = await fetch(`${API_URL}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        tokenName: `Website (${bowser.name})`,
      }),
    });

    if (response.status !== 200) {
      const error = await response.json();

      throw new Error(error.message);
    }

    return response.json();
  }

  async waitForVerification(token) {
    let canceled = false;

    this.cancels.push(() => {
      canceled = true;
    });

    await new Promise((resolve) => {
      setTimeout(resolve, 3000);
    });

    if (!canceled) {
      const query = queryString.stringify({
        token,
        email: this.state.email,
      });

      const response = await fetch(`${API_URL}/verify?${query}`);

      if (!canceled) {
        if (response.status !== 200) {
          return this.waitForVerification(token);
        }

        return response.json();
      }
    }
  }

  cancelAll() {
    const cancels = this.cancels;

    this.cancels = [];

    cancels.forEach((cancel) => {
      cancel();
    });
  }

  redirect() {
    window.location = '/app';
  }

  renderForm() {
    return (
      <div>
        <Description>
          <p>
            Ingresa tu correo electrónico para continuar.
            <br />
            Si no tienes una cuenta, crearemos una.
          </p>
        </Description>

        <LoginForm
          errorMessage={this.state.errorMessage}
          loading={this.state.loading}
          onSubmit={this.onSubmit}
        />
      </div>
    )
  }

  renderSuccess() {
    const { email, securityCode } = this.state;

    return (
      <Description>
        <p>
          Enviamos un correo electrónico a <strong>{email}</strong> <a href="" onClick={this.onCancel}>(Cancelar)</a>.
        </p>
        <p>
          Verifica que el código de seguridad
          proporcionado coincida con <strong>{securityCode}</strong> y sigue el enlace.
        </p>
        <p>Esperando tu confirmación...</p>
      </Description>
    );
  }

  componentDidMount() {
    const auth = new AuthService();

    if (auth.loggedIn()) {
      this.props.history.replace('/app');
    }
  }

  componentWillUnmount() {
    this.cancelAll();
  }

  render() {
    const { success } = this.state;

    return (
      <Wrapper>
        <Title>
          {success ? 'Iniciando sesión' : 'Inicia sesión'}
        </Title>

        {success ? this.renderSuccess() : this.renderForm()}
      </Wrapper>
    );
  }
}

export default Login;
