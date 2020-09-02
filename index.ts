//imports
import express from "express";

//objects
const server = express();
const port = process.env.PORT || 4000;

//server uses
server.use(express.json());

