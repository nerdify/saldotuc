import styled from 'styled-components';

import Button from 'components/Button';

export const Wrapper = styled.div`
  background-color: #fff;
  border-radius: 5px;
  box-shadow: 0 1px 2px rgba(0, 0, 0, .075);
  margin-bottom: 20px;
`;

export const Name = styled.div`
  padding: 12px 15px;
`;

export const Meta = styled.div`
  align-items: center;
  border-top: 1px solid #eff2f5; // #e0e6ec
  display: flex;
  padding: 11px 15px;
`;

export const Circle = styled.span`
  display: inline-block;
  height: 16px;
  height: ${props => props.size || 16}px;
  width: ${props => props.size || 16}px;

  background-color: ${props => props.color || '#4285f4'};
  border-radius: 50%;
`;

export const Number = styled.div`
  margin-left: 13px;
`;

export const Balance = styled.div`
  margin-left: auto;

  color: #54545e; // #94949e
`;

export const ActionList = styled.div`
  border-top: 1px solid #e0e6ec; // #d8dfe6; // #eef0ef;
  display: flex;
  justify-content: space-around;
`;

export const Action = styled(Button)`
  border: none;
  padding: 4px 0;

  font-size: 11px;
  font-size: 12px;

  color: #474c62;
  cursor: pointer;
  outline: none;
  text-align: center;
`;
