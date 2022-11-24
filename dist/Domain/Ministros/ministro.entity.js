"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Ministros = void 0;
const uuid_1 = require("uuid");
class Ministros {
    constructor(id, nombre, ci, genero, email, celular, categoria, funciones, distrito, provincia, presbiterio, iglesia, matrimonio, hospedaje, ci_conyugue) {
        this.id = id;
        this.nombre = nombre;
        this.ci = ci;
        this.genero = genero;
        this.email = email;
        this.celular = celular;
        this.categoria = categoria;
        this.funciones = funciones;
        this.distrito = distrito;
        this.provincia = provincia;
        this.presbiterio = presbiterio;
        this.iglesia = iglesia;
        this.matrimonio = matrimonio;
        this.hospedaje = hospedaje;
        this.ci_conyugue = ci_conyugue;
    }
    static Create(nombre, ci, genero, email, celular, categoria, funciones, distrito, provincia, presbiterio, iglesia, matrimonio, hospedaje, ci_conyugue) {
        const ministro = new Ministros((0, uuid_1.v4)(), nombre, ci, genero, email, celular, categoria, funciones, distrito, provincia, presbiterio, iglesia, matrimonio, hospedaje, ci_conyugue);
        return ministro;
    }
}
exports.Ministros = Ministros;
