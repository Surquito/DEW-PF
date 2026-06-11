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
const userTickets = require("../QUERY/userTickets");
const userMetrics = require("../QUERY/userMetrics");  
const getAreas = require("../QUERY/getAreas");
const getCategory = require("../QUERY/getCategory");
const getSubCategory = require("../QUERY/getSubCategory");
const getUser = require("../QUERY/getUser");
const getAnalystSupport = require("../QUERY/getAnalystSupport");

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
app.get("/analyst/metrics", async (req, res) => {
  try {
    const data = await analystMetrics();
    res.json(data);
  } catch (err) {
    res.status(500).json({ msg: "Error al obtener métricas" });
  }
});

/**
 * Listado de tickets asignados o gestionados por el analista
 */

app.get("/analyst/tickets", async (req, res) => {
  try {
    const data = await analystTickets(); // sin filtro
    res.json(data);
  } catch (err) {
    res.status(500).json({ msg: "Error al obtener tickets" });
  }
});

/**
 * Obtención de métricas globales para el dashboard del usuario
 */

app.get("/user/metrics/:codUser", async (req, res) => {
  try {
    const data = await userMetrics(req.params.codUser);
    res.json(data);
  } catch (err) {
    res.status(500).json({ msg: "Error al obtener métricas" });
  }
});

app.get("/user/tickets/:codUser", async (req, res) => {
  try {
    const data = await userTickets(req.params.codUser);
    res.json(data);
  } catch (err) {
    res.status(500).json({ msg: "Error al obtener tickets" });
  }
});

/**
 * Obtener áreas y usuarios para la creación de usuario
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

app.get("/user/:codArea", async (req, res) => {
  try {
    const codArea = req.params.codArea;

    if (!codArea) {
      return res.status(400).json({ msg: "Área inválida" });
    }

    const data = await getUser(codArea);

    res.json(data); 

  } catch (err) {
    console.error(err);
    res.status(500).json({
      msg: "Error al obtener usuarios"
    });
  }
});


/**
 * Obtener categorías  y subcategoria para la creación de ticket
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
    const codCategory = req.params.codCategory; 

    if (!codCategory) {
      return res.status(400).json({ msg: "Categoría inválida" });
    }

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
 * Obtener analistas disponibles por nivel de soporte para la creación de ticket
 */

app.get("/analysts-support/:codLevel", async (req, res) => {
  try {
    const codLevel = req.params.codLevel; 
    if (!codLevel) {
      return res.status(400).json({ msg: "Nivel de soporte inválido" });
    }
    const data = await getAnalystSupport(codLevel);
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({        
      msg: "Error al obtener analistas de soporte"
    });
  }
});


// ==========================================
// ENDPOINTS PARA PERFIL DE USUARIO (API)
// ==========================================







// ==========================================
// INICIALIZACIÓN DEL SERVICIO
// ==========================================
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  // Confirmación de inicio de servicio (estándar para monitoreo local)
  console.log("Servidor activo en http://localhost:" + PORT);
});