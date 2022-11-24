import { Request, Response } from "express";
import * as jwt from "jsonwebtoken";

const PASS_SEC = <string>process.env.PASS_SEC;

export const verifyToken = (req:Request|any , res: Response, next:any)=>{
    const heathers = req.headers.authorization;
    if (heathers) {
        const token = heathers.split(" ")[1];
        const json = jwt.verify(token, PASS_SEC, (err:any, user:any)=>{
            if(err) res.status(403).json("Token Inválido");
            req.user = user;
            next();
        })
    } else {
        return res.status(401).json("Ud. no Está Autenticado! Pongase en Contacto con el Administrador.")
    }
};

export const verifyTokenAndAuthorization = (req: Request|any, res: Response, next:any)=>{
    verifyToken(req, res, ()=>{
       
        if (req.user.id === req.params.id || req.user.isAdmin) {
            next();
        } else {
            res.status(403).json("No tiene permisos para realizar esta accion");
        }
    });
};

export const verifyTokenAndAdmin = (req: Request|any, res: Response, next:any)=>{
    verifyToken(req, res, ()=>{
        console.log(req.user);
        console.log(req);
        if (req.user.isAdmin) {
            next();
        } else {
            res.status(403).json("No tiene permisos para realizar esta accion");
        }
    });
};