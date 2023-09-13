import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import styles from './Login.module.css'; // Importa tu archivo CSS Modules

function Login() {
  const [formData, setFormData] = useState({
    usuarioNombre: '',
    password: '',
  });

  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Realiza una solicitud POST al backend para el inicio de sesión
    axios.post('http://localhost:5069/api/Usuario/login', formData)
      .then((response) => {
        console.log('Inicio de sesión exitoso', response.data);
        // Guarda la respuesta en el localStorage
        localStorage.setItem('userData', JSON.stringify(response.data));
        navigate('/'); // Redirige al usuario a la página deseada después del inicio de sesión
      })
      .catch((error) => {
        console.error('Error al iniciar sesión', error);
        setErrorMessage('Nombre de usuario o contraseña incorrectos');
      });
  };

  return (
    <div className={`container ${styles.loginContainer}`}>
      <h1>Iniciar Sesión</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="usuarioNombre" className="form-label">Nombre de usuario</label>
          <input
            type="text"
            className="form-control"
            id="usuarioNombre"
            name="usuarioNombre"
            value={formData.usuarioNombre}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Contraseña</label>
          <input
            type="password"
            className="form-control"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">Iniciar Sesión</button>
        {errorMessage && <div className={`alert alert-danger ${styles.error}`}>{errorMessage}</div>}
      </form>
    </div>
  );
}

export default Login;
