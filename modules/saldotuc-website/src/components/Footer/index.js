import React from 'react';

import styled from 'emotion/styled';

const Wrapper = styled.div`
  font-size: 11px;

  color: #fff;
  text-align: center;

  a {
    color: #fff;
  }
`;

function Footer() {
  return (
    <Wrapper>
      <p>
        Handcrafted by <a href="https://getnerdify.com" target="_black">Nerdify</a> in Managua, NI.
      </p>
    </Wrapper>
  );
}

export default Footer;
