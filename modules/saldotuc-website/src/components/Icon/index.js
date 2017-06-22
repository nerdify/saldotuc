import PropTypes from 'prop-types';
import React from 'react';

function Icon(props) {
  const { name, size } = props;

  const height = props.height || size;
  const width = props.width || size;
  const attributes = { width, height };

  return (
    <svg {...attributes}>
      <use xlinkHref={`/static/media/sprites.svg#${name}`} />
    </svg>
  );
}

Icon.propTypes = {
  height: PropTypes.number,
  name: PropTypes.string.isRequired,
  size: PropTypes.number,
  width: PropTypes.number,
};

Icon.defaultProps = {
  size: 24,
};

export default Icon;
