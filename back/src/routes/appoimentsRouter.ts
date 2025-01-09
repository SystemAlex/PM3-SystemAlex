import { Router } from "express";
import { cancelAppointment, getAllAppointments, getAppointmentById, schedule } from "../controllers/appointmentsControllers";

const appointmentRouter: Router = Router();

// GET /appointments => Obtener el listado de todos los turnos de todos los usuarios.
appointmentRouter.get("/", getAllAppointments);

// GET /:id => Obtener el detalle de un turno específico.
appointmentRouter.get("/:id", getAppointmentById);

// POST /appointment/schedule => Agendar un nuevo turno.
appointmentRouter.post("/schedule", schedule);

// PUT /appointment/cancel/:id => Cambiar el estatus de un turno a “cancelled”.
appointmentRouter.put("/cancel/:id", cancelAppointment);

export default appointmentRouter;
