export const validateRegister = (values) => {
  const errors = {};

  if (!values.email) {
    errors.email = 'El email es obligatorio.';
  } else if (
    !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
  ) {
    errors.email = 'El formato del email no es válido.';
  }

  if (!values.password) {
    errors.password = 'La contraseña es obligatoria.';
  } else if (values.password.length < 6) {
    errors.password = 'La contraseña debe tener al menos 6 caracteres.';
  }

  if (!values.name) {
    errors.name = 'El nombre es obligatorio.';
  } else if (values.name.length < 2) {
    errors.name = 'El nombre debe tener al menos 2 caracteres.';
  }

  if (!values.birthdate) {
    errors.birthdate = 'La fecha de nacimiento es obligatoria.';
  } else {
    const birthdate = new Date(values.birthdate);
    const today = new Date();
    const age = today.getFullYear() - birthdate.getFullYear();
    if (age < 18) {
      errors.birthdate = 'Debes tener al menos 18 años.';
    }
  }

  if (!values.nDni) {
    errors.nDni = 'El DNI es obligatorio.';
  } else if (!/^\d+$/.test(values.nDni)) {
    errors.nDni = 'El DNI debe contener solo números.';
  } else if (values.nDni.length < 7 || values.nDni.length > 8) {
    errors.nDni = 'El DNI debe tener entre 7 y 8 dígitos.';
  }

  return errors;
};

export const validateLogin = (values) => {
  const errors = {};

  if (!values.username) {
    errors.username = 'El username es obligatorio.';
  } else if (values.username && !values.password ) {
    errors.username = 'El password es requerido.';
  }

  return errors;
};

export const validateAppointment = (values) => {
  const errors = {};

  if (!values.date) {
    errors.date = 'La fecha es obligatoria.';
  } else {
    const appointmentDate = new Date(values.date);
    const today = new Date();
    if (appointmentDate < today) {
      errors.date = 'Los turnos solo se pueden sacar como minimo el dia anterior.';
    } else {
      const minAdvanceTime = 2 * 60 * 60 * 1000;
      const timeDifference = appointmentDate - today;

      if (timeDifference < minAdvanceTime) {
        errors.date = 'futuro.';
      }
    }
  }

  if (!values.time) {
    errors.time = 'La hora es obligatoria.';
  } else if (!/^([01]?[0-9]|2[0-3]):([0-5][0-9])$/.test(values.time)) {
    errors.time = 'La hora debe tener el formato HH:MM.';
  }

  if (!values.status) {
    errors.status = 'El estado es obligatorio.';
  } else if (!['Activo', 'Cancelado', 'Completado'].includes(values.status)) {
    errors.status = 'El estado debe ser "Activo", "Cancelado" o "Completado".';
  }

  if (!values.description) {
    errors.description = 'La descripción es obligatoria.';
  } else if (values.description.length < 10) {
    errors.description = 'La descripción debe tener al menos 10 caracteres.';
  }

  return errors;
};
