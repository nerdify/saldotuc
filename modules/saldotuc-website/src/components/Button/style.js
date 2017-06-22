import styled from 'styled-components';

export const Button = styled.button`
  position: relative;
`;

export const Indicator = styled.div`
  align-items: center;
  display: flex;
  justify-content: center;

  bottom: 0;
  left: 0;
  position: absolute;
  right: 0;
  top: 0;
`;

export const Text = styled.span`
  ${props => props.waiting && `
    color: rgba(255, 255, 255, 0);
    opacity: 0;
  `}
`;