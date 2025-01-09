import { Request, Response } from 'express';

export const getAllAppointments = (req: Request, res: Response) => {
    res.status(200).send("Se trae todos los turnos");
}

export const getAppointmentById = (req: Request, res: Response) => {
    res.status(200).send("Se trae el detalle de un turno en específico");
}

export const schedule = (req: Request, res: Response) => {
    res.status(200).send("Crea un nuevo turno");
}

export const cancelAppointment = (req: Request, res: Response) => {
    res.status(200).send("Cancela un turno");
}
