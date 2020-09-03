//imports
import express from "express";
import {usersRouter} from "./routes/users/usersRoute";
import session from "express-session";
import {db} from "./data/dbcofig";
const KnexSessionStore = require("connect-session-knex")(session);

//objects
const server = express();
const port = process.env.PORT || 4000;

//server uses
server.use(express.json());
server.use(session({
    resave: false, // avoid recreating sessions that have not changed
    saveUninitialized: false, // to comply with GDPR laws
    secret: "keep it secret, keep it safe", // cryptographically sign the cookie
    store: new KnexSessionStore({
        knex: db, // configured instance of knex
        createtable: true, // if the sessions table doesn't exist, create it automatically
    }),
}))
server.use("/api", usersRouter);

server.listen(port, () => {
    console.log(`Running at http://localhost:${port}`);
});