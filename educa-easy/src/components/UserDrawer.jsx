import React from "react";
import "../css/UserDrawer.css";
import { useNavigate } from "react-router-dom";

function UserDrawer({ open, onClose, user, onLogout }) {
    const navigate = useNavigate();

    const goMyCourses = () => {
    onClose();
    navigate("/my-courses");
    };

    const goAccount = () => {
    onClose();
    navigate("/account");
    };

  return (
    <>
      <div
        className={`drawer-overlay ${open ? "drawer-overlay--open" : ""}`}
        onClick={onClose}
      />
      <aside className={`drawer-panel ${open ? "drawer-panel--open" : ""}`}>
        {/* topo */}
        <div>
          <div className="drawer-header">
            <span className="drawer-title">Minha área</span>
            <button className="drawer-close" onClick={onClose}>×</button>
          </div>

          <div className="drawer-section">
            <p className="drawer-username">{user?.nome}</p>
          </div>

          {/* linha logo abaixo do nome */}
          <div className="drawer-divider" />

          <div className="drawer-section">
            <button className="drawer-link" onClick={goMyCourses}>Meus cursos</button>
            <button className="drawer-link">Meus certificados</button>
          </div>
        </div>

        {/* rodapé */}
        <div>
          <div className="drawer-section">
            <button className="drawer-link" onClick={goAccount}>Minha conta</button>
            <button
              className="drawer-link drawer-link--danger"
              onClick={onLogout}
            >
              Sair
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}



export default UserDrawer;
