import React from "react";
import { NavLink } from 'react-router-dom'

const productos = [
    {
        nombre: 'VueJS',
        precio: '$25.00',
        imagenSrc: 'img/1.jpg',
    },
    {
        nombre: 'AngularJS',
        precio: '$25.00',
        imagenSrc: 'img/2.jpg',
    },
]


function Productos() {
    return (
        <div>

            <h2>Productos</h2>
            <NavLink to="/nuevo-producto" className="btn btn-verde nvo-cliente">
                <i className="fas fa-plus-circle"></i>
                Nuevo Producto
            </NavLink>

            <ul className="listado-productos">
                {productos.map((producto, index) => (
                    <li className="producto" key={index}>
                        <div className="info-producto">
                            <p className="nombre">{producto.nombre}</p>
                            <p className="precio">{producto.precio}</p>
                            <img src={producto.imagenSrc} alt={producto.nombre} />
                        </div>
                        <div className="acciones">
                            <NavLink to="/editar-producto" className="btn btn-azul">
                                <i className="fas fa-pen-alt"></i>
                                Editar Producto
                            </NavLink>
                            <button type="button" className="btn btn-rojo btn-eliminar">
                                <i className="fas fa-times"></i>
                                Eliminar Producto
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default Productos