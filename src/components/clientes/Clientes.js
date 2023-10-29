import React from "react";
import { NavLink } from 'react-router-dom'

const clientes = [
    {
      nombre: 'Diego Marin Cano',
      empresa: 'Sena',
      correo: 'correo@correo.com',
      telefono: '209109310',
    },
    {
        nombre: 'Diego Marin Cano',
        empresa: 'Sena',
        correo: 'correo@correo.com',
        telefono: '209109310',
      }
  ];

function Clientes() {
    return (
        <div>
            <h2>Clientes</h2>
            <NavLink to="/nuevo-cliente" className="btn btn-verde nvo-cliente">
                <i className="fas fa-plus-circle"></i>
                Nuevo Cliente
            </NavLink>

            <ul className="listado-clientes">
                {clientes.map((cliente, index) => (
                    <li className="cliente" key={index}>
                        <div className="info-cliente">
                            <p className="nombre">{cliente.nombre}</p>
                            <p className="empresa">{cliente.empresa}</p>
                            <p>{cliente.correo}</p>
                            <p>Tel: {cliente.telefono}</p>
                        </div>
                        <div className="acciones">
                            <NavLink to='/editar-cliente' className="btn btn-azul">
                                <i className="fas fa-pen-alt"></i>
                                Editar Cliente
                            </NavLink>
                            <button type="button" className="btn btn-rojo btn-eliminar">
                                <i className="fas fa-times"></i>
                                Eliminar Cliente
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default Clientes