import React, { useState, useEffect } from 'react';
import axios from 'axios';

function AdminPanel() {
  const [orders, setOrders] = useState([]);
  const [dniFilter, setDniFilter] = useState('');
  const [orderNumberFilter, setOrderNumberFilter] = useState('');
  const [showAllOrders, setShowAllOrders] = useState(true);


  useEffect(() => {
    // Realiza una petición GET para obtener todos los pedidos al cargar la vista
    axios.get('http://localhost:5069/api/Pedido')
      .then((response) => {
        console.log(response.data)
        setOrders(response.data.$values);
      })
      .catch((error) => {
        console.error('Error al cargar los pedidos: ', error);
      });
  }, []);

  const filterByDNI = () => {
    const userDNI = localStorage.getItem('userDNI');
  
    // Realiza una petición POST para filtrar por DNI con autorización
    axios.post('URL_DE_TU_API_FILTRO_DNI', { dni: userDNI }, {
      headers: {
        'Authorization': 'Bearer TU_TOKEN_DE_AUTORIZACIÓN', // Reemplaza con tu token de autorización
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        setOrders(response.data);
        setShowAllOrders(false); // Cambia el estado para indicar que se está aplicando un filtro
      })
      .catch((error) => {
        console.error('Error al filtrar por DNI: ', error);
      });
  };
  

  const filterByOrderNumber = () => {
    // Realiza una petición GET para filtrar por número de pedido con autorización
    axios.get(`http://localhost:5069/api/Pedido/${orderNumberFilter}`)
      .then((response) => {
        const filteredOrder = response.data;
        if (filteredOrder) {
          setOrders([filteredOrder]);
          setShowAllOrders(false); // Cambia el estado para indicar que se está aplicando un filtro
        } else {
          setOrders([]);
        }
      })
      .catch((error) => {
        console.error('Error al filtrar por número de pedido: ', error);
      });
  };
  
  const loadAllOrders = () => {
    // Realiza una petición GET para obtener todos los pedidos nuevamente
    axios.get('http://localhost:5069/api/Pedido')
      .then((response) => {
        setOrders(response.data.$values);
        setShowAllOrders(true); // Cambia el estado para indicar que se muestran todos los pedidos
      })
      .catch((error) => {
        console.error('Error al cargar los pedidos: ', error);
      });
  };

  return (
    <div>
      <h1>Admin</h1>
      
      {/* Filtro por DNI */}
      <input
        type="text"
        placeholder="Filtrar por DNI"
        value={dniFilter}
        onChange={(e) => setDniFilter(e.target.value)}
      />
      <button onClick={filterByDNI}>Filtrar por DNI</button>

      {/* Filtro por Número de Pedido */}
      <input
        type="text"
        placeholder="Filtrar por Número de Pedido"
        value={orderNumberFilter}
        onChange={(e) => setOrderNumberFilter(e.target.value)}
      />
      <button onClick={filterByOrderNumber}>Filtrar por Número de Pedido</button>
      <div>

      <button onClick={loadAllOrders}>Cargar Todos los Pedidos</button>
      </div>
      
      {/* Mostrar pedidos */}
      <div>
        <h2>Pedidos</h2>
        <ul>
          {orders.map((order) => (
            <li key={order.id}>
              Número de Pedido: {order.id}, Fecha: {new Date(order.fechaPedido).toLocaleDateString()}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default AdminPanel;
