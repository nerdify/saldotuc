import React from 'react';

import Icon from 'components/Icon';

import { Link, Logo, Wrapper } from './style';

function Header() {
  return (
    <Wrapper>
      <Link to="/">
        <Logo>
          <Icon name="credit_card" />
        </Logo>
        Saldo TUC
      </Link>
    </Wrapper>
  );
}

export default Header;
