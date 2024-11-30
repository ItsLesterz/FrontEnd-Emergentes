import React, { useState } from "react";
import Navbar from "../components/Navbar";
import "../styles/AdministrarUsuario.css";

function AdministrarUsuarios() {
  const [showCreateUser, setShowCreateUser] = useState(false);
  const [showDeleteUser, setShowDeleteUser] = useState(false);
  const [showChangePassword, setShowChangePassword] = useState(false);

  const [users, setUsers] = useState([
    { id: 1, name: "Admin", email: "admin@unitec.edu", role: "admin" },
    { id: 2, name: "Editor", email: "editor@unitec.edu", role: "editor" },
    { id: 3, name: "Lector", email: "lector@unitec.edu", role: "lector" },
  ]);

  const [newUser, setNewUser] = useState({ name: "", email: "", role: "", password: "" });
  const [confirmPassword, setConfirmPassword] = useState("");

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");

  // Crear Usuario
  const handleCreateUser = () => {
    if (!newUser.email.endsWith("@unitec.edu")) {
      alert("El correo debe ser del dominio @unitec.edu");
      return;
    }
    if (newUser.password !== confirmPassword) {
      alert("Las contraseñas no coinciden");
      return;
    }
    setUsers([
      ...users,
      { id: Date.now(), name: newUser.name, email: newUser.email, role: newUser.role },
    ]);
    setNewUser({ name: "", email: "", role: "", password: "" });
    setConfirmPassword("");
    setShowCreateUser(false);
    alert("Usuario creado con éxito");
  };

  // Eliminar Usuario
  const handleDeleteUser = (userId) => {
    setUsers(users.filter((user) => user.id !== userId));
    alert("Usuario eliminado");
  };

  // Cambiar Contraseña
  const handleChangePassword = () => {
    if (newPassword !== confirmNewPassword) {
      alert("Las contraseñas no coinciden");
      return;
    }
    alert("Contraseña cambiada exitosamente");
    setCurrentPassword("");
    setNewPassword("");
    setConfirmNewPassword("");
    setShowChangePassword(false);
  };

  return (
    <div>
      <Navbar />
      <h2 className="admin-title">Administrar Usuarios</h2> {/* Título agregado arriba del contenedor */}
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
              <option value="admin">Admin</option>
              <option value="editor">Editor</option>
              <option value="lector">Lector</option>
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
            <button onClick={handleCreateUser} className="btn btn-success">
              Crear
            </button>
            <button onClick={() => setShowCreateUser(false)} className="btn btn-secondary">
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
            <ul>
              {users.map((user) => (
                <li key={user.id}>
                  {user.name} ({user.email}, {user.role})
                  <button
                    onClick={() => handleDeleteUser(user.id)}
                    className="btn btn-danger"
                  >
                    Eliminar
                  </button>
                </li>
              ))}
            </ul>
            <button onClick={() => setShowDeleteUser(false)} className="btn btn-secondary">
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
              type="password"
              placeholder="Contraseña actual"
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
            <button onClick={handleChangePassword} className="btn btn-warning">
              Cambiar
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
