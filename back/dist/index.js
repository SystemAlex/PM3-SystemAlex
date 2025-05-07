"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dataSource_1 = require("./config/dataSource");
const envs_1 = require("./config/envs");
const server_1 = __importDefault(require("./server"));
require("reflect-metadata");
dataSource_1.AppDataSource.initialize()
    .then(res => {
    console.log("Base de Datos Conectada");
    server_1.default.listen(envs_1.PORT, () => {
        console.log("Servidor ejecuntandose en el puerto", envs_1.PORT);
    });
});
