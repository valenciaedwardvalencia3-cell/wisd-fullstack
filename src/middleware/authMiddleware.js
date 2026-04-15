const jwt = require("jsonwebtoken");

const verificarToken = (req, res, next) => {

  const token = req.headers["authorization"];

  if (!token) {
    return res.status(401).json({ msg: "Acceso denegado" });
  }

  try {
    const decoded = jwt.verify(token, "secreto_super_seguro");

    req.usuario = decoded.id;

    next();

  } catch (error) {
    res.status(400).json({ msg: "Token inválido" });
  }
};

module.exports = verificarToken;