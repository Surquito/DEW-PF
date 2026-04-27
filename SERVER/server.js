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
const newTicket = require("../QUERY/newTicket");
const readTicket = require("../QUERY/readTicket");
const readUser = require("../QUERY/readUser");
const updateUser = require("../QUERY/updateUser");
const getMetrics = require("../QUERY/getMetrics");
const getRecentTickets = require("../QUERY/getRecentTickets");

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
// CREAR NUEVO TICKET (USUARIO)
// ===============================
app.post("/api/user/tickets", async (req, res) => {
  console.log("DATOS RECIBIDOS EN EL SERVIDOR:", req.body);
  // Extraemos los datos enviados desde app_usuario.js
  const { 
    typeTask, area, usuario, estado, 
    categoria, subcategoria, asunto, descripcion, soporte 
  } = req.body;

  // Validación básica para campos obligatorios
  if (!asunto || !descripcion || !usuario) {
    return res.status(400).json({ 
      msg: "Faltan campos obligatorios (Asunto, Descripción o Usuario)" 
    });
  }

  try {
    const result = await newTicket(req.body);
    
    res.status(201).json({
      msg: "Ticket creado exitosamente",
      ticketId: result.NewTicketID
    });

  } catch (error) {
    console.error("ERROR CREATING TICKET:", error);
    res.status(500).json({
      msg: "Error interno del servidor al crear el ticket"
    });
  }
});
// ===============================
// CONSULTAR TICKET (USUARIO)
// ===============================
app.get("/api/user/tickets/:taskId", async (req, res) => {
  const { taskId } = req.params;

  try {
    const ticket = await readTicket(taskId);
    
    if (!ticket) {
      return res.status(404).json({ 
        msg: "Ticket no encontrado. Verifica el Task ID." 
      });
    }

    res.json(ticket);

  } catch (error) {
    console.error("ERROR LEYENDO TICKET:", error);
    res.status(500).json({
      msg: "Error interno del servidor al consultar el ticket"
    });
  }
});

// ===============================
// CONSULTAR USUARIO
// ===============================
app.get("/api/users/:codUser", async (req, res) => {
  const { codUser } = req.params;
  try {
    const user = await readUser(codUser);
    if (!user) return res.status(404).json({ msg: "Usuario no encontrado" });
    res.json(user);
  } catch (error) {
    res.status(500).json({ msg: "Error al consultar usuario" });
  }
});

// ===============================
// ACTUALIZAR USUARIO
// ===============================
app.put("/api/users", async (req, res) => {
  const userData = req.body;
  try {
    const updated = await updateUser(userData);
    if (updated === 0) {
      return res.status(404).json({ msg: "No se pudo actualizar el usuario" });
    }
    res.json({ msg: "Usuario actualizado correctamente" });
  } catch (error) {
    res.status(500).json({ msg: "Error al actualizar usuario" });
  }
});

app.get("/api/user/metrics/:codUser", async (req, res) => {
  const { codUser } = req.params;
  try {
    const metrics = await getMetrics(codUser);
    res.json(metrics);
  } catch (error) {
    console.error("Error en endpoint métricas:", error);
    res.status(500).json({ msg: "Error al obtener métricas" });
  }
});

app.get("/api/user/tickets-recent/:codUser", async (req, res) => {
  const { codUser } = req.params;
  try {
    const tickets = await getRecentTickets(codUser);
    
    // Si llegamos aquí, la BD respondió algo (aunque sea una lista vacía [])
    console.log(`Tickets encontrados para ${codUser}:`, tickets.length);
    res.json(tickets);
  } catch (error) {
    console.error("Fallo en la ruta /api/user/tickets-recent:", error);
    res.status(500).json({ msg: "Error interno", error: error.message });
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
