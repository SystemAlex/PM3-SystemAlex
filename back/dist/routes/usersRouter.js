"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const usersControllers_1 = require("../controllers/usersControllers");
const usersRouter = (0, express_1.Router)();
// RUTAS / ENDPOINTS
// GET /users => Obtener el listado de todos los usuarios.
usersRouter.get("/", usersControllers_1.getAllUsers);
// GET /users/:id => Obtener el detalle de un usuario específico.
usersRouter.get("/:id", usersControllers_1.getUserById);
// POST /users/register => Registro de un nuevo usuario.
usersRouter.post("/register", usersControllers_1.register);
// POST /users/login => Login del usuario a la aplicación.
usersRouter.post("/login", usersControllers_1.login);
exports.default = usersRouter;
