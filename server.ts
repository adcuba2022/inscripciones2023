import express from "express";
import { PORT } from "./config";

export default class Server {
    public app : express.Application;
    public port  = PORT ||3000;

    constructor () {
        this.app = express();
    }

    /**
     * start
     */
    public start(callback: Function) {
        this.app.listen(PORT,callback()) ;   
    }
}