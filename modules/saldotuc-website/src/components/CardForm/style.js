import styled from 'emotion/styled';
import { Text } from 'react-form';

import BaseButton from 'components/Button';

export const Form = styled.form`
  margin-bottom: 30px;

  position: relative;

  background-color: #fff;
  border-radius: 4px;
  box-shadow: 0 0px 2px rgba(0, 0, 0, .035);

  &.expanded {
    box-shadow: 0 0 0 1px rgba(136, 152, 170, .1), 0 15px 35px 0 rgba(49, 49, 93, .1), 0 5px 15px 0 rgba(0, 0, 0, .08);
  }

  .FormInput {
    position: relative;
  }

  .FormError {
    bottom: 2px;
    left: 16px;
    position: absolute;

    font-size: 11px;

    color: red;
  }
`;

export const IconButton = styled.button`
  border: none;
  height: 56px;
  width: 56px;

  left: 0;
  position: absolute;

  color: #4285f4;
  cursor: pointer;
  outline: none;
  z-index: 1;
`;

export const Input = styled(Text)`
  border: none;
  height: 56px;
  padding: 0 16px;
  width: 100%;

  outline: none;
`;

export const WrapperHidden = styled.div`
  border-top: 1px solid #eff2f5;
  display: flex;

  overflow: hidden;

  .FormInput {
    flex-grow: 1;
  }
`;

export const Button = styled(BaseButton)`
  border: none;
  padding: 0 20px;

  color: ${props => props.disabled ? '#ddd' : '#4285f4'};
  cursor: pointer;
  outline: none;
  pointer-events: ${props => props.disabled ? 'none' : 'all'};
`;
