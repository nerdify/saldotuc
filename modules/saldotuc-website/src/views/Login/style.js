import styled from 'styled-components';

import H1 from 'components/H1';

export const Wrapper = styled.div`
  margin: auto;
  max-width: 400px;
  padding: 20px 20px 40px;
`;

export const Title = H1.extend`
  text-align: center;
`;

export const Description = styled.div`
  font-size: 14px;

  line-height: 24px;
  text-align: center;
  
  strong {
    font-weight: 600;
  }
  
  a {
    color: #4285f4;
  }
`;
