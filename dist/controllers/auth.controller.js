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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginUser = exports.registerUser = void 0;
const crypto_js_1 = __importDefault(require("crypto-js"));
const jwt = __importStar(require("jsonwebtoken"));
const db_1 = require("../db");
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
const PASS_SEC = process.env.PASS_SEC;
const registerUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, email, isAdmin, isEjecutivo, distritoId, provinciaId, presbiterioId } = req.body;
    const password = crypto_js_1.default.AES.encrypt(req.body.password, PASS_SEC).toString();
    //CryptoJS.AES.encrypt('my message', 'secret key 123').toString();
    console.log(req.body);
    console.log(password);
    try {
        const [rows] = yield db_1.pool.query("INSERT INTO User (username, email, password, isAdmin, isEjecutivo, distritoId, provinciaId, presbiterioId ) VALUES (?, ?, ?, ?,?, ?, ?, ?);", [username, email, password, isAdmin, isEjecutivo, distritoId, provinciaId, presbiterioId]);
        console.log('2er_rows: ', rows['affectedRows']);
        if (rows.affectedRows === 0)
            return res.status(404).json({ ok: false, message: "No se registro el usuario" });
        res.json({ ok: true, message: "Registrado con éxito" });
    }
    catch (error) {
        res.status(500).json(error);
        console.log('problema en MySql: ', error);
    }
});
exports.registerUser = registerUser;
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //console.log('->',PASS_SEC);
    //console.log(req.body);
    const { email, password } = req.body;
    try {
        const [result] = yield db_1.pool.query("SELECT * FROM User WHERE email = ?", [email]);
        console.log(result[0]);
        if (result.length > 0) {
            const hashedPass = crypto_js_1.default.AES.decrypt(result[0].password, PASS_SEC);
            let db_password = hashedPass.toString(crypto_js_1.default.enc.Utf8);
            console.log('decrytp->', db_password, '-//-', req.body.password);
            db_password !== req.body.password && res.status(401).json({
                ok: false,
                message: "Credenciales Inválidas"
            });
            const accessToken = jwt.sign({ email: result[0].email,
                isAdmin: result[0].isAdmin,
                isEjecutivo: result[0].isEjecutivo }, PASS_SEC, { expiresIn: "1h" });
            const _a = result[0], { password } = _a, otherFields = __rest(_a, ["password"]);
            res.status(200).json(Object.assign(Object.assign({}, otherFields), { token: accessToken }));
        }
        res.status(401).json("Credenciales Invalidas");
    }
    catch (error) {
        res.status(500).json(error);
        console.log('problema en MySql: ', error);
    }
});
exports.loginUser = loginUser;
