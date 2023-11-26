import React from "react";
import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import clienteAxios from "../../config/axios";
import Swal from "sweetalert2";

function Pedidos() {
  const [pedidos, datosPedidos] = useState([]);
  const consultaApi = async () => {
    const consultar = await clienteAxios.get('/pedidos')
    datosPedidos(consultar.data.Pedidos)
  }
  const eliminarPedido = id =>{
    Swal.fire({
        title: "Estas Seguro?",
        text: "Esta accion borrará PARA SIEMPRE el pedido",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#66bb6a",
        cancelButtonColor: "#A01C48",
        confirmButtonText: "Si, Borrar!",
        cancelButtonText: "Cancelar"
      }).then((result) => {
        if (result.isConfirmed) {
            clienteAxios.delete(`/pedidos/${id}`)
            .then( res =>{
                Swal.fire(
                    "Eliminado",
                    res.data.msg,
                    "success"
                  );
            })
         
        }
      });
}
  useEffect(() => {
    consultaApi()
  }, [pedidos]);
  return (
    <div>

      <h2>Pedidos</h2>
      <NavLink to="/nuevo-pedido" className="btn btn-verde nvo-cliente">
        <i className="fas fa-plus-circle"></i>
        Nuevo Pedido
      </NavLink>
      <ul className="listado-pedidos">
        {pedidos.map((pedido, index) => (
          <li className="pedido" key={index}>
            <div className="info-pedido">
              <p className="id">ID: {pedido._id}</p>
              <p className="nombre">Cliente: {pedido.cliente.nombre} {pedido.cliente.apellido}</p>
              <div className="articulos-pedido">
                <p className="productos">Artículos Pedido:</p>
                <ul>
                  {pedido.pedido.map((productoPedido, idx) => (
                    <li key={idx}>
                      <p>{productoPedido.producto.nombre}</p>
                      <p>Precio: {productoPedido.producto.precio}</p>
                      <p>Cantidad: {productoPedido.cantidad}</p>
                    </li>
                  ))}
                </ul>
              </div>
              <p className="total">Total: {pedido.total}</p>
            </div>
            <div className="acciones">
              <NavLink to={`/editar-pedido/${pedido._id}`}className="btn btn-azul">
                <i className="fas fa-pen-alt"></i>
                Editar Pedido
              </NavLink>
              <button type="button" className="btn btn-rojo btn-eliminar" onClick={() => eliminarPedido(pedido._id)}>
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

export default Pedidos