// src/pages/LandingPage.js
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/LandingPage.css";
import { FaUpload, FaSearch, FaUsers, FaSignOutAlt } from "react-icons/fa";

function LandingPage() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
      navigate("/login"); // Redirigir si no hay usuario logueado
    }
  }, [navigate]);

  const handleNavigation = (path) => {
    navigate(path);
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <div className="landing-page">
      <h1 className="landing-title">
        Bienvenido, {user?.id_rol === 1 ? "Administrador" : "Usuario"}
      </h1>
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
        {/* Mostrar solo si el usuario es administrador */}
        {user?.id_rol === 1 && (
          <div
            className="landing-button"
            onClick={() => handleNavigation("/admin-users")}
          >
            <FaUsers size={50} />
            <p>Administrar Usuarios</p>
          </div>
        )}
        <div className="landing-button" onClick={handleLogout}>
          <FaSignOutAlt size={50} />
          <p>Cerrar Sesión</p>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
