import { Formik, Form, Field, ErrorMessage } from 'formik';
import { validateAppointment } from '../../helpers/validate';  
import axios from 'axios';
import './CreateAppointment.css';
import { useState, useEffect } from 'react';

const CreateAppointment = () => {
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser && storedUser.id) {
      setUserId(storedUser.id);
    }
  }, []);

  const posData = async (formData) => {
    try {
      const response = await axios.post("http://localhost:3000/appointments/schedule", formData);
      if (response.status === 200) {
        const appointment = response.data; 
        return true;
      }
    } catch (error) {
      console.error(error);
      alert("No se pudo crear el Turno");
      return false;
    }
  };

  
  if (!userId) {
    return <p>Cargando información del usuario...</p>;
  }

  return (
    <div className="create-appointment">
      {/* <h1 className="create-appointment__title">Crear turno</h1> */}
      <Formik
        initialValues={{
          date: '',
          time: '',
          status: 'Activo',
          userId: userId, 
          description: '',
        }}
        validate={validateAppointment}  
        onSubmit={async (values, { setSubmitting, resetForm }) => {
          const success = await posData(values);
          if (success) {
            resetForm(); 
          }
          setSubmitting(false);
        }}
      >
        {({ isSubmitting, errors }) => (
          <Form className="create-appointment__form">
            <div className="create-appointment__field">
              <label className="create-appointment__label">Fecha</label>
              <Field type="date" name="date" className="create-appointment__input" />
              <ErrorMessage name="date" component="div" className="create-appointment__error" />
            </div>

            <div className="create-appointment__field">
              <label className="create-appointment__label">Hora</label>
              <Field as="select" name="time" className="create-appointment__input">
                <option value="">Selecciona una hora</option>
                {Array.from({ length: 15 }, (_, i) => i + 8).map((hour) => (
                  <option key={hour} value={`${hour.toString().padStart(2, '0')}:00`}>
                    {`${hour.toString().padStart(2, '0')}:00`}
                  </option>
                ))}
              </Field>
              <ErrorMessage name="time" component="div" className="create-appointment__error" />
            </div>

            <div className="create-appointment__field">
              <label className="create-appointment__label">Descripción</label>
              <Field as="textarea" name="description" className="create-appointment__input" />
              <ErrorMessage name="description" component="div" className="create-appointment__error" />
            </div>

            <button
              type="submit"
              className="create-appointment__button"
              disabled={isSubmitting || Object.values(errors).some(error => error)}
            >
              Crear Turno
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default CreateAppointment;
