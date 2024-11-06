// src/components/Popup.js
import React from 'react';

const Popup = ({ show, details, onAccept }) => {
  if (!show) return null;
  return (
    <div className="popup">
      <div className="popup-content">
        <p>{details}</p>
        <button onClick={onAccept}>Aceptar</button>
      </div>
    </div>
  );
};

export default Popup;
