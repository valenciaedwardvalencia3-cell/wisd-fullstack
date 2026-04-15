// ================= MODELO DE USUARIO =================

const mongoose = require("mongoose");

const UsuarioSchema = new mongoose.Schema({

  nombre: {
    type: String,
    required: true
  },

  usuario: {
    type: String,
    required: true
  },

  correo: {
    type: String,
    required: true,
    unique: true
  },

  password: {
    type: String,
    required: true
  },

  telefono: {
    type: String
  },

  direccion: {
    type: String
  }

}, {
  timestamps: true // guarda fecha de creación
});

module.exports = mongoose.model("Usuario", UsuarioSchema);