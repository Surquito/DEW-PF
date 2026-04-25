// ✅ 1. Cargar variables de entorno (PRIMERA LÍNEA)
require("dotenv").config();

const express = require("express");
const cors = require("cors");
const path = require("path");

// ✅ 2. Importar queries
const listarAreas = require("../query/readArea");
const crearArea = require("../query/createArea");
const editarArea = require("../query/updateArea");
const eliminarArea = require("../query/deleteArea");

const app = express();

// ✅ 3. Middlewares
app.use(cors());
app.use(express.json());

// ✅ 4. Servir archivos estáticos (public/index.html)
app.use(express.static(path.join(__dirname, "../public")));

// ✅ 5. Ruta raíz (/)
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/index.html"));
});

// ✅ 6. Ruta de prueba
app.get("/test", (req, res) => {
  res.send("OK TEST - SERVIDOR FUNCIONANDO ✅");
});

/* =========================
   CRUD AREAS
   ========================= */

// READ
app.get("/areas", async (req, res) => {
  try {
    const areas = await listarAreas();
    res.json(areas);
  } catch (error) {
    console.error("ERROR /areas:", error);
    res.status(500).json({ msg: "Error al listar áreas" });
  }
});

// CREATE
app.post("/areas", async (req, res) => {
  try {
    const { codigo, area } = req.body;
    await crearArea(codigo, area);
    res.json({ msg: "Área creada correctamente" });
  } catch (error) {
    console.error("ERROR POST /areas:", error);
    res.status(500).json({ msg: "Error al crear área" });
  }
});

// UPDATE
app.put("/areas", async (req, res) => {
  try {
    const { codigo, area } = req.body;
    await editarArea(codigo, area);
    res.json({ msg: "Área actualizada correctamente" });
  } catch (error) {
    console.error("ERROR PUT /areas:", error);
    res.status(500).json({ msg: "Error al actualizar área" });
  }
});

// DELETE
app.delete("/areas/:codigo", async (req, res) => {
  try {
    const { codigo } = req.params;
    await eliminarArea(codigo);
    res.json({ msg: "Área eliminada correctamente" });
  } catch (error) {
    console.error("ERROR DELETE /areas:", error);
    res.status(500).json({ msg: "Error al eliminar área" });
  }
});

// ✅ 7. Puerto
const PORT = process.env.PORT || 3000;

// ✅ 8. Levantar servidor
app.listen(PORT, () => {
  console.log("Servidor activo en http://localhost:" + PORT);
});
``


app.get("/areas", async (req, res) => {
  try {
    const areas = await listarAreas();
    res.json(areas);
  } catch (error) {
    res.status(500).json({ msg: "Error al listar áreas" });
  }
});
``