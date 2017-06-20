import React from 'react';

import './styles.css';

function EmailConfirmed() {
  return (
    <div className="page-content">
      <div className="EmailConfirmed">
        <h1 className="EmailConfirmed-title">Dirección de correo electrónico confirmada.</h1>
        <p className="EmailConfirmed-description">Has sido correctamente autenticado. ¡Ahora puedes cerrar esta ventana!</p>
      </div>
    </div>
  )
}

export default EmailConfirmed;
