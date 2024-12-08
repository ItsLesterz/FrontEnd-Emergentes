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

  const [emailToDelete, setEmailToDelete] = useState("");


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

  //Delete user
  const handleDeleteUser = async () => {
  if (!emailToDelete) {
    showAlert("Por favor, ingresa un correo electrónico", "error");
    return;
  }

  setLoading(true);
  try {
    // Enviar la solicitud DELETE
    const response = await axios.delete("http://localhost:5000/api/delete", {
      data: { email: emailToDelete }, // Enviar el email en el cuerpo
    });

    // Mostrar mensaje de éxito
    showAlert(response.data.message || "Usuario eliminado exitosamente", "success");

    // Actualizar la lista de usuarios en el frontend
    setUsers((prevUsers) => prevUsers.filter((user) => user.email !== emailToDelete));

    // Limpiar el estado local relacionado
    setEmailToDelete("");
    setShowDeleteUser(false);
  } catch (error) {
    console.error("Error al eliminar usuario:", error.response || error.message);

    // Manejar el mensaje de error del servidor
    const errorMessage =
      error.response?.data?.message || "Error desconocido al eliminar usuario";
    showAlert(errorMessage, "error");
  } finally {
    setLoading(false);
  }
};

  

  // Cambiar Contraseña
  const handleChangePassword = async () => {
    // Validar que las contraseñas coincidan
    if (newPassword !== confirmNewPassword) {
      showAlert("Las contraseñas no coinciden", "error");
      return;
    }
  
    // Enviar solicitud al backend
    setLoading(true);
    try {
      const response = await axios.put("http://localhost:5000/api/change-password", {
        email: currentPassword, // Aquí se usa el campo de "contraseña actual" para capturar el email
        newPassword,
        confirmNewPassword,
      });
  
      // Mostrar mensaje de éxito
      showAlert(response.data.message || "Contraseña actualizada exitosamente", "success");
      setCurrentPassword("");
      setNewPassword("");
      setConfirmNewPassword("");
      setShowChangePassword(false);
    } catch (error) {
      console.error("Error al cambiar contraseña:", error.response || error.message);
  
      // Mostrar mensaje de error
      const errorMessage = error.response?.data?.message || "Error desconocido al cambiar contraseña";
      showAlert(errorMessage, "error");
    } finally {
      setLoading(false);
    }
  };
  

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

      {/* Pop-up Eliminar Usuario */}
    {showDeleteUser && (
      <div className="modal">
        <div className="modal-content">
          <h3>Eliminar Usuario</h3>
          <input
            type="email"
            placeholder="Correo del usuario a eliminar"
            value={emailToDelete}
            onChange={(e) => setEmailToDelete(e.target.value)}
          />
          <button
            onClick={handleDeleteUser}
            className="btn btn-danger"
            disabled={loading}
          >
            {loading ? "Procesando..." : "Eliminar"}
          </button>
          <button
            onClick={() => setShowDeleteUser(false)}
            className="btn btn-secondary"
            disabled={loading}
          >
            Cerrar
          </button>
        </div>
      </div>
    )}



      {/* Pop-up Cambiar Contraseña */}
{showChangePassword && (
  <div className="modal">
    <div className="modal-content">
      <h3>Cambiar Contraseña</h3>
      <input
        type="email"
        placeholder="Correo del usuario"
        value={currentPassword}
        onChange={(e) => setCurrentPassword(e.target.value)}
      />
      <input
        type="password"
        placeholder="Nueva contraseña"
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
      />
      <input
        type="password"
        placeholder="Confirmar nueva contraseña"
        value={confirmNewPassword}
        onChange={(e) => setConfirmNewPassword(e.target.value)}
      />
      <button onClick={handleChangePassword} className="btn btn-warning" disabled={loading}>
        {loading ? "Procesando..." : "Cambiar"}
      </button>
      <button onClick={() => setShowChangePassword(false)} className="btn btn-secondary">
        Cancelar
      </button>
    </div>
  </div>
)}

    </div>
  );
}

export default AdministrarUsuarios;
