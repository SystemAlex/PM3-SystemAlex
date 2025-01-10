import { useNavigate } from 'react-router-dom';
import './MenuAppointment.css';

const MenuAppointment = () => {
  const navigate = useNavigate();

  const handleNewAppointment = () => {
    navigate('/createAppointments'); 
  };

  const handleMyAppointments = () => {
    navigate('/appointments');
  };

  return (
    <div className="menu-appointment">
      <div className="menu-appointment__content">
        <h1 className="menu-appointment__title">Menú de Turnos</h1>
        <div className="menu-appointment__buttons">
          <button className="menu-appointment__button" onClick={handleNewAppointment}>
            Sacar Nuevo Turno
          </button>
          <button className="menu-appointment__button" onClick={handleMyAppointments}>
            Mis Turnos
          </button>
        </div>
      </div>
    </div>
  );
};

export default MenuAppointment;
