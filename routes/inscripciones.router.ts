import {Router} from 'express';
import { createInscripcion, getInscripciones } from '../controllers/inscripciones.controller';

const inscripcionesRouter = Router();

inscripcionesRouter.get("/", getInscripciones);
inscripcionesRouter.patch("/:id", createInscripcion);
/* inscripcionesRouter.get("/ci/:ci", comprobarCi);
inscripcionesRouter.get("/:id", getMinistroId);
inscripcionesRouter.delete("/:id", deleteMinistro);
inscripcionesRouter.patch("/:id", updateMinistros); */

export default inscripcionesRouter;
