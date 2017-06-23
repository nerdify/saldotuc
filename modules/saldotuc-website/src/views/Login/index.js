import bowser from 'bowser';
import Cookies from 'js-cookie';
import queryString from 'query-string';
import React, { PureComponent } from 'react';
import { Form as ReactForm } from 'react-form';
import isEmail from 'validator/lib/isEmail';

import AuthService from 'utils/AuthService';

import {
  Description,
  Input,
  Title,
  Wrapper,
} from './style';

const API_URL = 'https://saldotuc.com/api/registration';

class Login extends PureComponent {
  state = {
    email: null,
    loading: false,
    success: false,
    securityCode: null,
  }

  cancels = []

  form

  onEmail = (e, onChange) => {
    const email = e.target.value;

    onChange(email);

    this.setState(() => ({ email }));
  }

  onSubmit = async (data) => {
    let canceled = false;

    this.setState({ loading: true });

    this.cancels.push(() => {
      canceled = true;
    });

    try {
      const { securityCode, token } = await this.register(data.email);

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
      this.setState({ loading: false });

      this.form.setFormState(Object.assign({}, this.form.state, {
        errors: {
          email: err.message,
        },
        touched: {
          email: true,
        },
      }));
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

  validate(values) {
    return {
      email: isEmail(values.email || '') ? undefined : 'Email inválido',
    }
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

        <ReactForm
          ref={(ref) => (this.form = ref)}
          onSubmit={this.onSubmit}
          validate={this.validate}
        >
          {({ submitForm }) =>
            <form onSubmit={submitForm}>
              <Input
                autoFocus
                errorBefore
                data-loading={this.state.loading}
                field="email"
                onChange={this.onEmail}
                placeholder="tu@correo.com"
                type="email"
              />
            </form>
          }
        </ReactForm>
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
