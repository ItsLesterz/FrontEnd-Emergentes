// src/pages/LandingPage.js
import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/LandingPage.css";
import { FaUpload, FaSearch, FaUsers, FaSignOutAlt } from "react-icons/fa";

function LandingPage() {
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <div className="landing-page">
      <h1 className="landing-title">Bienvenido, Administrador</h1>
      <div className="landing-buttons">
        <div
          className="landing-button"
          onClick={() => handleNavigation("/home")}
        >
          <FaUpload size={50} />
          <p>Subir Documentos</p>
        </div>
        <div
          className="landing-button"
          onClick={() => handleNavigation("/search")}
        >
          <FaSearch size={50} />
          <p>Buscar Documentos</p>
        </div>
        <div
          className="landing-button"
          onClick={() => handleNavigation("/admin-users")}
        >
          <FaUsers size={50} />
          <p>Administrar Usuarios</p>
        </div>
        <div
          className="landing-button"
          onClick={() => handleNavigation("/login")}
        >
          <FaSignOutAlt size={50} />
          <p>Cerrar Sesión</p>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
