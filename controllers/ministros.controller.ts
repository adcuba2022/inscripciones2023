import { Router, Response, Request } from "express";
import { ResultSetHeader } from "mysql2/promise";
import { v4 as uuidv4 } from 'uuid';
import {pool }from "../db";

const orderRouter = Router();

export const getMinistros = async (req: Request, res: Response) => {
  try {
    const [rows] = await pool.query("SELECT * FROM ministro");
    res.json(rows);
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};

export const getMinistroId = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const rows = await pool.query("SELECT * FROM ministro WHERE id = ?", [id]);

    if (rows.length <= 0) {
      return res.status(404).json({ message: "Algo ha ido mal, inténtelo nuevamente." });
    }

    res.json(rows[0]);
  } catch (error) {
    return res.status(500).json({ message: "Algo ha ido mal, inténtelo nuevamente." });
  }
};

export const deleteMinistro = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const [rows]: any = await pool.query("DELETE FROM ministro WHERE id = ?", [id]);

    if (rows.affectedRows <= 0) {
      return res.status(404).json({ message: "Ministro no aparece" });
    }

    res.sendStatus(204);
  } catch (error) {
    return res.status(500).json({ message: "Something goes wrong" });
  }
};

export const createMinistros = async (req: Request, res: Response) => {
  try {
    console.log(req.body);
    const id = uuidv4();
    const { nombre, ci, genero, email, celular, categoria, funciones, distrito, provincia, presbiterio, iglesia, matrimonio, hospedaje, ci_conyugue} = req.body;
    console.log('ci_req:', ci);
    const [result]:any = await pool.query("SELECT * FROM ministro WHERE ci = ?", [ci]);
    console.log('1er_rows: ',result[0]);

    if (result.length > 0 ){
      return res.status(302).json({message: `"Ya el ministro ${nombre} con ci:${ci} está inscrito."`});
    }

    const [rows]:any = await pool.query(
      "INSERT INTO ministro (nombre, ci, genero, email, celular, categoria, funciones, distrito, provincia, presbiterio, iglesia, matrimonio, hospedaje, ci_conyugue) VALUES (?, ?, ?, ?,?, ?, ?, ?, ?,?, ?, ?, ?, ?)",
      [nombre, ci, genero, email, celular, categoria, funciones, distrito, provincia, presbiterio, iglesia, matrimonio, hospedaje, ci_conyugue]
    );
    console.log('2er_rows: ',rows['affectedRows']);

    res.status(201).json( rows );
  } catch (error) {
    console.log('error**:',error)
    return res.status(500).json({ message: error });
  }
};

export const updateMinistros = async (req: Request, res: Response) => {
  try {
    console.log(req.params);
    console.log(req.body);
    const { id } = req.params;
    const { nombre, ci, sexo, ci_conyugue } = req.body;

    const [result]:any = await pool.query(
      "UPDATE Ministros SET \
      nombre = IFNULL(?, nombre),\
      ci = IFNULL(?, ci), \
      sexo = IFNULL(?, sexo), \
      ci_conyugue = IFNULL(?, ci_conyugue) \
      WHERE id = ?",
      [nombre, ci, sexo, ci_conyugue, id]
    );

    if (result.affectedRows === 0)
      return res.status(404).json(result);//({ message: "Ministros not found" });

    const [rows]:any = await pool.query("SELECT * FROM Ministros WHERE id = ?", [
      id,
    ]);

    res.json(rows[0]);
  } catch (error) {
    return res.status(500).json({ error });
  }
};

export const comprobarCi = async (req: Request, res: Response) => {
  try {
    const { ci } = req.params;

    const [result]:any = await pool.query("SELECT `nombre`, ci FROM ministro WHERE ci = ?", [ci]);
    console.log('1er_rows: ',result[0]);

    if (result.length > 0 ){
      return res.status(302).json({message: `"Ya el ministro ${result[0].nombre} con ci:${ci} está inscrito."`});
    }

    res.status(201).json( {message:"Este # CI no se ha inscrito aún"} );
  } catch (error) {
    console.log('error**:',error)
    return res.status(500).json({ message: error });
  }
};
