"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const indexRouter_1 = __importDefault(require("./routes/indexRouter"));
const server = (0, express_1.default)();
//Middlewares de express
server.use((0, cors_1.default)());
server.use(express_1.default.json());
server.use(indexRouter_1.default);
exports.default = server;
