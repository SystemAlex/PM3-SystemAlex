interface IAppointment {
    id: number;
    date: Date;
    time: string;
    status: "Activo" | "Cancelado" | "Completado";
    userId: number;
}

export default IAppointment;
  