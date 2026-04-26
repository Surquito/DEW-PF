// ===============================
// CARGAR VARIABLES DE ENTORNO
// ===============================
require("dotenv").config();

const express = require("express");
const cors = require("cors");
const path = require("path");

// ===============================
// IMPORTAR QUERIES
// ===============================
const login = require("../QUERY/login");
const resetPassword = require("../QUERY/resetPassword");
const analystMetrics = require("../QUERY/analystMetrics");
const analystTickets = require("../QUERY/analystTickets");


// ===============================
// APP
// ===============================
const app = express();

// ===============================
// MIDDLEWARES
// ===============================
app.use(cors());
app.use(express.json());

// SERVIR ARCHIVOS ESTÁTICOS (HTML, JS, CSS, IMG)
app.use(express.static(path.join(__dirname, "..")));

// ===============================
// RUTA DE PRUEBA
// ===============================
app.get("/test", (req, res) => {
  res.send("Servidor funcionando correctamente");
});

// ===============================
// LOGIN
// ===============================
app.post("/login", async (req, res) => {
  const { codUser, password } = req.body;

  try {
    const user = await login(codUser, password);

    if (!user) {
      return res.status(401).json({
        msg: "Usuario o contraseña incorrectos"
      });
    }

    res.json({
      msg: "Login correcto",
      codUser: user.COD_USER,
      codArea: user.COD_AREA
    });

  } catch (error) {
    console.error("ERROR LOGIN:", error);
    res.status(500).json({
      msg: "Error del servidor"
    });
  }
});

// ===============================
// RESTABLECER CONTRASEÑA
// ===============================
app.put("/reset-password", async (req, res) => {
  const { email, newPassword } = req.body;

  try {
    const updated = await resetPassword(email, newPassword);

    if (updated === 0) {
      return res.status(404).json({
        msg: "Correo no encontrado"
      });
    }

    res.json({
      msg: "Contraseña actualizada correctamente"
    });

  } catch (error) {
    console.error("ERROR RESET PASSWORD:", error);
    res.status(500).json({
      msg: "Error al actualizar contraseña"
    });
  }
});


// ===============================
// METRICAS ANALISTA
// ===============================
app.get("/analyst/metrics/:codAnalyst", async (req, res) => {
  try {
    const data = await analystMetrics(req.params.codAnalyst);
    res.json(data);
  } catch (err) {
    res.status(500).json({ msg: "Error al obtener métricas" });
  }
});


// ===============================
// TICKETS DEL ANALISTA
// ===============================
app.get("/analyst/tickets/:codAnalyst", async (req, res) => {
  try {
    const data = await analystTickets(req.params.codAnalyst);
    res.json(data);
  } catch (err) {
    console.error("ERROR TICKETS:", err);
    res.status(500).json({ msg: "Error al obtener tickets" });
  }
});


// ===============================
// PUERTO
// ===============================
const PORT = process.env.PORT || 3000;

// ===============================
// LEVANTAR SERVIDOR
// ===============================
app.listen(PORT, () => {
  console.log("Servidor activo en http://localhost:" + PORT);
});
