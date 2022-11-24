"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyTokenAndAdmin = exports.verifyTokenAndAuthorization = exports.verifyToken = void 0;
const jwt = __importStar(require("jsonwebtoken"));
const PASS_SEC = process.env.PASS_SEC;
const verifyToken = (req, res, next) => {
    const heathers = req.headers.authorization;
    if (heathers) {
        const token = heathers.split(" ")[1];
        const json = jwt.verify(token, PASS_SEC, (err, user) => {
            if (err)
                res.status(403).json("Token Inválido");
            req.user = user;
            next();
        });
    }
    else {
        return res.status(401).json("Ud. no Está Autenticado! Pongase en Contacto con el Administrador.");
    }
};
exports.verifyToken = verifyToken;
const verifyTokenAndAuthorization = (req, res, next) => {
    (0, exports.verifyToken)(req, res, () => {
        if (req.user.id === req.params.id || req.user.isAdmin) {
            next();
        }
        else {
            res.status(403).json("No tiene permisos para realizar esta accion");
        }
    });
};
exports.verifyTokenAndAuthorization = verifyTokenAndAuthorization;
const verifyTokenAndAdmin = (req, res, next) => {
    (0, exports.verifyToken)(req, res, () => {
        console.log(req.user);
        console.log(req);
        if (req.user.isAdmin) {
            next();
        }
        else {
            res.status(403).json("No tiene permisos para realizar esta accion");
        }
    });
};
exports.verifyTokenAndAdmin = verifyTokenAndAdmin;
