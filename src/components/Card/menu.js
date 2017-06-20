import PropTypes from 'prop-types';
import { PureComponent } from 'react';
import onClickOutside from 'react-onclickoutside';

import './styles.css';

class Menu extends PureComponent {
  static propTypes = {
    onClickOutside: PropTypes.func.isRequired,
  }

  handleClickOutside = this.props.onClickOutside;

  render() {
    return this.props.children;
  }
}

export default onClickOutside(Menu);
