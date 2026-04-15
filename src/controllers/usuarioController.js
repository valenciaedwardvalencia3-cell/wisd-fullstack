// ================= CONTROLADOR DE USUARIO =================

const Usuario = require("../models/Usuario"); // 🔥 IMPORTANTE
const bcrypt = require("bcryptjs");           // 🔥 IMPORTANTE
const jwt = require("jsonwebtoken");

// ================= REGISTRO =================
const registrarUsuario = async (req, res) => {
  try {

    const { nombre, usuario, correo, password, telefono, direccion } = req.body;

    // Verificar si ya existe
    const existe = await Usuario.findOne({ correo });

    if (existe) {
      return res.status(400).json({ msg: "El usuario ya existe" });
    }

    // 🔐 Encriptar contraseña
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    // Crear usuario
    const nuevoUsuario = new Usuario({
      nombre,
      usuario,
      correo,
      password: passwordHash,
      telefono,
      direccion
    });

    await nuevoUsuario.save();

    res.json({ msg: "Usuario registrado correctamente" });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ================= LOGIN =================
const loginUsuario = async (req, res) => {
  try {

    const { correo, password } = req.body;

    // Buscar usuario
    const usuario = await Usuario.findOne({ correo });

    if (!usuario) {
      return res.status(400).json({ msg: "Usuario no existe" });
    }

    // Comparar contraseña
    const esValido = await bcrypt.compare(password, usuario.password);

    if (!esValido) {
      return res.status(400).json({ msg: "Contraseña incorrecta" });
    }

    // 🔐 TOKEN
    const token = jwt.sign(
      { id: usuario._id },
      "secreto_super_seguro",
      { expiresIn: "2h" }
    );

    res.json({
      msg: "Login exitoso",
      token,
      usuario
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// 🔥🔥🔥 ESTO ES LO MÁS IMPORTANTE
module.exports = {
  registrarUsuario,
  loginUsuario
};