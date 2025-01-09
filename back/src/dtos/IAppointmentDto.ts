interface IAppointmentDto {
    date: string;
    time: string;
    status: "Active" | "Cancelled" | "Completed";
    userId: number;
    description: string
}

export default IAppointmentDto;