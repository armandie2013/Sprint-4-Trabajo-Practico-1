import {
  obtenerSuperheroePorId,
  obtenerTodosLosSuperheroes,
  buscarSuperheroesPorAtributo,
  obtenerSuperheroesMayoresDe30,
  crearNuevoSuperheroe,
  actualizarSuperheroe,
  eliminarSuperheroePorId,
  eliminarSuperheroePorNombre,
} from "../services/superheroesService.mjs";
import {
  renderizarSuperheroe,
  renderizarListaSuperheroes,
} from "../views/responseView.mjs";

import superHero from "../models/SuperHero.mjs";


export async function obtenerSuperheroePorIdController(req, res) {
  try {
    const { id } = req.params;
    const superheroe = await obtenerSuperheroePorId(id);
    if (!superheroe) {
      return res.status(404).send({ mensaje: "Superheroe no encontrado" });
    }
    const superheroeFormateado = renderizarSuperheroe(superheroe);
    res.status(200).json(superheroeFormateado);
  } catch (error) {
    res.status(500).send({
      mensaje: "Error al obtener el superheroe",
      error: error.message,
    });
  }
}

// FUNSION PARA OBTENER TODOS LOS SUPERHEROES

export const obtenerTodosLosSuperheroesController = async (req, res) => {
  try {
    const superheroes = await superHero.find();  
    
    res.render('dashboardPanel', {
      title: 'Dashboard de Superhéroes',
      superheroes,
      navbarLinks: [
      { href: "/api/desa/heroes/index", icon: "/icons/home.svg", text: "Inicio" },
      { href: "/api/desa/heroes/dashboard", icon: "/icons/hero.svg", text: "Dashboard" },
      { href: "/api/desa/heroes/crear", icon: "/icons/add.svg", text: "Crear Héroe" },
      { href: "/api/desa/heroes/acercadenosotros", icon: "/icons/add.svg", text: "Acerca de Nosotros" },
      { href: "/api/desa/heroes/contacto", icon: "/icons/add.svg", text: "Contacto" },
    ]
    });
  } catch (error) {
    res.status(500).send('Error al obtener los superhéroes');
  }
};

// FUNSION PARA BUSCAR POR ATRIBUTOS

export async function buscarSuperheroesPorAtributoController(req, res) {
  try {
    const { atributo, valor } = req.params;
    const superheroes = await buscarSuperheroesPorAtributo(atributo, valor);
    if (superheroes.length === 0) {
      return res
        .status(404)
        .send({ mensaje: "No se encontraron superheroes con ese atributo" });
    }
    const superheroeFormateados = renderizarListaSuperheroes(superheroes);
    res.status(200).json(superheroeFormateados);
  } catch (error) {
    res.status(500).send({
      mensaje: "Error al buscar los superheroes",
      error: error.message,
    });
  }
}

// FUNSION PARA BUSCAR MAYORES A 30
export async function obtenerSuperheroesMayoresDe30Controller(req, res) {
  try {
    const superheroes = await obtenerSuperheroesMayoresDe30();
    if (superheroes.length === 0) {
      return res
        .status(404)
        .send({ mensaje: "No se encontraron superheroes mayores de 30 años" });
    }
    const superheroeFormateados = renderizarListaSuperheroes(superheroes);
    res.status(200).json(superheroeFormateados);
  } catch (error) {
    res.status(500).send({
      mensaje: "Error al obtener superheroes mayores de 30",
      error: error.message,
    });
  }
}


// MOSTRAR FORMULARIO PARA CREAR

export function mostrarFormularioCreacion(req, res) {
  res.render('crearSuperheroe', {
    title: 'Crear Nuevo Superhéroe',
    navbarLinks: [
      { href: "/api/desa/heroes/index", icon: "/icons/home.svg", text: "Inicio" },
      { href: "/api/desa/heroes/dashboard", icon: "/icons/hero.svg", text: "Dashboard" },
      { href: "/api/desa/heroes/crear", icon: "/icons/add.svg", text: "Crear Héroe" },
      { href: "/api/desa/heroes/acercadenosotros", icon: "/icons/add.svg", text: "Acerca de Nosotros" },
      { href: "/api/desa/heroes/contacto", icon: "/icons/add.svg", text: "Contacto" },
    ]
  });
}


// CREAR SUPERHEROE //

export async function crearNuevoSuperheroeController(req, res) {
  try {
    console.log("Datos recibidos:", req.body);

    const {
      nombreSuperHeroe,
      nombreReal,
      edad,
      planetaOrigen,
      debilidad,
      poderes,
      aliados,
      enemigos,
      creador,
    } = req.body;

    const nuevoSuperheroe = {
      nombreSuperHeroe,
      nombreReal,
      edad,
      planetaOrigen,
      debilidad,
      poderes: Array.isArray(poderes)
        ? poderes
        : poderes.split(",").map((p) => p.trim()),
      aliados: Array.isArray(aliados)
        ? aliados
        : aliados.split(",").map((a) => a.trim()),
      enemigos: Array.isArray(enemigos)
        ? enemigos
        : enemigos.split(",").map((e) => e.trim()),
      creador,
    };

    const superheroeCreado = await crearNuevoSuperheroe(nuevoSuperheroe);
    console.log("Superhéroe creado con fecha:", superheroeCreado.createdAt);

    if (!superheroeCreado) {
      return res.status(404).send({ mensaje: "Error al crear el superhéroe" });
    }

    res.redirect("/api/desa/heroes/dashboard"); // Redirige al dashboard después de crear
  } catch (error) {
    res.status(500).send({
      mensaje: "Error al crear el nuevo superhéroe",
      error: error.message,
    });
  }
}


// ACTUALIZAR SUPERHEROE POR ID //

export async function actualizarSuperheroeController(req, res) {
  try {
    const { id } = req.params;
    const datosActualizar = req.body;

    console.log(id);
    console.log(typeof id);
    const superheroeActualizado = await actualizarSuperheroe(
      id,
      datosActualizar
    );

    if (!superheroeActualizado) {
      return res
        .status(404)
        .send({ mensaje: "No se contro el superheroe a actualizar" });
    }

    const superheroeFormateado = renderizarSuperheroe(superheroeActualizado);
    res.status(200).json(superheroeFormateado);
  } catch (error) {
    res.status(500).send({
      mensaje: "Error al actualizar el superhéroe",
      error: error.message,
    });
  }
}

// ELIMINAR SUPERHEROE POR ID //

export async function eliminarSuperheroePorIdController(req, res) {
  try {
    const { id } = req.params;
    const superheroeEliminado = await eliminarSuperheroePorId(id);

    if (!superheroeEliminado) {
      return res
        .status(404)
        .send({ mensaje: "Id de superhéroe no encontrado" });
    }

    // Enviar una redirección en lugar de JSON
    res.redirect("/api/desa/heroes/dashboard");
  } catch (error) {
    console.error("Error al eliminar el superhéroe:", error);
    res.status(500).send({
      mensaje: "Error al eliminar el superhéroe por ID",
      error: error.message,
    });
  }
}

// ELIMINAR POR NOMBRE //

export async function eliminarSuperheroePorNombreController(req, res) {
  try {
    const { nombre } = req.params;
    const superheroeEliminado = await eliminarSuperheroePorNombre(nombre);
    if (!superheroeEliminado) {
      return res
        .status(404)
        .send({ mensaje: "Nombre de superheroe no encontrado" });
    }
    const superheroeFormateado = renderizarSuperheroe(superheroeEliminado);
    res.status(200).json(superheroeFormateado);
  } catch (error) {
    res.status(500).send({
      mensaje: "Error al eliminar el superheroe por nombre",
      error: error.message,
    });
  }
}

// MOSTRAR EL FORMULARIO CON LOS DATOS ANTES DE LA EDICION

export async function mostrarFormularioEdicion(req, res) {
  try {
    const { id } = req.params;
    const superheroe = await obtenerSuperheroePorId(id);

    if (!superheroe) {
      return res.status(404).json({ mensaje: "Superhéroe no encontrado" });
    }

    res.render("editSuperhero", {
      title: 'Editar superheroe',
      superheroe,
      navbarLinks: [
      { href: "/api/desa/heroes/index", icon: "/icons/home.svg", text: "Inicio" },
      { href: "/api/desa/heroes/dashboard", icon: "/icons/hero.svg", text: "Dashboard" },
      { href: "/api/desa/heroes/crear", icon: "/icons/add.svg", text: "Crear Héroe" },
      { href: "/api/desa/heroes/acercadenosotros", icon: "/icons/add.svg", text: "Acerca de Nosotros" },
      { href: "/api/desa/heroes/contacto", icon: "/icons/add.svg", text: "Contacto" },
      ]
    });
  } catch (error) {
    console.error("Error al obtener superhéroe:", error);
    res.status(500).json({ mensaje: "Error al obtener superhéroe", error });
  }
}

// EDITA CUALQUIER CAMPO RECIBIENDO LOS DATOS DEL FORMULARIO

export const editarSuperheroeController = async (req, res) => {
  try {
    console.log("Solicitud recibida para editar:", req.params.id);
    console.log("Datos recibidos:", req.body);

    const { id } = req.params;
    const {
      nombreSuperHeroe,
      nombreReal,
      edad,
      planetaOrigen,
      debilidad,
      poderes,
      aliados,
      enemigos,
      creador,
    } = req.body;

    // Asegurarse de que poderes, aliados y enemigos sean arrays reales

    const updatedData = {
      nombreSuperHeroe,
      nombreReal,
      edad,
      planetaOrigen,
      debilidad,
      poderes: Array.isArray(poderes)
        ? poderes
        : poderes.split(",").map((p) => p.trim()),
      aliados: Array.isArray(aliados)
        ? aliados
        : aliados.split(",").map((a) => a.trim()),
      enemigos: Array.isArray(enemigos)
        ? enemigos
        : enemigos.split(",").map((e) => e.trim()),
      creador,
    };

    const updatedHero = await actualizarSuperheroe(id, updatedData);

    if (!updatedHero) {
      return res.status(404).send("Superhéroe no encontrado");
    }

    res.redirect("/api/desa/heroes/dashboard"); // Redirige al dashboard tras la edición
  } catch (error) {
    console.error("Error al editar el superhéroe:", error);
    res.status(500).send("Error interno del servidor");
  }
};
