import React, { useState } from "react";
import Navbar from "../components/Navbar";
import axios from "axios";
import "../styles/AdministrarUsuario.css";

function AdministrarUsuarios() {
  const [showCreateUser, setShowCreateUser] = useState(false);
  const [showDeleteUser, setShowDeleteUser] = useState(false);
  const [showChangePassword, setShowChangePassword] = useState(false);

  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({ name: "", email: "", role: "", password: "" });
  const [confirmPassword, setConfirmPassword] = useState("");

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");

  const [loading, setLoading] = useState(false); // Indicador de carga
  const [alertMessage, setAlertMessage] = useState(""); // Mensajes de éxito o error
  const [alertType, setAlertType] = useState(""); // Tipo de alerta: success o error

  // Mostrar alertas
  const showAlert = (message, type) => {
    setAlertMessage(message);
    setAlertType(type);
    setTimeout(() => {
      setAlertMessage("");
      setAlertType("");
    }, 5000); // Ocultar alerta después de 5 segundos
  };

  // Crear Usuario
  const handleCreateUser = async () => {
    if (!newUser.email.endsWith("@unitec.edu")) {
      showAlert("El correo debe ser del dominio @unitec.edu", "error");
      return;
    }
    if (!newUser.name || !newUser.email || !newUser.role || !newUser.password) {
      showAlert("Por favor, llena todos los campos", "error");
      return;
    }
    if (newUser.password !== confirmPassword) {
      showAlert("Las contraseñas no coinciden", "error");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post("http://localhost:5000/api/register", {
        nombre: newUser.name,
        email: newUser.email,
        contraseña: newUser.password,
        id_rol: parseInt(newUser.role),
      });

      // Si el registro es exitoso
      showAlert(response.data.message, "success");
      setUsers([
        ...users,
        {
          id: response.data.id,
          name: newUser.name,
          email: newUser.email,
          role: newUser.role,
        },
      ]);

      setNewUser({ name: "", email: "", role: "", password: "" });
      setConfirmPassword("");
      setShowCreateUser(false);
    } catch (error) {
      console.error("Error al crear usuario:", error.response || error.message);
      showAlert(
        error.response?.data?.message || "Error desconocido al crear usuario",
        "error"
      );
    } finally {
      setLoading(false);
    }
  };

  // Otros métodos no se modifican en este caso

  return (
    <div>
      <Navbar />
      <h2 className="admin-title">Administrar Usuarios</h2>
      <div className="container">
        <div className="buttons-container">
          <button
            className="btn btn-primary"
            onClick={() => setShowCreateUser(true)}
          >
            Crear Usuario
          </button>
          <button
            className="btn btn-danger"
            onClick={() => setShowDeleteUser(true)}
          >
            Eliminar Usuario
          </button>
          <button
            className="btn btn-warning"
            onClick={() => setShowChangePassword(true)}
          >
            Cambiar Contraseña
          </button>
        </div>

        {/* Mostrar alerta */}
        {alertMessage && (
          <div className={`alert ${alertType === "success" ? "alert-success" : "alert-danger"}`}>
            {alertMessage}
          </div>
        )}
      </div>

      {/* Pop-up Crear Usuario */}
      {showCreateUser && (
        <div className="modal">
          <div className="modal-content">
            <h3>Crear Usuario</h3>
            <input
              type="text"
              placeholder="Nombre"
              value={newUser.name}
              onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
            />
            <input
              type="email"
              placeholder="Correo electrónico"
              value={newUser.email}
              onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
            />
            <select
              value={newUser.role}
              onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
            >
              <option value="">Seleccionar rol</option>
              <option value="1">Admin</option>
              <option value="2">Editor</option>
            </select>
            <input
              type="password"
              placeholder="Contraseña"
              value={newUser.password}
              onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
            />
            <input
              type="password"
              placeholder="Confirmar contraseña"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <button onClick={handleCreateUser} className="btn btn-success" disabled={loading}>
              {loading ? "Procesando..." : "Crear"}
            </button>
            <button
              onClick={() => setShowCreateUser(false)}
              className="btn btn-secondary"
              disabled={loading}
            >
              Cancelar
            </button>
          </div>
        </div>
      )}

      {/* Aquí se mantienen los otros pop-ups sin cambios */}
    </div>
  );
}

export default AdministrarUsuarios;
