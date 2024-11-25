import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles/Auth.css";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    // Simulación de inicio de sesión
    if (username === "lester" && password === "123") {
      navigate("/landing");
    } else {
      // Puedes descomentar la llamada a la API si tu backend está disponible
      /*
      try {
        const response = await axios.post("/api/login", { username, password });
        if (response.data.success) {
          navigate("/home");
        } else {
          alert("Credenciales incorrectas.");
        }
      } catch (error) {
        console.error("Error en el inicio de sesión", error);
        alert("Ocurrió un error en el inicio de sesión. Inténtalo de nuevo más tarde.");
      }
      */
      alert("Credenciales incorrectas.");
    }
  };

  return (
    <div className="auth-container">
      <form className="auth-form" onSubmit={handleLogin}>
        <h2>Iniciar Sesión</h2>
        <input
          type="text"
          placeholder="Usuario"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
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
