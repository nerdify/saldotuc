import classNames from 'classnames';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';

import BasicSpinner from 'components/BasicSpinner';

import styles from './styles.css';

class Button extends PureComponent {
  static propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
    waiting: PropTypes.bool,
  }

  static defaultProps = {
    waiting: false,
  };

  onClick = (e) => {
    if (!this.props.disabled && this.props.onClick) {
      this.props.onClick(e)
    }
  };

  render() {
    const { children, className, waiting, ...rest } = this.props;
    let spinner = null;

    rest.disabled = rest.disabled || waiting;

    if (waiting) {
      spinner = (
        <div className={styles.indicator}>
          <BasicSpinner size={24} />
        </div>
      );
    }

    const buttonClassName = classNames(className, styles.button);
    const textClassName = classNames(waiting ? styles.text : false);

    return (
      <button
        className={buttonClassName}
        {...rest}
      >
        <span className={textClassName}>{children}</span>
        {spinner}
      </button>
    );
  }
}

export default Button;
