import styled from 'emotion/react';
import React from 'react';

import Container from 'components/Container';
import H1 from 'components/H1';

const Wrapper = styled(Container)`
  max-width: 720px;
  
  text-align: center;
  
  p {
    font-size: 14px;
  }
`;

function EmailConfirmed() {
  return (
    <Wrapper>
      <H1>Dirección de correo electrónico confirmada.</H1>
      <p>Has sido correctamente autenticado. ¡Ahora puedes cerrar esta ventana!</p>
    </Wrapper>
  )
}

export default EmailConfirmed;
