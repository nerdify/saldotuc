import classNames from 'classnames';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { Form, Text } from 'react-form';
import { Motion, presets, spring } from 'react-motion';

import Button from 'components/Button';

import CreateCardMutation from 'mutations/CreateCardMutation';

import environment from 'createRelayEnvironment';

import './styles.css';

class CardForm extends PureComponent {
  static propTypes = {
    viewer: PropTypes.object.isRequired,
  }

  state = {
    expanded: false,
    loading: false,
  }

  handleExpand = () => {
    if (this.state.expanded) {
      this.form.resetForm();

      this.setState({
        expanded: false,
      });
    } else {
      // this.name.focus();
    }
  }

  handleFocus = () => {
    this.setState({
      expanded: true,
    });
  }

  onSubmit = (data) => {
    this.setState({
      loading: true,
    });

    const onError = (response) => {
      this.form.setFormState(Object.assign({}, this.form.state, {
        errors: {
          number: response.source.errors[0].message,
        },
        touched: {
          number: true,
        },
      }));

      this.setState({
        loading: false,
      });
    };

    const onCompleted = () => {
      this.handleExpand();

      this.setState({
        loading: false,
      });
    }

    CreateCardMutation.commit(
      environment,
      this.props.viewer,
      data.name,
      data.number,
      onError,
      onCompleted
    );
  }

  getDefaultStyle() {
    return {
      scale: 1,
      height: 0,
      padding: 56,
      rotate: 0,
      translateX: 0,
    };
  }

  getStyles() {
    if (this.state.expanded) {
      return {
        scale: spring(1.05, presets.wobbly),
        height: spring(56, { stiffness: 300 }),
        padding: spring(16, { stiffness: 300 }),
        rotate: spring(135, presets.stiff),
        translateX: spring(504, { stiffness: 300 }),
      };
    }

    return {
      scale: spring(1, presets.wobbly),
      height: spring(0, { stiffness: 300 }),
      padding: spring(56, { stiffness: 300 }),
      rotate: spring(0, presets.stiff),
      translateX: spring(0, { stiffness: 300 }),
    };
  }

  validate(values) {
    const errors = {
      name: values.name ? undefined : 'No puedes dejar este campo en blanco',
    };

    if (!values.number) {
      errors.number = 'No puedes dejar este campo en blanco';
    } else if (!/^\d{8}$/.test(values.number)) {
      errors.number = 'El número debe ser de 8 dígitos';
    }

    return errors;
  }

  render() {
    return (
      <Form
        onSubmit={this.onSubmit}
        ref={ref => (this.form = ref)}
        validate={this.validate}
      >
        {({ errors, submitForm }) =>
          <Motion
            defaultStyle={this.getDefaultStyle()}
            style={this.getStyles()}
          >
            {({ height, padding, rotate, scale, translateX }) => {
              return (
                <form
                  className={classNames('CardForm', { 'CardForm--expanded': this.state.expanded })}
                  onSubmit={submitForm}
                  style={{ transform: `scale(${scale})` }}
                >
                  <span
                    className="CardForm-icon"
                    onClick={this.handleExpand}
                    style={{ transform: `translateX(${translateX}px) rotate(${rotate}deg)` }}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24">
                      <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/>
                    </svg>
                  </span>
                  <Text
                    required
                    autoComplete="off"
                    className="CardForm-input"
                    field="name"
                    name="name"
                    onFocus={this.handleFocus}
                    placeholder={this.state.expanded ? 'Nombre' : 'Agregar nueva tarjeta'}
                    style={{ paddingLeft: padding }}
                    type="text"
                  />
                  <div className="CardForm-hidden" style={{ height }}>
                    <Text
                      required
                      autoComplete="off"
                      className="CardForm-input"
                      field="number"
                      name="number"
                      minLength="8"
                      maxLength="8"
                      placeholder="Número"
                      type="text"
                    />
                    <Button
                      className={classNames('CardForm-button', { 'CardForm-button--active': !errors })}
                      disabled={!!errors}
                      waiting={this.state.loading}
                    >
                      Guardar
                    </Button>
                  </div>
                </form>
              );
            }}
          </Motion>
        }
      </Form>
    );
  }
}

export default CardForm;
