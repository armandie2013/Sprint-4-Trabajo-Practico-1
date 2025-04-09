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
  editarSuperheroeController
} from "../controllers/superheroesController.mjs";

import { validationDataSuperHeros } from "../middlewares/validationRules.mjs";
import { handleValidationErrors } from "../middlewares/errorMiddleware.mjs";
import { title } from "process";

const router = express.Router();
// ------------------------------------------------------------------------------------------------ //
// HABILITAR PARA QUE FUNCIONE //
// ENDPOINT SPRINT 2 FINAL //

// router.get("/heroes", obtenerTodosLosSuperheroesController);
// router.get("/heroes/:id", obtenerSuperheroePorIdController);
// router.get("/heroes/buscar/:atributo/:valor", buscarSuperheroesPorAtributoController);
// router.get("/heroes/edad/mayores-30", obtenerSuperheroesMayoresDe30Controller);

// ENDPOINT SPRINT 2 FINAL //
// ------------------------------------------------------------------------------------------------ //


// ------------------------------------------------------------------------------------------------ //
// HABILITAR PARA QUE FUNCIONE //
// ENDPOINT SPRINT 3 TRABAJO PRACTICO 1 INICIO //

// router.get("/heroes", obtenerTodosLosSuperheroesController);
// router.post("/heroes/crear", crearNuevoSuperheroeController);
// router.put("/heroes/actualizar/:id", actualizarSuperheroeController);
// router.delete("/heroes/eliminar/:id", eliminarSuperheroePorIdController);
// router.delete("/heroes/eliminar/nombre/:nombre", eliminarSuperheroePorNombreController);

// ENDPOINT SPRINT 3 TRABAJO PRACTICO 1 FINAL //
// ------------------------------------------------------------------------------------------------ //


// ------------------------------------------------------------------------------------------------ //
// HABILITAR PARA QUE FUNCIONE //
// ENDPOINT SPRINT 3 TRABAJO PRACTICO 2 INICIO //

// router.post("/heroes/crear", validationDataSuperHeros(), handleValidationErrors, crearNuevoSuperheroeController);
// router.put("/heroes/actualizar/:id", validationDataSuperHeros(), handleValidationErrors, actualizarSuperheroeController);

// ENDPOINT SPRINT 3 TRABAJO PRACTICO 2 FINAL //
// ------------------------------------------------------------------------------------------------ //


// ------------------------------------------------------------------------------------------------ //
// HABILITAR PARA QUE FUNCIONE //
// ENDPOINT SPRINT 3 TRABAJO PRACTICO 3 INICIO //


// Ruta de pueba
router.get('/test', (req, res) => {
  res.send('Ruta de prueba funcionando');
});



// RUTA PARA OBTENER TODOS LOS DATOS Y MOSTRARLO EN EL DASHBOARD
router.get('/heroes/dashboard', obtenerTodosLosSuperheroesController);
// router.get('/heroes/crear', (req, res) => {
//   res.render('addSuperhero');
// });

// RUTA PARA CREAR UN NUEVO SUPERHEROE
router.post('/heroes/crear', validationDataSuperHeros(), handleValidationErrors, crearNuevoSuperheroeController);

// RUTA PARA OBTENER EL FORMULARIO CON LOS DATOS DE EDICION
router.get('/heroes/:id/editar',  mostrarFormularioEdicion);

// RUTA PARA PROCESAR LA EDICION
router.put('/heroes/:id/editar', validationDataSuperHeros(), handleValidationErrors, editarSuperheroeController);

// RUTA PARA ELIMINAR UN SUPERHEROE
router.delete('/heroes/:id', eliminarSuperheroePorIdController);


// RUTA PARA RENDERIZAR LA PAGINA PRINCIPAL
router.get('/heroes/index', (req, res) => {
  res.render('index', {
    title: 'Página Principal',
    navbarLinks: [
      { href: '/api/desa', icon: '/icons/home.svg', text: 'Inicio' },
      { href: '/api/desa/heroes', icon: '/icons/hero.svg', text: 'Héroes' },
      { href: '/api/desa/heroes/crear', icon: '/icons/add.svg', text: 'Crear Héroe' }
    ]
  });
});

// RUTA PARA RENDERIZAR EL FORMULARIO DE CREACIÓN
router.get('/heroes/crear', (req, res) => {
  res.render('crearSuperheroe', {
    title: 'Crear Nuevo Héroe',
    navbarLinks: [
      { href: '/', icon: '/icons/home.svg', text: 'Inicio' },
      { href: '/heroes', icon: '/icons/hero.svg', text: 'Héroes' },
      { href: '/api/desa/heroes/crear', icon: '/icons/add.svg', text: 'Crear Héroe' }
    ]
  });
});






export default router;
