/**
 * SERVIDOR PRINCIPAL - IT HELPDESK API
 * Configuración de Express, Middlewares y Definición de Endpoints
 */

require("dotenv").config();

const express = require("express");
const cors = require("cors");
const path = require("path");

// ==========================================
// IMPORTACIÓN DE MÓDULOS DE CONSULTA (QUERIES)
// ==========================================
const login = require("../QUERY/login");
const resetPassword = require("../QUERY/resetPassword");
const analystMetrics = require("../QUERY/analystMetrics");
const analystTickets = require("../QUERY/analystTickets");
const getAreas = require("../QUERY/getAreas");
const getCategory = require("../QUERY/getCategory");
const getSubCategory = require("../QUERY/getSubCategory");
//const newUser = require("../QUERY/newUser");
const newTicket = require("../QUERY/newTicket");
const readTicket = require("../QUERY/readTicket");
const readUser = require("../QUERY/readUser");
const updateUser = require("../QUERY/updateUser");
const getMetrics = require("../QUERY/getMetrics");
const getRecentTickets = require("../QUERY/getRecentTickets");

const app = express();

// ==========================================
// CONFIGURACIÓN DE MIDDLEWARES
// ==========================================
app.use(cors());
app.use(express.json());

/**
 * Servidor de archivos estáticos: permite el acceso a la interfaz
 * (HTML, CSS, JS del cliente e imágenes).
 */
app.use(express.static(path.join(__dirname, "..")));

// ==========================================
// RUTAS DE DIAGNÓSTICO Y ACCESO
// ==========================================

app.get("/test", (req, res) => {
  res.send("Servidor funcionando correctamente");
});

/**
 * Autenticación de usuarios
 * POST /login
 */
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
    res.status(500).json({ msg: "Error del servidor" });
  }
});

/**
 * Recuperación de cuenta: actualización de contraseña
 * PUT /reset-password
 */
app.put("/reset-password", async (req, res) => {
  const { email, newPassword } = req.body;

  try {
    const updated = await resetPassword(email, newPassword);

    if (updated === 0) {
      return res.status(404).json({ msg: "Correo no encontrado" });
    }

    res.json({ msg: "Contraseña actualizada correctamente" });

  } catch (error) {
    res.status(500).json({ msg: "Error al actualizar contraseña" });
  }
});

// ==========================================
// ENDPOINTS PARA PERFIL DE ANALISTA
// ==========================================

/**
 * Obtención de métricas globales para el dashboard del analista
 */
app.get("/analyst/metrics/:codAnalyst", async (req, res) => {
  try {
    const data = await analystMetrics(req.params.codAnalyst);
    res.json(data);
  } catch (err) {
    res.status(500).json({ msg: "Error al obtener métricas" });
  }
});

/**
 * Listado de tickets asignados o gestionados por el analista
 */
app.get("/analyst/tickets/:codAnalyst", async (req, res) => {
  try {
    const data = await analystTickets(req.params.codAnalyst);
    res.json(data);
  } catch (err) {
    res.status(500).json({ msg: "Error al obtener tickets" });
  }
});

/**
 * Obtener áreas para la creación de usuario
 */
app.get("/areas", async (req, res) => {

  try {

    const data = await getAreas();

    res.json(data);

  } catch (err) {

    console.error(err);

    res.status(500).json({
      msg: "Error al obtener áreas"
    });
  }
});

/**
 * Obtener categorías para la creación de ticket
 */

app.get("/categories", async (req, res) => {
  try {
    const data = await getCategory();
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({
      msg: "Error al obtener categorías"
    });
  }
});

app.get("/subcategories/:codCategory", async (req, res) => {
  try {
    const { codCategory } = req.params;

    const data = await getSubCategory(codCategory);

    res.json(data);

  } catch (err) {
    console.error(err);
    res.status(500).json({
      msg: "Error al obtener subcategorías"
    });
  }
});


/**
 * Creacion de nuevo usuario (solo para analistas)
 */
app.post("/analyst/users", async (req, res) => {
  const { codUser, email, nombres, apellidos, celular, fechaNacimiento, password, codArea } = req.body;

  try {
    const result = await newUser({ codUser, email, nombres, apellidos, celular, fechaNacimiento, password, codArea });
    res.status(201).json({
      msg: "Usuario creado exitosamente",
      userId: result.NewUserID
    });
  } catch (error) {
    res.status(500).json({ msg: "Error interno del servidor al crear el usuario" });
  }
});

// ==========================================
// ENDPOINTS PARA PERFIL DE USUARIO (API)
// ==========================================

/**
 * Creación de un nuevo ticket de soporte
 */
app.post("/api/user/tickets", async (req, res) => {
  const { asunto, descripcion, usuario } = req.body;

  // Validación de integridad de datos obligatorios
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
    res.status(500).json({ msg: "Error interno del servidor al crear el ticket" });
  }
});

/**
 * Consulta de información detallada de un ticket específico
 */
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
    res.status(500).json({ msg: "Error interno del servidor al consultar el ticket" });
  }
});

/**
 * Obtención de datos de perfil de un usuario
 */
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

/**
 * Actualización de datos personales del usuario
 */
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

/**
 * Métricas de resumen para la vista principal del usuario
 */
app.get("/api/user/metrics/:codUser", async (req, res) => {
  const { codUser } = req.params;
  try {
    const metrics = await getMetrics(codUser);
    res.json(metrics);
  } catch (error) {
    res.status(500).json({ msg: "Error al obtener métricas" });
  }
});

/**
 * Historial de tickets recientes para la bandeja de entrada del usuario
 */
app.get("/api/user/tickets-recent/:codUser", async (req, res) => {
  const { codUser } = req.params;
  try {
    const tickets = await getRecentTickets(codUser);
    res.json(tickets);
  } catch (error) {
    res.status(500).json({ msg: "Error interno", error: error.message });
  }
});

// ==========================================
// INICIALIZACIÓN DEL SERVICIO
// ==========================================
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  // Confirmación de inicio de servicio (estándar para monitoreo local)
  console.log("Servidor activo en http://localhost:" + PORT);
});