import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import "../styles/Auth.css";

function Register() {
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [idRol, setIdRol] = useState("1"); // Valor por defecto del rol
  const [errorMessage, setErrorMessage] = useState(""); // Para manejar errores
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    // Validar que todos los campos estén llenos
    if (!nombre || !email || !password || !idRol) {
      setErrorMessage("Todos los campos son obligatorios");
      return;
    }

    try {
      const response = await axios.post("/api/register", {
        nombre,
        email,
        contraseña: password, // El backend espera 'contraseña'
        id_rol: idRol, // Se envía el rol seleccionado
      });

      if (response.data.success) {
        navigate("/login");
      }
    } catch (error) {
      setErrorMessage(error.response?.data?.message || "Error al registrar usuario");
      console.error("Error en el registro:", error);
    }
  };

  return (
    <div className="auth-container">
      <form className="auth-form" onSubmit={handleRegister}>
        <h2>Registro</h2>
        <input
          type="text"
          placeholder="Nombre"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
        />
        <input
          type="email"
          placeholder="Correo Electrónico"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <select
          value={idRol}
          onChange={(e) => setIdRol(e.target.value)}
        >
          <option value="1">1</option>
          <option value="2">2</option>
        </select>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        <button type="submit">Registrar</button>
        <div className="redirect-link">
          ¿Ya tienes una cuenta? <Link to="/login">Inicia sesión aquí</Link>
        </div>
      </form>
    </div>
  );
}

export default Register;
