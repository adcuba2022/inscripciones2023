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
exports.comprobarCi = exports.updateMinistros = exports.createMinistros = exports.deleteMinistro = exports.getMinistroId = exports.getMinistros = void 0;
const express_1 = require("express");
const uuid_1 = require("uuid");
const db_1 = require("../db");
const orderRouter = (0, express_1.Router)();
const getMinistros = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const [rows] = yield db_1.pool.query("SELECT * FROM ministro");
        res.json(rows);
    }
    catch (error) {
        return res.status(500).json({ message: error });
    }
});
exports.getMinistros = getMinistros;
const getMinistroId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const rows = yield db_1.pool.query("SELECT * FROM ministro WHERE id = ?", [id]);
        if (rows.length <= 0) {
            return res.status(404).json({ message: "Algo ha ido mal, inténtelo nuevamente." });
        }
        res.json(rows[0]);
    }
    catch (error) {
        return res.status(500).json({ message: "Algo ha ido mal, inténtelo nuevamente." });
    }
});
exports.getMinistroId = getMinistroId;
const deleteMinistro = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const [rows] = yield db_1.pool.query("DELETE FROM ministro WHERE id = ?", [id]);
        if (rows.affectedRows <= 0) {
            return res.status(404).json({ message: "Ministro no aparece" });
        }
        res.sendStatus(204);
    }
    catch (error) {
        return res.status(500).json({ message: "Something goes wrong" });
    }
});
exports.deleteMinistro = deleteMinistro;
const createMinistros = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log(req.body);
        const id = (0, uuid_1.v4)();
        const { nombre, ci, genero, email, celular, categoria, funciones, distrito, provincia, presbiterio, iglesia, matrimonio, hospedaje, ci_conyugue } = req.body;
        console.log('ci_req:', ci);
        const [result] = yield db_1.pool.query("SELECT * FROM ministro WHERE ci = ?", [ci]);
        console.log('1er_rows: ', result[0]);
        if (result.length > 0) {
            return res.status(302).json({ message: `"Ya el ministro ${nombre} con ci:${ci} está inscrito."` });
        }
        const [rows] = yield db_1.pool.query("INSERT INTO ministro (nombre, ci, genero, email, celular, categoria, funciones, distrito, provincia, presbiterio, iglesia, matrimonio, hospedaje, ci_conyugue) VALUES (?, ?, ?, ?,?, ?, ?, ?, ?,?, ?, ?, ?, ?)", [nombre, ci, genero, email, celular, categoria, funciones, distrito, provincia, presbiterio, iglesia, matrimonio, hospedaje, ci_conyugue]);
        console.log('2er_rows: ', rows['affectedRows']);
        res.status(201).json(rows);
    }
    catch (error) {
        console.log('error**:', error);
        return res.status(500).json({ message: error });
    }
});
exports.createMinistros = createMinistros;
const updateMinistros = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log(req.params);
        console.log(req.body);
        const { id } = req.params;
        const { nombre, ci, sexo, ci_conyugue } = req.body;
        const [result] = yield db_1.pool.query("UPDATE Ministros SET \
      nombre = IFNULL(?, nombre),\
      ci = IFNULL(?, ci), \
      sexo = IFNULL(?, sexo), \
      ci_conyugue = IFNULL(?, ci_conyugue) \
      WHERE id = ?", [nombre, ci, sexo, ci_conyugue, id]);
        if (result.affectedRows === 0)
            return res.status(404).json(result); //({ message: "Ministros not found" });
        const [rows] = yield db_1.pool.query("SELECT * FROM Ministros WHERE id = ?", [
            id,
        ]);
        res.json(rows[0]);
    }
    catch (error) {
        return res.status(500).json({ error });
    }
});
exports.updateMinistros = updateMinistros;
const comprobarCi = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { ci } = req.params;
        const [result] = yield db_1.pool.query("SELECT `nombre`, ci FROM ministro WHERE ci = ?", [ci]);
        console.log('1er_rows: ', result[0]);
        if (result.length > 0) {
            return res.status(302).json({ message: `"Ya el ministro ${result[0].nombre} con ci:${ci} está inscrito."` });
        }
        res.status(201).json({ message: "Este # CI no se ha inscrito aún" });
    }
    catch (error) {
        console.log('error**:', error);
        return res.status(500).json({ message: error });
    }
});
exports.comprobarCi = comprobarCi;
