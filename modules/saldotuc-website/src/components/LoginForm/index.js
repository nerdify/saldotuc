import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import isEmail from 'validator/lib/isEmail';

import {
  ErrorMessage,
  Form,
  Input,
} from './style';

class LoginForm extends PureComponent {
  static propTypes = {
    errorMessage: PropTypes.string,
    loading: PropTypes.bool,
    onSubmit: PropTypes.func.isRequired,
  }

  state = {
    email: null,
    error: false,
    focus: false,
  }

  onBlur = () => {
    this.setState({
      focus: false,
    });
  }

  onFocus = () => {
    this.setState({
      focus: true,
    });
  }

  onInput = (e) => {
    const email = e.target.value;

    if (this.state.error && isEmail(email || '')) {
      this.setState({
        error: false,
      });
    }

    this.setState({ email });
  }

  onSubmit = (e) => {
    e.preventDefault();

    const { email } = this.state;

    if (isEmail(email || '')) {
      this.props.onSubmit(email);
    } else {
      this.setState({
        error: true,
      });
    }
  }

  render() {
    return (
      <Form
        error={this.state.error}
        focus={this.state.focus}
        loading={this.props.loading}
        onSubmit={this.onSubmit}
      >
        {this.props.errorMessage && (
          <ErrorMessage>
            {this.props.errorMessage}
          </ErrorMessage>
        )}

        <Input
          autoFocus
          required
          disabled={this.props.loading}
          onBlur={this.onBlur}
          onFocus={this.onFocus}
          onInput={this.onInput}
          placeholder="tu@correo.com"
          type="email"
        />
      </Form>
    );
  }
}

export default LoginForm;
