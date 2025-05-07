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
exports.cancelAppointmentService = exports.createAppointmentService = exports.getAppointmentByIdService = exports.getAllAppointmentsService = void 0;
const dataSource_1 = require("../config/dataSource");
const getAllAppointmentsService = () => __awaiter(void 0, void 0, void 0, function* () {
    const appointments = yield dataSource_1.appointmentModel.find();
    return appointments;
});
exports.getAllAppointmentsService = getAllAppointmentsService;
const getAppointmentByIdService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const foundAppointment = yield dataSource_1.appointmentModel.findOneBy({ id });
    if (!foundAppointment)
        throw Error("El turno no fue encontrado");
    return foundAppointment;
});
exports.getAppointmentByIdService = getAppointmentByIdService;
const createAppointmentService = (createAppointmentDto) => __awaiter(void 0, void 0, void 0, function* () {
    const newAppointment = yield dataSource_1.appointmentModel.create(createAppointmentDto);
    const user = yield dataSource_1.userModel.findOneBy({ id: createAppointmentDto.userId });
    newAppointment.user = user;
    yield dataSource_1.appointmentModel.save(newAppointment);
    return newAppointment;
});
exports.createAppointmentService = createAppointmentService;
const cancelAppointmentService = (appointmentId) => __awaiter(void 0, void 0, void 0, function* () {
    const foundAppointment = yield dataSource_1.appointmentModel.findOneBy({ id: appointmentId });
    if (!foundAppointment)
        throw Error("El turno no fue encontrado");
    foundAppointment.status = "Cancelado";
    yield dataSource_1.appointmentModel.save(foundAppointment);
    return foundAppointment;
});
exports.cancelAppointmentService = cancelAppointmentService;
