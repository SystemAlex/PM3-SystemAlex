import { useNavigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { validateRegister } from '../../helpers/validate';
import axios from 'axios';
import './Register.css';

const Register = () => {
  const navigate = useNavigate(); 

  const posData = async (formData) => {
    try {
      const response = await axios.post("http://localhost:3000/users/register", formData);
      if (response.status === 200) {
        alert("El usuario se registró correctamente");
        navigate("/login");
        return true; 
      }
    } catch (error) {
      console.error(error);
      alert("El usuario no pudo registrarse: " + error.request.responseText);
      return false; 
    }
  };

  return (
    <div className="register">
      <h1 className="register__title">Registro</h1>
      <Formik
        initialValues={{ email: '', password: '', name: '', birthdate: '', nDni: '' }}
        validate={validateRegister}
        onSubmit={async (values, { setSubmitting, resetForm }) => {
          const success = await posData(values);
          if (success) {
            resetForm();
          }
          setSubmitting(false);
        }}
      >
        {({ isSubmitting, errors }) => (
          <Form className="register__form">
            <div className="register__field">
              <label className="register__label">Nombre</label>
              <Field type="text" name="name" className="register__input" />
              <ErrorMessage name="name" component="div" className="register__error" />
            </div>

            <div className="register__field">
              <label className="register__label">Email</label>
              <Field type="email" name="email" className="register__input" />
              <ErrorMessage name="email" component="div" className="register__error" />
            </div>

            <div className="register__field">
              <label className="register__label">Fecha Nacimiento</label>
              <Field type="date" name="birthdate" className="register__input" />
              <ErrorMessage name="birthdate" component="div" className="register__error" />
            </div>

            <div className="register__field">
              <label className="register__label">DNI</label>
              <Field type="text" name="nDni" className="register__input" />
              <ErrorMessage name="nDni" component="div" className="register__error" />
            </div>

            <div className="register__field">
              <label className="register__label">Contraseña</label>
              <Field type="password" name="password" className="register__input" />
              <ErrorMessage name="password" component="div" className="register__error" />
            </div>

            <button
              type="submit"
              className="register__button"
              disabled={isSubmitting || Object.values(errors).some(error => error)}
            >
              Registrarse
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Register;
