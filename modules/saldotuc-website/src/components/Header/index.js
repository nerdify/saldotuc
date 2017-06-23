import queryString from 'query-string';
import React from 'react';
import { withRouter } from 'react-router-dom';

import Icon from 'components/Icon';

import { Link, Logo, Wrapper } from './style';

function Header(props) {
  const query = queryString.parse(props.location.search);

  if (query && query.ref === 'facebook-page-tab') {
    return null;
  }

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

export default withRouter(Header);
