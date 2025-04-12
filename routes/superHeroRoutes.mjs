import express from "express";
import {
  obtenerSuperheroePorIdController,
  obtenerTodosLosSuperheroesController,
  buscarSuperheroesPorAtributoController,
  obtenerSuperheroesMayoresDe30Controller,
  crearNuevoSuperheroeController,
  actualizarSuperheroeController,
  eliminarSuperheroePorIdController,
  eliminarSuperheroePorNombreController,
  mostrarFormularioEdicion,
  editarSuperheroeController,
  mostrarFormularioCreacion,
} from "../controllers/superheroesController.mjs";

import { validationDataSuperHeros } from "../middlewares/validationRules.mjs";
import { handleValidationErrors } from "../middlewares/errorMiddleware.mjs";
import { title } from "process";
import superHero from "../models/SuperHero.mjs";
import { transformarCamposArray } from "../middlewares/transformarCamposArray.mjs";

const router = express.Router();
// ------------------------------------------------------------------------------------------------ //


// RUTA PARA RENDERIZAR LA PAGINA PRINCIPAL
router.get("/heroes/index", (req, res) => {
  res.render("index", {
    title: "Página Principal",
    navbarLinks: [
      { href: "/api/desa/heroes/index", icon: "/icons/home.svg", text: "Inicio" },
      { href: "/api/desa/heroes/dashboard", icon: "/icons/hero.svg", text: "Dashboard" },
      { href: "/api/desa/heroes/crear", icon: "/icons/add.svg", text: "Crear Héroe" },
      { href: "/api/desa/heroes/acercadenosotros", icon: "/icons/add.svg", text: "Acerca de Nosotros" },
      { href: "/api/desa/heroes/contacto", icon: "/icons/add.svg", text: "Contacto" },
    ],
  });
});



// RUTA PARA OBTENER TODOS LOS DATOS Y MOSTRARLO EN EL DASHBOARD
router.get('/heroes/dashboard', obtenerTodosLosSuperheroesController);

// RUTA PARA CREAR UN NUEVO SUPERHEROE
router.get('/heroes/crear', mostrarFormularioCreacion);
router.post('/heroes/crear', transformarCamposArray, validationDataSuperHeros(), handleValidationErrors, crearNuevoSuperheroeController);

// RUTA PARA EDITAR UN SUPERHEROE
router.get('/heroes/:id/editar', mostrarFormularioEdicion);
router.put('/heroes/:id/editar', transformarCamposArray, validationDataSuperHeros(), handleValidationErrors, editarSuperheroeController);

// // RUTA PARA ELIMINAR UN SUPERHEROE
router.delete("/heroes/:id", eliminarSuperheroePorIdController);



export default router;
