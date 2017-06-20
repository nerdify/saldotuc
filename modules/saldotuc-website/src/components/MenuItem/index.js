import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';

import styles from './styles.css';

function MenuItem(props) {
    const { children, color, ...rest } = props;

    const className = classNames(
      styles.item,
      'red' === color ? styles.red : false,
      props.disabled ? styles.disabled : false,
    )

    const Element = props.to ? Link : 'button';

    return (
      <Element {...rest} className={className}>
        <span className={styles.wrapper}>{children}</span>
      </Element>
    );
}

MenuItem.propType = {
  color: PropTypes.string,
  disabled: PropTypes.bool,
  to: PropTypes.string,
}

MenuItem.defaultProps = {
  color: 'default',
  disabled: false,
  to: null,
};

export default MenuItem;
