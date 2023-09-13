import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Navbar.module.css'; // Importa el archivo de módulos CSS

function Navbar() {
  return (
    <nav className={`navbar navbar-expand-lg navbar-dark bg-dark ${styles.navbar}`}>
      <div className={`container ${styles.container}`}>
        <Link to="/" className={`navbar-brand ${styles.navBrand}`}>
          Tu Aplicación de Pedidos
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className={`navbar-toggler-icon ${styles.navbarTogglerIcon}`}></span>
        </button>
        <div className={`collapse navbar-collapse justify-content-end ${styles.navbarCollapse}`} id="navbarNav">
          <ul className={`navbar-nav ${styles.navbarNav}`}>
            <li className="nav-item">
              <Link to="/" className={`nav-link ${styles.navLink}`}>
                Inicio
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/crearproducto" className={`nav-link ${styles.navLink}`}>
                Crear Producto
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/pedidos" className={`nav-link ${styles.navLink}`}>
                Pedidos
              </Link>
            </li>
           
         
            <li className="nav-item">
              <Link to="/inicio-sesion" className={`nav-link ${styles.navLink}`}>
                inicio Sesión
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/registro" className={`nav-link ${styles.navLink}`}>
                Registro
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/admin" className={`nav-link ${styles.navLink}`}>
                Admin
              </Link>
            </li>
            
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
