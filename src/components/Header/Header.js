import React from 'react'
import { Link } from 'react-router-dom'
import './styles.css'

let navegacion = [
  {
    nombre:'Home',
    ruta:'/',
  },
  {
    nombre:'Ver todas',
    ruta:'/peliculas',
  },
  {
    nombre:'Favoritos',
    ruta:'/favoritos',
  }
]

function Header() {
  return (
    <>
    <header>
      <nav>
      <ul className="logo">
            <li>
            <img src="./img/logo.jpg" alt="" />
            </li>
        </ul>
        <ul className="main-nav">
            {
              navegacion.map((elm) => <li>
                <Link to={elm.ruta}>
                  {elm.nombre}
                </Link>
              </li> )
            }
        </ul>
        </nav>
    </header>
    </>
  )}

export default Header