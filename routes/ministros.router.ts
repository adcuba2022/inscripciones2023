import {Router} from 'express';
import { getMinistros, getMinistroId, createMinistros, deleteMinistro, updateMinistros, comprobarCi } from '../controllers/ministros.controller';

const ministroRouter = Router();

ministroRouter.get("/", getMinistros);
ministroRouter.get("/ci/:ci", comprobarCi);
ministroRouter.get("/:id", getMinistroId);
ministroRouter.delete("/:id", deleteMinistro);
ministroRouter.post("/", createMinistros);
ministroRouter.patch("/:id", updateMinistros);

export default ministroRouter;
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
