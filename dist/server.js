"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const config_1 = require("./config");
class Server {
    constructor() {
        this.port = config_1.PORT || 3000;
        this.app = (0, express_1.default)();
    }
    /**
     * start
     */
    start(callback) {
        this.app.listen(config_1.PORT, callback());
    }
}
exports.default = Server;
