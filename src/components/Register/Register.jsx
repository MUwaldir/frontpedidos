import React, { useState } from 'react';
import axios from 'axios';
import styles from './Register.module.css'; // Importa tu archivo CSS Modules
import { useNavigate } from 'react-router-dom';

function Register() {
  const [userData, setUserData] = useState({
    usuarioNombre: '',
    correoElectronico: '',
    dni: '',
    rol: 'usuario',
    password: '',
  });
  const [showMessage, setShowMessage] = useState(false);
  const [message, setMessage] = useState('');

  const navigate = useNavigate();

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value,
    });
  };

  const validateForm = () => {
    const errors = {};
    if (!userData.usuarioNombre) {
      errors.usuarioNombre = 'El nombre de usuario es requerido.';
    } else if (!/^[a-zA-Z]+$/.test(userData.usuarioNombre)) {
      errors.usuarioNombre = 'El nombre de usuario no debe contener caracteres especiales ni números.';
    }
    if (!userData.correoElectronico) {
      errors.correoElectronico = 'El correo electrónico es requerido.';
    } else if (!/\S+@\S+\.\S+/.test(userData.correoElectronico)) {
      errors.correoElectronico = 'El correo electrónico no es válido.';
    }
    if (!userData.dni) {
      errors.dni = 'El DNI es requerido.';
    } else if (!/^\d{8}$/.test(userData.dni)) {
      errors.dni = 'El DNI debe tener 8 números.';
    }
    if (!userData.password) {
      errors.password = 'La contraseña es requerida.';
    } else if (userData.password.length < 6) {
      errors.password = 'La contraseña debe tener al menos 6 caracteres.';
    }
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      // Realiza una solicitud POST para enviar los datos del usuario
      console.log(userData)
      axios.post('http://localhost:5069/api/Usuario/registro', userData)
        .then((response) => {
          // Maneja la respuesta del servidor (puede ser una confirmación de registro)
          console.log('Registro exitoso', response.data);
          setMessage('Registro exitoso. Redirigiendo a la página de inicio de sesión...');
          setShowMessage(true);

          setTimeout(() => {
            navigate('/inicio-sesion'); // Redirige a la página de inicio de sesión
          }, 3000);
        })
        .catch((error) => {
          // Maneja cualquier error en la solicitud
          console.error('Error al registrar usuario', error);
          setMessage('Error al registrar usuario. Inténtalo nuevamente.');
          setShowMessage(true);

        });
    }
  };

  return (
    <div className={`container ${styles.registerContainer}`}>
      <h1>Registro de Usuario</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="usuarioNombre" className="form-label">Nombre de usuario</label>
          <input
            type="text"
            className={`form-control ${errors.usuarioNombre ? 'is-invalid' : ''}`}
            id="usuarioNombre"
            name="usuarioNombre"
            value={userData.usuarioNombre}
            onChange={handleChange}
            required
          />
          {errors.usuarioNombre && <div className="invalid-feedback">{errors.usuarioNombre}</div>}
        </div>
        <div className="mb-3">
          <label htmlFor="correoElectronico" className="form-label">Correo electrónico</label>
          <input
            type="email"
            className={`form-control ${errors.correoElectronico ? 'is-invalid' : ''}`}
            id="correoElectronico"
            name="correoElectronico"
            value={userData.correoElectronico}
            onChange={handleChange}
            required
          />
          {errors.correoElectronico && <div className="invalid-feedback">{errors.correoElectronico}</div>}
        </div>
        <div className="mb-3">
          <label htmlFor="dni" className="form-label">DNI</label>
          <input
            type="text"
            className={`form-control ${errors.dni ? 'is-invalid' : ''}`}
            id="dni"
            name="dni"
            value={userData.dni}
            onChange={handleChange}
            required
          />
          {errors.dni && <div className="invalid-feedback">{errors.dni}</div>}
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Contraseña</label>
          <input
            type="password"
            className={`form-control ${errors.password ? 'is-invalid' : ''}`}
            id="password"
            name="password"
            value={userData.password}
            onChange={handleChange}
            required
          />
          {errors.password && <div className="invalid-feedback">{errors.password}</div>}
        </div>
        <button type="submit" className="btn btn-primary">Registrarse</button>
      </form>
    </div>
  );
}

export default Register;
