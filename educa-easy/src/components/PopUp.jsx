import React from "react";
import "../css/PopUp.css"; // Estilo personalizado

function PopUp({ message, onClose }) {
  return (
    <div className="popup-overlay">
      <div className="popup-container">
        <div className="popup-content">
          <p>{message}</p>
          <button className="popup-button" onClick={onClose}>Fechar</button>
        </div>
      </div>
    </div>
  );
}

export default PopUp;
