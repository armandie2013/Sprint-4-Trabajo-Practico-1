import SuperHero from "../models/SuperHero.mjs";
import IRepository from "./IRepository.mjs";

class SuperHeroRepository extends IRepository {
  async obtenerPorId(id) {
    return await SuperHero.findById(id);
  }
  async obtenerTodos() {
    return await SuperHero.find({});
  }
  async buscarPorAtributo(atributo, valor) {
    return await SuperHero.find({ [atributo]: valor });

    // Alternativa más clara: //
    /*const busquedaAtributoValor = {};
    busquedaAtributoValor[atributo] = valor;
    return await SuperHero.find(busquedaAtributoValor);*/
  }
  async obtenerMayoresDe30() {
    // FILTRADO POR METODO DE CARGA EN MEMORIA //

    const superheroes = await SuperHero.find({});
    return superheroes.filter((superheroe) => superheroe.edad > 30);

    // FILTRADO POR METODO DE LA BASE DE DATOS MAS EFECTIVO //
    /*
        return await SuperHero.find({ edad: { $gt: 30 } });
        */
  }

  // SPRINT 3 TP 1 //
  // CREAR E INSERTA SUPERHEROE //
  async insertarSuperheroe(datosSuperheroe) {
    console.log("Insertando en la base de datos:", datosSuperheroe);
    const nuevoHeroe = new SuperHero(datosSuperheroe);
    return await nuevoHeroe.save();
  }

  // ACTUALIZA UN SUPERHEROE //
  async actualizarSuperheroe(id, datosActualizar) {
    const heroeActualizado = await SuperHero.findByIdAndUpdate(
      id,
      datosActualizar,
      { new: true }
    );
    console.log(heroeActualizado);
    return heroeActualizado;
  }
  // ELIMINA UN SUPERHEROE POR ID //
  async eliminarSuperheroePorId(id) {
    const heroeEliminado = await SuperHero.findByIdAndDelete(id);
    if (!heroeEliminado) {
      throw new Error(`No se encontró un superhéroe con el ID: ${id}`);
    }
    console.log("Superhéroe eliminado:", heroeEliminado);
    return heroeEliminado;
  }

  async eliminarPorNombre(nombre) {
    const heroeEliminado = SuperHero.findOneAndDelete({
      nombreSuperHeroe: nombre,
    });
    console.log(heroeEliminado);
    return heroeEliminado;
  }
}

export default new SuperHeroRepository();
