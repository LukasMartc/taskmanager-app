import pkg from "pg";
import { dbCredentials } from "./config.js";

const { Pool } = pkg;

const config = {
    user: dbCredentials.user,
    password: dbCredentials.password,
    host: dbCredentials.host,
    port: dbCredentials.port,
    database: dbCredentials.database
};

const db = new Pool(config);

export default db;