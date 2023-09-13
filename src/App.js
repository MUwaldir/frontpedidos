import logo from './logo.svg';
import './App.css';
import Navbar from './components/Navbar/Navbar';
import { Route, Routes } from 'react-router-dom';
import Home from './components/Home/Home';
import Register from './components/Register/Register';
import Login from './components/Login/Login';
import AdminPanel from './components/AdminPanel/AdminPanel';

import Pedidos from './components/Pedidos/Pedidos';
import CrearProducto from './components/CrearProducto/CrearProducto';

function App() {
  return (
    <div className="App">
      
      <Navbar/>
      <Routes>
        <Route path="/" exact element={<Home/>} />
        
        <Route path="/registro" element={<Register/>} />
        <Route path="/inicio-sesion" element={<Login/>} />
        <Route path="/admin" element={<AdminPanel/>} />
        <Route path="/pedidos" element={<Pedidos/>} />
        <Route path="/crearproducto" element={<CrearProducto/>} />
      </Routes>
    </div>
  );
}

export default App;
