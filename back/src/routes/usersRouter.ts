import { Router } from "express";
import { getAllUsers, getUserById, login, register } from "../controllers/usersControllers";

const usersRouter: Router = Router();

// RUTAS / ENDPOINTS
// GET /users => Obtener el listado de todos los usuarios.
usersRouter.get("/", getAllUsers);

// GET /users/:id => Obtener el detalle de un usuario específico.
usersRouter.get("/:id", getUserById);

// POST /users/register => Registro de un nuevo usuario.
usersRouter.post("/register", register);

// POST /users/login => Login del usuario a la aplicación.
usersRouter.post("/login", login);

export default usersRouter;
