import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';

import styles from './styles.css';

function BasicSpinner(props) {
  const { isHidden, size } = props;

  const style = {
    height: `${size}px`,
    width: `${size}px`,
  };

  const className = classNames(
    styles.spinner,
    isHidden ? styles.hidden : false
  );

  return <span className={className} style={style} />;
};

BasicSpinner.propTypes = {
  isHidden: PropTypes.bool,
  size: PropTypes.number,
};

BasicSpinner.defaultProps = {
  size: 50,
};

export default BasicSpinner;
