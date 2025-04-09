import express from 'express';
import { connectDB } from "./config/dbConfig.mjs";
import superHeroRoutes from './routes/superHeroRoutes.mjs'
import { obtenerTodosLosSuperheroesController } from './controllers/superheroesController.mjs';
import methodOverride from 'method-override';
import path from 'path';
import expressEjsLayouts from 'express-ejs-layouts';

const app = express();
const PORT = process.env.PORT || 3500;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


connectDB();


app.use(methodOverride('_method'));


// Motor de plantillas
app.set('view engine', 'ejs');
app.set('views', path.resolve('./views'));


// Copnfigurar express-ejs-layouts
app.use(expressEjsLayouts);
app.set('layout','layout');


// Servir archivos estaticos
app.use(express.static(path.resolve('./public')));






app.use('/api/desa', superHeroRoutes);




const listarRutas = (app) => {
    console.log("Rutas registradas:");
    app._router.stack.forEach((middleware) => {
      if (middleware.route) {
        console.log(`${Object.keys(middleware.route.methods).join(", ").toUpperCase()} ${middleware.route.path}`);
      } else if (middleware.name === "router") {
        middleware.handle.stack.forEach((nested) => {
          if (nested.route) {
            console.log(`${Object.keys(nested.route.methods).join(", ").toUpperCase()} ${nested.route.path}`);
          }
        });
      }
    });
  };
  
  listarRutas(app);





app.use((req, res) => {
    res.status(404).send({ mensaje: "Ruta no encontrada" });
});

app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
});