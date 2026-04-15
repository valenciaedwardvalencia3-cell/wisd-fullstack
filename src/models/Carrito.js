// ================= MODELO DE CARRITO =================

const mongoose = require("mongoose");

const CarritoSchema = new mongoose.Schema({

  // 🔥 Usuario dueño del carrito
  usuario: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Usuario",
    required: true
  },

  // 🔥 Productos del carrito
  productos: [
    {
      nombre: String,
      precio: Number,
      cantidad: Number,
      imagen: String
    }
  ]

}, { timestamps: true });

module.exports = mongoose.model("Carrito", CarritoSchema);