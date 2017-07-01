import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { Form as ReactForm } from 'react-form';
import { Motion, presets, spring } from 'react-motion';

import Icon from 'components/Icon';

import CreateCardMutation from 'mutations/CreateCardMutation';

import environment from 'relayEnvironment';

import {
  Button,
  Form,
  IconButton,
  Input,
  WrapperHidden,
} from './style';

class CardForm extends PureComponent {
  static propTypes = {
    viewer: PropTypes.object.isRequired,
  }

  state = {
    expanded: false,
    loading: false,
  }

  handleClose = (e) => {
    e.preventDefault();

    if (this.state.expanded) {
      this.setState(() => ({
        expanded: false,
        loading: false,
      }));

      this.form.resetForm();
    }
  }

  handleFocus = () => {
    this.setState({
      expanded: true,
    });
  }

  onSubmit = (data) => {
    const { name, number } = data;

    this.setState({
      loading: true,
    });

    const onError = (response) => {
      this.form.setFormState(Object.assign({}, this.form.state, {
        errors: {
          number: response[0].message,
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
      this.setState(() => ({
        expanded: false,
        loading: false,
      }));

      this.form.resetForm();

      analytics.track('Card Created', { name, number });
    }

    CreateCardMutation.commit(
      environment,
      this.props.viewer,
      name,
      number,
      onCompleted,
      onError
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
        translateX: spring(514, { stiffness: 300 }),
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
    const { expanded } = this.state;

    return (
      <ReactForm
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
                <Form
                  className={expanded ? 'expanded' : ''}
                  onSubmit={submitForm}
                  style={{ transform: `scale(${scale})` }}
                >
                  <IconButton
                    aria-label={expanded ? 'Minimizar formulario' : 'Maximizar formulario'}
                    onClick={this.handleClose}
                    style={{ transform: `translateX(${translateX}px) rotate(${rotate}deg)` }}
                    type="button"
                  >
                    <Icon name="add" size={32} />
                  </IconButton>
                  <Input
                    required
                    autoComplete="off"
                    field="name"
                    name="name"
                    onFocus={this.handleFocus}
                    placeholder={expanded ? 'Nombre' : 'Agregar nueva tarjeta'}
                    style={{ paddingLeft: padding }}
                    type="text"
                  />
                  <WrapperHidden style={{ height }}>
                    <Input
                      required
                      autoComplete="off"
                      field="number"
                      name="number"
                      minLength="8"
                      maxLength="8"
                      placeholder="Número"
                      type="number"
                    />
                    <Button
                      disabled={!!errors}
                      waiting={this.state.loading}
                    >
                      Guardar
                    </Button>
                  </WrapperHidden>
                </Form>
              );
            }}
          </Motion>
        }
      </ReactForm>
    );
  }
}

export default CardForm;
