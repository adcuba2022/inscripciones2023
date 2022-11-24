import { createPool } from "mysql2/promise";
import { DB_HOST,
         DB_USER,
         DB_PASSWORD,
         DB_PORT,
         DB_DATABASE, } from "./config";
         import { config } from "dotenv";
config();

/* export const pool = createPool({
   host: DB_HOST,
   user: DB_USER,
   password: DB_PASSWORD,
   port: <number>DB_PORT,
   database: DB_DATABASE,
 }); */
export const pool = createPool({
            host: DB_HOST,
            user: DB_USER,
            password: DB_PASSWORD,
            port: <number>DB_PORT,
            database: DB_DATABASE,
            waitForConnections:true
        });
