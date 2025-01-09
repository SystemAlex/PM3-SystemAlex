interface IAppointment {
    id: number;
    date: Date;
    time: string;
    status: "Active" | "Cancelled" | "Completed";
    userId: number;
}

export default IAppointment;
  