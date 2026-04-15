const express = require("express");
const cors = require("cors");

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Rutas
app.use("/api/usuarios", require("./routes/usuarioRoutes"));
app.use("/api/carrito", require("./routes/carritoRoutes"));

module.exports = app;