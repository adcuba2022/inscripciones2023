"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = __importDefault(require("./server"));
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const ministros_router_1 = __importDefault(require("./routes/ministros.router"));
const inscripciones_router_1 = __importDefault(require("./routes/inscripciones.router"));
const auth2_1 = __importDefault(require("./routes/auth2"));
const server = new server_1.default();
//pool.getConnection;
/* mongoose.connect(<string>process.env.BD_local).then(()=>console.log("DB Connection Successfull"))
.catch((err)=>{
    console.log(err);
});  */
server.app.use((0, cors_1.default)());
server.app.use(express_1.default.json());
console.log('middleware');
server.app.use('/api/auth', auth2_1.default);
server.app.use('/api/ministros', ministros_router_1.default);
server.app.use('/api/inscripciones', inscripciones_router_1.default);
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
server.start(() => console.log(`Server running on port ${server.port}`));
