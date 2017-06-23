import styled from 'styled-components';

import Container from 'components/Container';
import H1 from 'components/H1';

export const Wrapper = Container.extend`
  color: #fff;
  text-align: center;
`;

export const Title = H1.extend`
  margin-bottom: 0;

  font-size: 48px;
  font-weight: 600;
`;

export const Text = styled.p`
  margin-top: 10px;

  font-size: 20px;
  font-weight: 200;
`;
