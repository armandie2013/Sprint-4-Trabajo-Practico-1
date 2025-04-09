// ESTABLECE LA CONEXION CON MONGOODB //

import mongoose from "mongoose";

export async function connectDB() {
  try {
    await mongoose.connect(
      "mongodb+srv://Grupo-05:grupo05@cursadanodejs.ls9ii.mongodb.net/Node-js"
    );
    console.log("Conexión exitosa a MongoDB");
  } catch (error) {
    console.error("Error al conectar a MongoDB:", error);
    process.exit(1);
  }
}
