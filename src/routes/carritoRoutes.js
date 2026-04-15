const express = require("express");
const router = express.Router();

const verificarToken = require("../middleware/authMiddleware");

const {
  obtenerCarrito,
  agregarProducto,
  aumentarCantidad,
  disminuirCantidad,
  eliminarProducto
} = require("../controllers/carritoController");

// 🔐 TODAS PROTEGIDAS
router.get("/", verificarToken, obtenerCarrito);

router.post("/agregar", verificarToken, agregarProducto);

router.put("/aumentar", verificarToken, aumentarCantidad);

router.put("/disminuir", verificarToken, disminuirCantidad);

router.delete("/eliminar", verificarToken, eliminarProducto);

module.exports = router;