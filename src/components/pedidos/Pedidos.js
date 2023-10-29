import React from "react";
import { NavLink } from "react-router-dom";
const pedidos = [
    {
      id: '0192019201291201',
      nombreCliente: 'Diego Marin Cano',
      articulos: [
        {
          nombre: 'Macbook Pro',
          precio: '$3000',
          cantidad: 4,
        },
        {
          nombre: 'Macbook Pro',
          precio: '$3000',
          cantidad: 4,
        },
        {
          nombre: 'Macbook Pro',
          precio: '$3000',
          cantidad: 4,
        },
      ],
      total: '$3,500',
    },
    {
      id: '0192019201291201',
      nombreCliente: 'Cliente: Diego Marin Cano',
      articulos: [
        {
          nombre: 'Macbook Pro',
          precio: '$3000',
          cantidad: 4,
        },
        {
          nombre: 'Macbook Pro',
          precio: '$3000',
          cantidad: 4,
        },
      ],
      total: '$3,500',
    },
    {
      id: '0192019201291201',
      nombreCliente: 'Cliente: Diego Marin Cano',
      articulos: [
        {
          nombre: 'Macbook Pro',
          precio: '$3000',
          cantidad: 4,
        },
      ],
      total: '$3,500',
    },
  ];
function Pedidos () {
    return (
        <div>

            <h2>Productos</h2>
            <ul className="listado-pedidos">
                {pedidos.map((pedido, index) => (
                    <li className="pedido" key={index}>
                        <div className="info-pedido">
                            <p className="id">ID: {pedido.id}</p>
                            <p className="nombre">Cliente: {pedido.nombreCliente}</p>
                            <div className="articulos-pedido">
                                <p className="productos">Artículos Pedido:</p>
                                <ul>
                                    {pedido.articulos.map((articulo, idx) => (
                                        <li key={idx}>
                                            <p>{articulo.nombre}</p>
                                            <p>Precio: {articulo.precio}</p>
                                            <p>Cantidad: {articulo.cantidad}</p>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <p className="total">Total: {pedido.total}</p>
                        </div>
                        <div className="acciones">
                            <NavLink to='/editar-pedido' className="btn btn-azul">
                                <i className="fas fa-pen-alt"></i>
                                Editar Pedido
                            </NavLink>
                            <button type="button" className="btn btn-rojo btn-eliminar">
                                <i className="fas fa-times"></i>
                                Eliminar Pedido
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default  Pedidos