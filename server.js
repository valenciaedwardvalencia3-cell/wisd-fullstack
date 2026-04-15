require("dotenv").config();

const app = require("./src/app");
const conectarDB = require("./src/config/db");

const PORT = process.env.PORT || 5000;

// Conectar DB
conectarDB();

// Levantar servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en puerto ${PORT}`);
});