require('dotenv').config();
console.log('ENV:', process.env);
const express = require("express");
const cors = require("cors");
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");


const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Configurar middleware CORS
app.use(cors({
  origin: "http://localhost:3000", // Permitir solicitudes desde el front end
  methods: ["GET", "POST", "PUT", "DELETE"], // Métodos permitidos
  credentials: true, // Permitir cookies si es necesario
}));

app.use("/api/auth", authRoutes);
app.use("/api", userRoutes);

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
