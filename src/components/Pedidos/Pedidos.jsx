import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import styles from './Pedidos.module.css';

function Pedidos() {
  const [pedidos, setPedidos] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const [detallesVisibles, setDetallesVisibles] = useState({});

  useEffect(() => {
    // Obtener el token de autorización del localStorage (o desde donde lo estés almacenando)
    const userData = JSON.parse(localStorage.getItem('userData'));
    const token = userData ? userData.token : null;
    const usuarioId = userData ? userData.usuarioId : null;

    // Verificar si el token y el usuarioId existen
    if (!token || !usuarioId) {
      // Redirigir al usuario a la página de inicio u otra página
      navigate('/'); // Cambia '/home' a la ruta que desees
      return; // Detener la ejecución de la solicitud Axios
    }

    // Configurar el encabezado de la solicitud con el token de autorización
    const headers = {
      Authorization: `Bearer ${token}`,
    };

    // Realizar la solicitud Axios para obtener los pedidos del usuario
    axios
      .get('http://localhost:5069/api/Pedido/por-usuario/' + usuarioId, { headers })
      .then((response) => {
        // Actualizar el estado de los pedidos con la respuesta del servidor
        console.log(response.data);
        setPedidos(response.data.$values);
      })
      .catch((error) => {
        // Manejar errores en la solicitud
        setError(error.message);
      });
  }, []); // El segundo argumento [] asegura que esta solicitud se realice solo una vez al montar el componente

  const obtenerDetallePedido = (pedidoId) => {
    // Obtener el token de autorización del localStorage (o desde donde lo estés almacenando)
    const userData = JSON.parse(localStorage.getItem('userData'));
    const token = userData ? userData.token : null;

    if (!token) {
      // Manejar el caso en que no haya un token de autorización
      console.error('Token de autorización no encontrado.');
      return;
    }

    // Configurar el encabezado de la solicitud con el token de autorización
    const headers = {
      Authorization: `Bearer ${token}`,
    };

    // Realizar la solicitud Axios para obtener los detalles del pedido
    axios
      .get(`http://localhost:5069/api/DetallePedido/${pedidoId}`, { headers })
      .then((response) => {
        // Actualizar el estado con los detalles del pedido
        console.log(response.data);

        setDetallesVisibles({
          ...detallesVisibles,
          [pedidoId]: response.data,
        });
      })
      .catch((error) => {
        // Manejar errores en la solicitud
        console.error('Error al obtener los detalles del pedido:', error);
      });
  };

  const toggleDetalles = (pedidoId) => {
    // Si ya se han cargado los detalles, simplemente cambia la visibilidad
    if (detallesVisibles[pedidoId]) {
      setDetallesVisibles({
        ...detallesVisibles,
        [pedidoId]: null, // Cerrar detalles
      });
    } else {
      // Si los detalles aún no se han cargado, obtén los detalles del pedido
      obtenerDetallePedido(pedidoId);
    }
  };

  return (
    <div className={styles['pedidos-container']}>
      <h1>Mis Pedidos</h1>
      {error && <p className="text-danger">Error: {error}</p>}
      {pedidos.length === 0 ? (
        <p>No tienes pedidos.</p>
      ) : (
        <ul>
          {pedidos.map((pedido) => (
            <li key={pedido.id} className={styles['pedido-item']}>
              <div>
                <p>Número de Pedido: {pedido.id}</p>
                <p>Fecha: {new Date(pedido.fechaPedido).toLocaleDateString()}</p>
                {detallesVisibles[pedido.id] && (
                  <div>
                    {detallesVisibles[pedido.id].pedido.estado && <p>Estado: {detallesVisibles[pedido.id].pedido.estado}</p>}
                    {detallesVisibles[pedido.id].precioUnitario && (
                      <p>Precio: {detallesVisibles[pedido.id].precioUnitario}</p>
                    )}
                    {/* Otros detalles del pedido */}
                  </div>
                )}
              </div>
              <div className=''>
                <button
                  className={`btn btn-primary ${styles['btn-ver-detalles']}`}
                  onClick={() => toggleDetalles(pedido.id)}
                >
                  {detallesVisibles[pedido.id] ? 'Cerrar Detalles' : 'Ver Detalles'}
                </button>
               
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Pedidos;
