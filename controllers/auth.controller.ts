import { Response, Request } from "express";
import CryptoJS from "crypto-js";
import * as jwt from "jsonwebtoken";
import {pool} from "../db";
import { config } from "dotenv";
config();

const PASS_SEC = <string>process.env.PASS_SEC;

export const registerUser = async (req:Request, res:Response)=>{
  const {username,email,isAdmin,isEjecutivo,distritoId,provinciaId,presbiterioId
  }=req.body;

  const password = CryptoJS.AES.encrypt(req.body.password,PASS_SEC).toString();
  //CryptoJS.AES.encrypt('my message', 'secret key 123').toString();
  console.log(req.body);
  console.log(password);
  try {
    const [rows]:any = await pool.query(
    "INSERT INTO User (username, email, password, isAdmin, isEjecutivo, distritoId, provinciaId, presbiterioId ) VALUES (?, ?, ?, ?,?, ?, ?, ?);",
    [username,email,password,isAdmin,isEjecutivo,distritoId,provinciaId,presbiterioId]);

    console.log('2er_rows: ',rows['affectedRows']);

    if (rows.affectedRows === 0)
      return res.status(404).json({ok:false,message:"No se registro el usuario"});

    res.json({ok:true,message:"Registrado con éxito"});
  } catch (error) {
      res.status(500).json(error);
      console.log('problema en MySql: ',error);
  }
}

export const loginUser = async (req:Request, res:Response)=>{
  //console.log('->',PASS_SEC);
  //console.log(req.body);
  const {email, password} = req.body;

  try {
    const [result]:any = await pool.query("SELECT * FROM User WHERE email = ?", [email]);
  console.log(result[0]);

  if (result.length > 0){
    const hashedPass = CryptoJS.AES.decrypt(
        result[0].password,
        PASS_SEC
    );
    let db_password = hashedPass.toString(CryptoJS.enc.Utf8);
    console.log('decrytp->',db_password,'-//-',req.body.password);
    db_password !== req.body.password && res.status(401).json({
        ok: false,
        message: "Credenciales Inválidas"
    });

    const accessToken = jwt.sign(
        {email:result[0].email,
        isAdmin:result[0].isAdmin,
        isEjecutivo:result[0].isEjecutivo},
        PASS_SEC,
        {expiresIn:"1h"}
    );

    const {password,...otherFields} = result[0];
    res.status(200).json({
        ...otherFields,
        token:accessToken
    });
  }
  res.status(401).json("Credenciales Invalidas");


  } catch (error) {
      res.status(500).json(error);
      console.log('problema en MySql: ',error);
  }
}
