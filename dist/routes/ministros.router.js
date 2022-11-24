"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const ministros_controller_1 = require("../controllers/ministros.controller");
const ministroRouter = (0, express_1.Router)();
ministroRouter.get("/", ministros_controller_1.getMinistros);
ministroRouter.get("/ci/:ci", ministros_controller_1.comprobarCi);
ministroRouter.get("/:id", ministros_controller_1.getMinistroId);
ministroRouter.delete("/:id", ministros_controller_1.deleteMinistro);
ministroRouter.post("/", ministros_controller_1.createMinistros);
ministroRouter.patch("/:id", ministros_controller_1.updateMinistros);
exports.default = ministroRouter;
/* verifyTokenAndAdmin, */ /* async (req, res)=>{
  try {
      const users = await User.find();
      !users && res.status(200).json("No hay usuarios");
      res.status(200).json(users);
  } catch (error: any) {
      console.log(error);
      res.status(500).json(error.message);

  }
} */
