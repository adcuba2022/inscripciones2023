"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MySqlRepository = void 0;
const Repository_1 = require("../Infraestructura/Repository");
class MySqlRepository extends Repository_1.Repository {
    /**
     *
     */
    constructor(field) {
        super();
    }
    getAllAsync() {
        throw new Error("Method not implemented.");
    }
}
exports.MySqlRepository = MySqlRepository;
