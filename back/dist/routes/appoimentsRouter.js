"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const appointmentsControllers_1 = require("../controllers/appointmentsControllers");
const appointmentRouter = (0, express_1.Router)();
// GET /appointments => Obtener el listado de todos los turnos de todos los usuarios.
appointmentRouter.get("/", appointmentsControllers_1.getAllAppointments);
// GET /:id => Obtener el detalle de un turno específico.
appointmentRouter.get("/:id", appointmentsControllers_1.getAppointmentById);
// POST /appointment/schedule => Agendar un nuevo turno.
appointmentRouter.post("/schedule", appointmentsControllers_1.schedule);
// PUT /appointment/cancel/:id => Cambiar el estatus de un turno a “cancelled”.
appointmentRouter.put("/cancel/:id", appointmentsControllers_1.cancelAppointment);
exports.default = appointmentRouter;
