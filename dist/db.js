"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pool = void 0;
const promise_1 = require("mysql2/promise");
const config_1 = require("./config");
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
/* export const pool = createPool({
   host: DB_HOST,
   user: DB_USER,
   password: DB_PASSWORD,
   port: <number>DB_PORT,
   database: DB_DATABASE,
 }); */
exports.pool = (0, promise_1.createPool)({
    host: config_1.DB_HOST,
    user: config_1.DB_USER,
    password: 'Ismael06227Ipm*',
    port: config_1.DB_PORT,
    database: config_1.DB_DATABASE,
    waitForConnections: true
});
