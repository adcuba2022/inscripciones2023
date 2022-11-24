"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createInscripcion = exports.getInscripciones = void 0;
const db_1 = require("../db");
//const inscripcionesRouter = Router();
const getInscripciones = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const [rows] = yield db_1.pool.query("SELECT `Inscripciones`.*, `ministro`.`nombre`,`ministro`.`ci`,`ministro`.`genero`,`ministro`.`email`,`ministro`.`celular`, `categoria`.`nombre` AS `categoria`, `funciones`.`nombre` AS `funcion`, `distritos`.`nombre` AS `deistrito`, `provincias`.`nombre` AS `nombre`, `presbiterios`.`nombre` AS `presbiterio` FROM `Inscripciones` LEFT JOIN `ministro` ON `Inscripciones`.`ministroId` = `ministro`.`id` LEFT JOIN `categoria` ON `ministro`.`categoria` = `categoria`.`id` LEFT JOIN `funciones` ON `ministro`.`funciones` = `funciones`.`id` LEFT JOIN `distritos` ON `ministro`.`distrito` = `distritos`.`id` LEFT JOIN `provincias` ON `ministro`.`provincia` = `provincias`.`id` LEFT JOIN `presbiterios` ON `ministro`.`presbiterio` = `presbiterios`.`id`; ");
        res.json(rows);
    }
    catch (error) {
        return res.status(500).json({ error });
    }
});
exports.getInscripciones = getInscripciones;
const createInscripcion = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log(req.body);
        const { id } = req.params;
        const { isInscrito, softdelete } = req.body;
        console.log('ci_req:', id);
        const [result] = yield db_1.pool.query("UPDATE `Inscripciones` SET `isInscrito`=?,`softdelete`=? WHERE id=?; ", [isInscrito, softdelete, id]);
        console.log('1er_rows: ', result);
        if (result.affectedRows === 0)
            return res.status(404).json({ ok: false, message: "No se encontro la inscripcion" });
        res.json({ ok: true, message: "Actualizado con exito" });
    }
    catch (error) {
        console.log('error**:', error);
        return res.status(500).json({ message: error });
    }
});
exports.createInscripcion = createInscripcion;
