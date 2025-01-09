import { Request, Response } from 'express';

export const getAllUsers = (req: Request, res: Response) => {
    res.status(200).send("Se trae todos los usuarios");
}

export const getUserById = (req: Request, res: Response) => {
    res.status(200).send("Se trae un usuario en específico");
}

export const register = (req: Request, res: Response) => {
    res.status(200).send("Crea un usuario");
}

export const login = (req: Request, res: Response) => {
    res.status(200).send("Autentica al usuario");
}
