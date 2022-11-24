import Server from "./server";
import cors from "cors";
import express from "express";
import {pool} from "./db";
import ministrosRouter from "./routes/ministros.router";
import inscripcionesRouter from "./routes/inscripciones.router";
import authRouter from "./routes/auth2";


const server = new Server();
//pool.getConnection;

/* mongoose.connect(<string>process.env.BD_local).then(()=>console.log("DB Connection Successfull"))
.catch((err)=>{
    console.log(err);
});  */
server.app.use(cors());
server.app.use(express.json());
console.log('middleware');

server.app.use('/api/auth', authRouter);
server.app.use('/api/ministros', ministrosRouter);
server.app.use('/api/inscripciones', inscripcionesRouter);

/* server.app.use(async (req, res) => {
    try {
      const [rows] = await ConnectionDB.pool.execute(`SELECT * FROM ${nameof(Ministros)}`);
      console.log(rows);
      //res.json(fields.map(m=>m.name));
      res.json(rows);
    } catch (error) {
        console.log(error);
      return res.status(500).json({ message: "Something goes wrong" });
    }
  }); */


/* server.app.use('/api/auth', authRouter);
server.app.use('/api/tienda', tiendaRouter);
server.app.use('/api/inventario', inventarioRouter);
server.app.use('/api/almacen', almacenRouter);
server.app.use('/api/order', orderRouter); */

server.start(()=>console.log(`Server running on port ${server.port}`));

