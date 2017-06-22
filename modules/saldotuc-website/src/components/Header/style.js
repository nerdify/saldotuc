import { Link as BaseLink } from 'react-router-dom';
import styled from 'styled-components';

import Container from 'components/Container';

export const Wrapper = Container.withComponent('Header').extend`
  display: flex;
  justify-content: center;
  padding: 20px 0;
`;

export const Link = styled(BaseLink)`
  align-items: center;
  display: flex;

  font-size: 24px;
  font-weight: 500;

  color: #4285f4;
  text-decoration: none;
  
  :hover {
    color: #4285f4;
    text-decoration: none;
  }
  
  .home & {
    color: #fff;
  }
`;

export const Logo = styled.div`
  align-items: center;
  display: flex;
  height: 48px;
  justify-content: center;
  margin-right: 10px;
  width: 48px;

  background-color: #4285f4;
  border-radius: 50%;
  color: #fff;
  
  .home & {
    background-color: #fff;
    color: #4285f4;
  }
`;
