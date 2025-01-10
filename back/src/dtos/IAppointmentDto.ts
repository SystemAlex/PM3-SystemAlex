interface IAppointmentDto {
    date: string;
    time: string;
    status: "Activo" | "Cancelado" | "Completado";
    userId: number;
    description: string
}

export default IAppointmentDto;