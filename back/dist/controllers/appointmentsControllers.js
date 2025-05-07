"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.cancelAppointment = exports.schedule = exports.getAppointmentById = exports.getAllAppointments = void 0;
const appointmentsService_1 = require("../services/appointmentsService");
const getAllAppointments = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const appointments = yield (0, appointmentsService_1.getAllAppointmentsService)();
        res.status(200).json(appointments);
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
});
exports.getAllAppointments = getAllAppointments;
const getAppointmentById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const appointment = yield (0, appointmentsService_1.getAppointmentByIdService)(Number(id));
        res.status(200).json(appointment);
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
});
exports.getAppointmentById = getAppointmentById;
const schedule = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { date, time, status, userId, description } = req.body;
        const newAppointment = yield (0, appointmentsService_1.createAppointmentService)({
            date, time, status, userId, description
        });
        res.status(200).json(newAppointment);
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
    ;
});
exports.schedule = schedule;
const cancelAppointment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const newAppointment = yield (0, appointmentsService_1.cancelAppointmentService)(Number(id));
        res.status(200).json(newAppointment);
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
});
exports.cancelAppointment = cancelAppointment;
