//imports
import express from "express";
import {usersRouter} from "./routes/users/usersRoute";

//objects
const server = express();
const port = process.env.PORT || 4000;

//server uses
server.use(express.json());
server.use("/api", usersRouter);

server.listen(port, () => {
    console.log(`Running at http://localhost:${port}`);
});