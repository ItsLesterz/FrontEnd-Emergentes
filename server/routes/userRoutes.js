const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const pool = require("../config/db");
const router = express.Router();

// Ruta para registrar usuarios
router.post("/register", async (req, res) => {
  const { nombre, email, contraseña, id_rol } = req.body;

  try {
    // Validar datos requeridos
    if (!nombre || !email || !contraseña || !id_rol) {
      return res.status(400).json({ success: false, message: "Todos los campos son obligatorios." });
    }

    // Verificar si el email ya está registrado
    const [userExists] = await pool.query("SELECT * FROM Usuarios WHERE email = ?", [email]);
    if (userExists.length > 0) {
      return res.status(400).json({ success: false, message: "El email ya está registrado." });
    }

    // Encriptar la contraseña
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(contraseña, salt);

    // Insertar usuario en la base de datos
    await pool.query(
      "INSERT INTO Usuarios (nombre, email, contraseña, id_rol, fecha_registro) VALUES (?, ?, ?, ?, NOW())",
      [nombre, email, hashedPassword, id_rol]
    );

    res.status(201).json({ success: true, message: "Usuario registrado exitosamente." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Error al registrar usuario." });
  }
});

// Ruta para iniciar sesión
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    // Normalizar el email (remover espacios y convertir a minúsculas)
    const normalizedEmail = email.trim().toLowerCase();

    console.log("Correo normalizado:", normalizedEmail);  // Log para ver el correo recibido

    const [user] = await pool.query("SELECT * FROM Usuarios WHERE LOWER(email) = LOWER(?)", [normalizedEmail]);
    
    // Verificar si el usuario fue encontrado
    if (!user || user.length === 0) {
      console.log("Usuario no encontrado con correo:", normalizedEmail);  // Log de cuando no se encuentra
      return res.status(404).json({ success: false, message: "Usuario no encontrado" });
    }

    // Si el usuario existe, verificar la contraseña
    const match = await bcrypt.compare(password, user[0].contraseña);
    if (!match) {
      return res.status(401).json({ success: false, message: "Contraseña incorrecta" });
    }

    res.status(200).json({ success: true, message: "Inicio de sesión exitoso", user: user[0] });

  } catch (error) {
    console.error("Error en la ruta de login:", error);
    res.status(500).json({ success: false, message: "Error al procesar el login" });
  }
});



// Ruta para obtener un usuario por email
router.get("/user/:email", async (req, res) => {
  const { email } = req.params;
  try {
    const [user] = await pool.query("SELECT * FROM Usuarios WHERE email = ?", [email]);
    if (!user) {
      return res.status(404).json({ success: false, message: "Usuario no encontrado" });
    }
    res.json({ success: true, user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Error al obtener usuario" });
  }
});

// Ruta para obtener todos los usuarios
router.get("/users", async (req, res) => {
  try {
    const [users] = await pool.query("SELECT * FROM Usuarios");
    res.json({ success: true, users });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Error al obtener usuarios" });
  }
});

// Eliminar usuario por correo
router.delete("/delete", async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ message: "El campo 'email' es obligatorio" });
  }

  try {
    console.log("Email recibido para eliminar:", email);

    const [result] = await pool.query("DELETE FROM Usuarios WHERE email = ?", [email]);
    console.log("Resultado de la consulta:", result);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    res.status(200).json({ message: "Usuario eliminado exitosamente" });
  } catch (error) {
    console.error("Error al eliminar usuario:", error);
    res.status(500).json({ message: "Error al eliminar usuario" });
  }
});

// Ruta para cambiar la contraseña de un usuario
router.put("/change-password", async (req, res) => {
  const { email, newPassword, confirmNewPassword } = req.body;

  try {
    // Validar que se hayan enviado todos los campos
    if (!email || !newPassword || !confirmNewPassword) {
      return res.status(400).json({ success: false, message: "Todos los campos son obligatorios." });
    }

    // Validar que las contraseñas coincidan
    if (newPassword !== confirmNewPassword) {
      return res.status(400).json({ success: false, message: "Las contraseñas no coinciden." });
    }

    // Verificar si el usuario existe
    const [user] = await pool.query("SELECT * FROM Usuarios WHERE email = ?", [email]);
    if (user.length === 0) {
      return res.status(404).json({ success: false, message: "Usuario no encontrado." });
    }

    // Encriptar la nueva contraseña
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    // Actualizar la contraseña en la base de datos
    await pool.query("UPDATE Usuarios SET contraseña = ? WHERE email = ?", [hashedPassword, email]);

    res.status(200).json({ success: true, message: "Contraseña actualizada exitosamente." });
  } catch (error) {
    console.error("Error al cambiar contraseña:", error);
    res.status(500).json({ success: false, message: "Error al cambiar contraseña." });
  }
});


module.exports = router;
