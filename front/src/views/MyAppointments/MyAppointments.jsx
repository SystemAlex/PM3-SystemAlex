import { useEffect, useState, useContext } from "react";
import Appointments from "../../components/Appointments/Appointments";
import axios from "axios";
import "./MyAppointments.css";
import { UserContext } from "../../context/UserContext";
import { validateAppointment } from "../../helpers/validate";

const MyAppointments = () => {
  const { user } = useContext(UserContext);
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [cancelError, setCancelError] = useState('');
  const [cancelSuccess, setCancelSuccess] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/users/${user.id}`);
        setAppointments(response.data.appointments);
      } catch (error) {
        console.error(error);
        setError("Hubo un error al cargar tus turnos");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [user]);

  const handleCancelAppointment = async (appointmentId, appointmentDate) => {
    const appointmentValues = {
      date: appointmentDate,
      time: "",
      status: "Activo",
      description: "", 
      cancel: true,
    };

    const validationErrors = validateAppointment(appointmentValues);

    if (validationErrors.cancel) {
      setCancelError(validationErrors.cancel);
      setCancelSuccess('');
      return; 
    }

    try {
      const response = await axios.put(`http://localhost:3000/appointments/cancel/${appointmentId}`);

      if (response.status === 200) {
        setAppointments(prevAppointments =>
          prevAppointments.map(appointment =>
            appointment.id === appointmentId
              ? { ...appointment, status: "Cancelado" }
              : appointment
          )
        );

        setCancelSuccess('Turno cancelado exitosamente');
        setCancelError('');
        alert("Turno cancelado exitosamente");
      }
    } catch (error) {
      setCancelError('No se pudo cancelar el turno');
      setCancelSuccess('');
    }
  };

  const formatDate = (theDate) => {
    const date = new Date(theDate);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Los meses son 0-indexados
    const year = date.getFullYear();
    const formattedDate = `${day}-${month}-${year}`;
    return formattedDate;
  }

  return (
    <div className="appointments">
      <h1 className="appointments__title">Mis Turnos</h1>

      {loading ? (
        <div className="appointments__loading">Cargando...</div>
      ) : error ? (
        <div className="appointments__error">{error}</div>
      ) : appointments.length ? (
        <div className="appointments__list">
          {appointments.map((appointment) => (
            <div
              key={appointment.id}
              className={`appointments__list-item appointments__list-item--${appointment.status.toLowerCase()}`}
            >
              <Appointments
                date={formatDate(appointment.date)}
                description={appointment.description}
                status={appointment.status}
                time={appointment.time}
              />
              {appointment.status !== 'Cancelado' && (
                <button 
                  onClick={() => handleCancelAppointment(appointment.id, appointment.date)} 
                  className="appointments__button cancel"
                >
                  Cancelar este Turno
                </button>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className="appointments__no-appointments">No tienes turnos</div>
      )}

      {cancelError && <p className="appointments__error">{cancelError}</p>}
      {cancelSuccess && <p className="appointments__success">{cancelSuccess}</p>}
    </div>
  );
};

export default MyAppointments;
