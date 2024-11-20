const express = require("express");
const bcrypt = require("bcrypt");
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


module.exports = router;
