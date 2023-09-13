import React, { useState } from 'react';
import axios from 'axios';

function CrearProducto() {
  const [nombre, setNombre] = useState('');
  const [precio, setPrecio] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Crear un objeto con los datos del producto
    const nuevoProducto = {
      nombreProducto: nombre,
      precio: parseFloat(precio), // Convierte el precio a número (puede ser necesario ajustarlo según tus necesidades)
    };

    try {
      // Realizar la solicitud POST para crear el producto
      const response = await axios.post('http://localhost:5069/api/Producto', nuevoProducto, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      // Manejar la respuesta aquí, por ejemplo, mostrar un mensaje de éxito
      console.log('Producto creado con éxito:', response.data);

      // Limpiar los campos del formulario después de la creación
      setNombre('');
      setPrecio('');
    } catch (error) {
      console.error('Error al crear el producto:', error);
    }
  };

  return (
    <div className='container'>
      <h1>Crear Producto</h1>
      <form onSubmit={handleSubmit}>
        <div className='mb-3'>
          <label htmlFor="nombre" className="form-label">Nombre del Producto:</label>
          <input
            type="text"
            className="form-control"
            id="nombre"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            required
          />
        </div>
        <div className='mb-3'>
          <label htmlFor="precio" className="form-label">Precio del Producto:</label>
          <input
            type="number"
            className="form-control"
            id="precio"
            value={precio}
            onChange={(e) => setPrecio(e.target.value)}
            required
          />
        </div>
        <button type="submit">Crear Producto</button>
      </form>
    </div>
  );
}

export default CrearProducto;
