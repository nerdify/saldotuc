import styled from 'emotion/styled';

export const Form = styled.form`
  border-bottom: 1px solid #d8d8d8;
  margin: 0 auto;
  width: 260px;

  ${props => props.focus && `
    border-bottom-color: #292b2c;
  `}

  ${props => props.error && `
    border-bottom-color: red;
    color: red;
  `}
  
  ${props => props.loading && `
    border-bottom-color: #eee;
    color: #ccc;
    pointer-events: none;
  `}
`;

export const ErrorMessage = styled.div`
  font-size: 12px;
  
  color: red;
  text-align: center;
`;

export const Input = styled.input`
  border: none;
  display: block;
  height: 40px;
  margin: 0 auto;
  padding: 0;
  width: 100%;

  font-size: 14px;
  font-weight: 400;

  outline: none;
  text-align: center;

  transition: border-bottom-color 100ms ease-in, color 100ms ease-in;
  
  &::-webkit-input-placeholder {
    color: #aaa;
  }
`;
