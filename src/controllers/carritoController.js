const Carrito = require("../models/Carrito");

// ================= OBTENER =================
const obtenerCarrito = async (req, res) => {
  let carrito = await Carrito.findOne({ usuario: req.usuario });

  if (!carrito) {
    carrito = new Carrito({
      usuario: req.usuario,
      productos: []
    });
    await carrito.save();
  }

  res.json(carrito);
};

// ================= AGREGAR =================
const agregarProducto = async (req, res) => {

  const { nombre, precio, imagen } = req.body;

  let carrito = await Carrito.findOne({ usuario: req.usuario });

  if (!carrito) {
    carrito = new Carrito({ usuario: req.usuario, productos: [] });
  }

  const index = carrito.productos.findIndex(p => p.nombre === nombre);

  if (index !== -1) {
    carrito.productos[index].cantidad += 1;
  } else {
    carrito.productos.push({ nombre, precio, imagen, cantidad: 1 });
  }

  await carrito.save();
  res.json(carrito);
};

// ================= AUMENTAR =================
const aumentarCantidad = async (req, res) => {

  const { nombre } = req.body;

  const carrito = await Carrito.findOne({ usuario: req.usuario });

  const producto = carrito.productos.find(p => p.nombre === nombre);

  if (producto) {
    producto.cantidad += 1;
  }

  await carrito.save();
  res.json(carrito);
};

// ================= DISMINUIR =================
const disminuirCantidad = async (req, res) => {

  const { nombre } = req.body;

  const carrito = await Carrito.findOne({ usuario: req.usuario });

  const producto = carrito.productos.find(p => p.nombre === nombre);

  if (producto) {
    if (producto.cantidad > 1) {
      producto.cantidad -= 1;
    } else {
      carrito.productos = carrito.productos.filter(p => p.nombre !== nombre);
    }
  }

  await carrito.save();
  res.json(carrito);
};

// ================= ELIMINAR =================
const eliminarProducto = async (req, res) => {

  const { nombre } = req.body;

  const carrito = await Carrito.findOne({ usuario: req.usuario });

  carrito.productos = carrito.productos.filter(p => p.nombre !== nombre);

  await carrito.save();
  res.json(carrito);
};

module.exports = {
  obtenerCarrito,
  agregarProducto,
  aumentarCantidad,
  disminuirCantidad,
  eliminarProducto
};