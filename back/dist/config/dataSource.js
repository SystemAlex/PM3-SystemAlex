"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.appointmentModel = exports.credentialModel = exports.userModel = exports.AppDataSource = void 0;
const typeorm_1 = require("typeorm");
const envs_1 = require("./envs");
const Appointment_1 = __importDefault(require("../entities/Appointment"));
const Credential_1 = __importDefault(require("../entities/Credential"));
const User_1 = __importDefault(require("../entities/User"));
exports.AppDataSource = new typeorm_1.DataSource({
    type: "postgres",
    host: envs_1.DB_HOST || "localhost",
    port: envs_1.DB_PORT || 5432,
    username: envs_1.DB_USERNAME,
    password: envs_1.DB_PASSWORD,
    database: envs_1.DB_NAME,
    synchronize: true,
    logging: true,
    entities: [Appointment_1.default, Credential_1.default, User_1.default],
    subscribers: [],
    migrations: [],
});
exports.userModel = exports.AppDataSource.getRepository(User_1.default);
exports.credentialModel = exports.AppDataSource.getRepository(Credential_1.default);
exports.appointmentModel = exports.AppDataSource.getRepository(Appointment_1.default);
