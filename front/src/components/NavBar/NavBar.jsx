import { Link, useNavigate } from "react-router-dom";
import style from "./NavBar.module.css";
import logo from "../../assets/media/images/logo.jpg";
import { useUser } from "../../context/UserContext";

const NavBar = () => {
  const { user, setUser } = useUser();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("user")
    setUser({}); 
    navigate("/");
  };

  const handleOpenMenuAppointment = () => {
    navigate("/MenuAppointment");
  };

  return (
    <nav className={style.NavBarContainer}>
      <Link to="/" className={style.logoContainer}>
        <img src={logo} alt="Logo del Complejo Deportivo" className={style.imageLogo} />
        <p>Inicio</p>
      </Link>
      <h1 className={style.title}>SportCenter</h1>
      <div className={style.linksContainer}>
        {!user || Object.keys(user).length === 0 ? (
          <>
            <Link to="/login" className={style.menuAppointmentButton}>
              Ingreso
            </Link>
            <Link to="/register" className={style.menuAppointmentButton}>
              Registro
            </Link>
          </>
        ) : (
          <>
            <button onClick={handleLogout} className={style.logoutButton}>
              Logout
            </button>
            <button
              onClick={handleOpenMenuAppointment}
              className={style.menuAppointmentButton}
            >
              Abrir Menu de Turnos
            </button>
          </>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
