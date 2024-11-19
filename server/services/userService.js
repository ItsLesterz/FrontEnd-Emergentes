const db = require('../config/db');
const bcrypt = require('bcrypt');

const findUserByEmail = async (email) => {
  const [rows] = await db.query('SELECT * FROM Usuarios WHERE email = ?', [email]);
  return rows[0];
};

const comparePasswords = async (plainPassword, hashedPassword) => {
  return await bcrypt.compare(plainPassword, hashedPassword);
};

module.exports = { findUserByEmail, comparePasswords };
