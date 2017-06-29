import styled from 'emotion/styled';

import Container from 'components/Container';
import H1 from 'components/H1';

export const Wrapper = styled(Container)`
  align-items: center;
  display: flex;
  flex-direction: column;
  max-width: 720px;
  
  @media (min-width: 768px) {
    flex-direction: row;
    justify-content: space-around;
  }
`;

export const Intro = styled.div`
  text-align: center;

  @media (min-width: 768px) {
    text-align: left;
  }
`;

export const Title = styled(H1)`
  margin-bottom: 30px;

  position: relative;

  font-size: 32px;
  font-weight: 300;

  color: #fff;

  &:before {
    content: " ";
    height: 2px;
    width: 30px;

    bottom: -14px;
    left: 50%;
    position: absolute;

    background: #fff;
    transform: translateX(-50%);

    @media (min-width: 768px) {
      left: 0;

      transform: translateX(0);
    }
  }
`;

export const Subtitle = styled.h2`
  margin-bottom: 30px;

  font-size: 20px;
  font-weight: 300;

  color: #fff;

  abbr {
    text-decoration: none;
  }
`;

export const Buttons = styled.div`
  display: flex;
`;

export const Button = styled.a`
  align-items: center;
  display: inline-flex;
  padding: 10px;

  font-size: 20px;
  font-weight: 300;

  background-color: #fff;
  border-radius: 4px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, .15);
  color: #4285f4;
  text-decoration: none;

  &:first-child {
    margin-right: 20px;
  }

  b {
    margin: 0 4px;
  }

  @media (min-width: 768px) {
    padding: 10px 20px;

    font-size: 24px;
  }
`;

export const Image = styled.img`
  margin: 40px 0;
  width: 272px;
`;
