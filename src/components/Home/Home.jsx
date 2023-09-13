import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Home() {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:5069/api/producto')
      .then((response) => {
        setProducts(response.data.$values); // Aquí asumimos que los datos del JSON son un array de productos
        console.log(response.data);
      })
      .catch((error) => {
        console.error('Error al cargar los productos:', error);
      });
  }, []);

  const handleProductSelect = (product) => {
    setSelectedProduct(product);
  };

  const handleOrderSubmit = () => {
    
    if (selectedProduct) {
      const userData = JSON.parse(localStorage.getItem('userData'));
    const token = userData ? userData.token : null;
  
    const usuarioId = userData ? userData.usuarioId:null ;
     
       
      // Configura el encabezado de autorización con el token
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
  
      // Crea un objeto JSON con el producto seleccionado
      const pedido = {
        UsuarioId :usuarioId ,
        detallesPedido: [{productoId: selectedProduct.id}],
      };
 
      // Realiza la solicitud POST al backend con el objeto JSON y el encabezado de autorización
      axios.post('http://localhost:5069/api/Pedido', pedido, config)
        .then((response) => {
          // Si la solicitud es exitosa, muestra un mensaje de confirmación al usuario
          alert(`Pedido realizado: ${selectedProduct.nombreProducto}`);
        })
        .catch((error) => {
          // Si hay un error en la solicitud, maneja el error apropiadamente
          console.error('Error al realizar el pedido:', error);
        });
    } else {
      alert('Por favor, selecciona un producto antes de realizar el pedido.');
    }
  };
  

  return (
    <div>
      <h1>Productos</h1>
      <ul>
        {products.map((product) => (
          <li className='bg-dark text-light mt-3' key={product.id}>
            nombre: {product.nombreProducto} - precio: {product.precio}
            <button className='ml-5 px-4 btn btn-success' onClick={() => handleProductSelect(product)}>Seleccionar</button>
          </li>
        ))}
      </ul>
      <div>
        <h2>Pedido</h2>
        {selectedProduct ? (
          <p>Producto seleccionado: {selectedProduct.nombreProducto}</p>
        ) : (
          <p>No has seleccionado ningún producto</p>
        )}
        <button onClick={handleOrderSubmit}>Realizar Pedido</button>
      </div>
    </div>
  );
}

export default Home;
