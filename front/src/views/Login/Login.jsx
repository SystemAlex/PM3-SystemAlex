import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { validateLogin } from '../../helpers/validate';
import './Login.css';
import { useUser } from '../../context/UserContext';

const Login = () => {
  const { setUser } = useUser();
  const initialValues = { username: "", password: "" };
  const [formData, setFormData] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setErrors(validateLogin(formData));
  }, [formData]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (Object.keys(errors).length === 0) {
      setIsSubmitting(true);
      try {
        const user = await loginUser(formData);
        setUser(user);
        localStorage.setItem('user', JSON.stringify(user));
        navigate('/MenuAppointment');
      } catch (error) {
        alert(error);
      } finally {
        setIsSubmitting(false);
      }
    } else {
      alert("Por favor corrige los errores antes de continuar.");
    }
  };

  const loginUser = async (data) => {
    try {
      const response = await axios.post("http://localhost:3000/users/login", data);
      if (response.status === 200) {
        return response.data.user;
      }
    } catch (error) {
      throw error.response?.data?.message || "Error al intentar iniciar sesión";
    }
  };

  return (
    <div className="login">
      <h1 className="login__title">Ingreso</h1>
      <form className="login__form" onSubmit={handleSubmit}>
        <div className="login__field">
          <label className="login__label">Username:</label>
          <input
            type="text"
            name="username"
            className="login__input"
            placeholder="mail@mail.com"
            value={formData.username}
            onChange={handleChange}
          />
          {errors.username && <span className="login__error">{errors.username}</span>}
        </div>
        <div className="login__field">
          <label className="login__label">Password:</label>
          <input
            type="password"
            name="password"
            className="login__input"
            placeholder="********"
            value={formData.password}
            onChange={handleChange}
          />
          {errors.password && <span className="login__error">{errors.password}</span>}
        </div>
        <button type="submit" className="login__button" disabled={isSubmitting}>
          {isSubmitting ? "Cargando..." : "Ingreso"}
        </button>
        <br />
        <button
          type="button"
          onClick={() => navigate('/register')}
          className="login__button"
        >
          Registrarse
        </button>
      </form>
    </div>
  );
};

export default Login;
