"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const inscripciones_controller_1 = require("../controllers/inscripciones.controller");
const inscripcionesRouter = (0, express_1.Router)();
inscripcionesRouter.get("/", inscripciones_controller_1.getInscripciones);
inscripcionesRouter.patch("/:id", inscripciones_controller_1.createInscripcion);
/* inscripcionesRouter.get("/ci/:ci", comprobarCi);
inscripcionesRouter.get("/:id", getMinistroId);
inscripcionesRouter.delete("/:id", deleteMinistro);
inscripcionesRouter.patch("/:id", updateMinistros); */
exports.default = inscripcionesRouter;
