const express = require("express");
const router = express.Router();

const {
  registrarUsuario,
  loginUsuario
} = require("../controllers/usuarioController");

// Ruta registro
router.post("/registro", registrarUsuario);

// Ruta login
router.post("/login", loginUsuario);

module.exports = router;