import express from "express";
import indexRouter from "./routes/indexRouter";

const server = express();

//Middlewares de express
server.use(express.json());
server.use(indexRouter);

export default server;