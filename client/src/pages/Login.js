import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles/Auth.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
  
    try {
      const response = await axios.post("http://localhost:5000/api/login", {
        email,
        password,
      });
  
      console.log("Respuesta del backend:", response);
  
      if (response.data.success) {
        navigate("/landing");
      } else {
        alert(response.data.message || "Credenciales incorrectas.");
      }
    } catch (error) {
      console.error("Detalles del error:", error);
      alert(
        error.response?.data?.message ||
        "Ocurrió un error en el inicio de sesión. Inténtalo de nuevo más tarde."
      );
    }
  };
  

  return (
    <div className="auth-container">
      <form className="auth-form" onSubmit={handleLogin}>
        <h2>Iniciar Sesión</h2>
        <input
          type="email"
          placeholder="Correo Electrónico"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Ingresar</button>
        <div className="redirect-link">
          ¿No tienes cuenta? <a href="/register">Regístrate aquí</a>
        </div>
      </form>
    </div>
  );
}

export default Login;
