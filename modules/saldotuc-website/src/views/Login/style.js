import { Text } from 'react-form';
import styled from 'styled-components';

import H1 from 'components/H1';

export const Wrapper = styled.div`
  margin: auto;
  max-width: 400px;
  padding: 20px 20px 40px;
  
  .FormError {
    font-size: 12px;
  
    color: red;
    text-align: center;
  }
`;

export const Title = styled(H1)`
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

export const Input = styled(Text)`
  border: none;
  border-bottom: 1px solid #d8d8d8;
  display: block;
  height: 40px;
  margin: 0 auto;
  padding: 0;
  width: 260px;

  font-size: 14px;
  font-weight: 400;

  outline: none;
  text-align: center;

  transition: border-bottom-color 100ms ease-in, color 100ms ease-in;
  
  ${props => props['data-loading'] && `
    border-bottom-color: #eee;
    color: #ccc;
    pointer-events: none;
  `}
  
  :focus {
    border-bottom-color: #292b2c;
  }
  
  ::-webkit-input-placeholder {
    color: #aaa;
  }
`;