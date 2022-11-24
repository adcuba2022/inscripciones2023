import { Router, Response, Request } from "express";

import {pool} from "../db";

//const inscripcionesRouter = Router();

export const getInscripciones = async (req: Request, res: Response) => {
  try {
    const [rows] = await pool.query("SELECT `Inscripciones`.*, `ministro`.`nombre`,`ministro`.`ci`,`ministro`.`genero`,`ministro`.`email`,`ministro`.`celular`, `categoria`.`nombre` AS `categoria`, `funciones`.`nombre` AS `funcion`, `distritos`.`nombre` AS `deistrito`, `provincias`.`nombre` AS `nombre`, `presbiterios`.`nombre` AS `presbiterio` FROM `Inscripciones` LEFT JOIN `ministro` ON `Inscripciones`.`ministroId` = `ministro`.`id` LEFT JOIN `categoria` ON `ministro`.`categoria` = `categoria`.`id` LEFT JOIN `funciones` ON `ministro`.`funciones` = `funciones`.`id` LEFT JOIN `distritos` ON `ministro`.`distrito` = `distritos`.`id` LEFT JOIN `provincias` ON `ministro`.`provincia` = `provincias`.`id` LEFT JOIN `presbiterios` ON `ministro`.`presbiterio` = `presbiterios`.`id`; ");
    res.json(rows);
  } catch (error) {
    return res.status(500).json({ error });
  }
};

export const createInscripcion = async (req: Request, res: Response) => {
  try {
    console.log(req.body);

    const {id } = req.params;
    const {isInscrito, softdelete } = req.body;
    console.log('ci_req:', id);
    const [result]:any = await pool.query("UPDATE `Inscripciones` SET `isInscrito`=?,`softdelete`=? WHERE id=?; ", [isInscrito, softdelete,id]);
    console.log('1er_rows: ',result);

    if (result.affectedRows === 0)
      return res.status(404).json({ok:false,message:"No se encontro la inscripcion"});

    res.json({ok:true,message:"Actualizado con exito"});
  } catch (error) {
    console.log('error**:',error)
    return res.status(500).json({ message: error });
  }
};
